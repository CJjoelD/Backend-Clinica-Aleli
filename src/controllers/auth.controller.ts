import { Request, Response } from 'express';
import prisma from '../config/prisma';
import * as authService from '../services/auth.service';

/**
 * Controlador para el registro de nuevos usuarios.
 * Valida la existencia del correo, hashea la contraseña y crea el registro en Prisma.
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password, rolId } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await prisma.usuario.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Hashear contraseña
    const hashedPassword = await authService.hashPassword(password);

    // Crear usuario
    const user = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        rolId: rolId || 2 // Por defecto rol de paciente o similar, ajustar según base de datos
      }
    });

    res.status(201).json({ message: 'Usuario registrado con éxito', userId: user.id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controlador para el inicio de sesión.
 * Verifica credenciales, compara hashes y genera un token JWT de acceso.
 */
export const login = async (req: Request, res: Response) => {
  console.log('--- INTENTO DE LOGIN ---');
  console.log('Email:', req.body.email);
  try {
    const { email, password } = req.body;

    console.log('Buscando usuario en la BD...');
    // Buscar usuario
    const usuario = await prisma.usuario.findUnique({ 
      where: { email },
      include: { rol: true }
    });

    if (!usuario) {
      console.log('Usuario no encontrado:', email);
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    console.log('Usuario encontrado, verificando contraseña...');
    // Comparar contraseña
    const isPasswordValid = await authService.comparePassword(password, usuario.password);
    if (!isPasswordValid) {
      console.log('Contraseña incorrecta para:', email);
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    console.log('Contraseña correcta, generando token...');
    // Generar token
    const token = authService.generateToken({ 
      id: usuario.id, 
      email: usuario.email, 
      rol: usuario.rol.nombre 
    });

    res.json({
      token,
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol.nombre
      }
    });
  } catch (error: any) {
    console.error('❌ ERROR EN LOGIN:', error);
    res.status(500).json({ error: error.message });
  }
};
