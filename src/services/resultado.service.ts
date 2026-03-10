import prisma from '../config/prisma';

export const getAllResultados = async () => {
  return await prisma.resultadoMedico.findMany({
    include: { consulta: true, usuario: true }
  });
};

export const getResultadoById = async (id: number) => {
  return await prisma.resultadoMedico.findUnique({
    where: { id },
    include: { consulta: true, usuario: true }
  });
};

export const createResultado = async (data: any) => {
  return await prisma.resultadoMedico.create({
    data
  });
};

export const updateResultado = async (id: number, data: any) => {
  return await prisma.resultadoMedico.update({
    where: { id },
    data
  });
};

export const deleteResultado = async (id: number) => {
  return await prisma.resultadoMedico.delete({
    where: { id }
  });
};
export const getResultadoByCedulaAndOrder = async (cedula: string, numeroOrden: string) => {
  return await prisma.resultadoMedico.findFirst({
    where: {
      numeroOrden,
      usuario: {
        cedula
      }
    },
    include: { 
      consulta: true, 
      usuario: {
        select: {
          id: true,
          nombre: true,
          email: true,
          cedula: true
        }
      } 
    }
  });
};
