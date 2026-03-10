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
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await prisma.usuario.findUnique({ 
      where: { email },
      include: { rol: true }
    });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Comparar contraseña
    const isValid = await authService.comparePassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar token
    const token = authService.generateToken({ 
      id: user.id, 
      email: user.email, 
      rol: user.rol.nombre 
    });

    res.json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol.nombre
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
