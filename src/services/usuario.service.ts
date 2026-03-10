import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';

export const getAllUsuarios = async () => {
  return await prisma.usuario.findMany({
    include: { rol: true }
  });
};

export const getUsuarioById = async (id: number) => {
  return await prisma.usuario.findUnique({
    where: { id },
    include: { rol: true }
  });
};

export const createUsuario = async (data: any) => {
  const { rol, ...userData } = data;

  if (userData.password) {
    // Solo hashear si no parece ser ya un hash de bcrypt
    if (!userData.password.startsWith('$2a$') && !userData.password.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }
  }

  // Sincronizar rolId si viene el campo tipo
  if (userData.tipo) {
    if (userData.tipo === 'ADMIN') {
      userData.rolId = 1;
    } else {
      userData.rolId = 2; // Paciente por defecto
    }
  } else if (!userData.rolId) {
    userData.rolId = 2;
  }

  // Si la cédula viene vacía de la interfaz, ponerla como null para evitar errores de unicidad
  if (userData.cedula === '') {
    userData.cedula = null;
  }

  return await prisma.usuario.create({
    data: userData
  });
};

export const updateUsuario = async (id: number, data: any) => {
  // Eliminar campos que pueden causar errores en Prisma (objetos relacionales)
  const { rol, consultas, resultados, paginas, ...cleanData } = data;

  if (cleanData.password) {
    // Solo hashear si es una nueva contraseña plana
    if (!cleanData.password.startsWith('$2a$') && !cleanData.password.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt(10);
      cleanData.password = await bcrypt.hash(cleanData.password, salt);
    }
  }

  // Sincronizar rolId si viene el campo tipo (para que coincida con la lógica de negocio)
  if (cleanData.tipo) {
    if (cleanData.tipo === 'ADMIN') {
      cleanData.rolId = 1;
    } else {
      cleanData.rolId = 2; // Paciente por defecto
    }
  }

  // Si la cédula viene vacía de la interfaz, ponerla como null
  if (cleanData.cedula === '') {
    cleanData.cedula = null;
  }

  return await prisma.usuario.update({
    where: { id },
    data: cleanData
  });
};

export const deleteUsuario = async (id: number) => {
  return await prisma.usuario.delete({
    where: { id }
  });
};
