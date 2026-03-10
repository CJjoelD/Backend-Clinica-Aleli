import prisma from '../config/prisma';

export const getAllConsultas = async () => {
  return await prisma.consulta.findMany({
    include: { usuario: true, resultado: true }
  });
};

export const getConsultaById = async (id: number) => {
  return await prisma.consulta.findUnique({
    where: { id },
    include: { usuario: true, resultado: true }
  });
};

export const createConsulta = async (data: any) => {
  return await prisma.consulta.create({
    data
  });
};

export const updateConsulta = async (id: number, data: any) => {
  return await prisma.consulta.update({
    where: { id },
    data
  });
};

export const deleteConsulta = async (id: number) => {
  return await prisma.consulta.delete({
    where: { id }
  });
};
