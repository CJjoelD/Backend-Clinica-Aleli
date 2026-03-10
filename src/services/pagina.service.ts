import prisma from '../config/prisma';

export const getAllPaginas = async () => {
  return await prisma.pagina.findMany({
    include: { usuario: true }
  });
};

export const getPaginaById = async (id: number) => {
  return await prisma.pagina.findUnique({
    where: { id },
    include: { usuario: true }
  });
};

export const createPagina = async (data: any) => {
  return await prisma.pagina.create({
    data
  });
};

export const updatePagina = async (id: number, data: any) => {
  return await prisma.pagina.update({
    where: { id },
    data
  });
};

export const deletePagina = async (id: number) => {
  return await prisma.pagina.delete({
    where: { id }
  });
};
