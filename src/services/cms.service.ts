import prisma from '../config/prisma';

export const getAllCMS = async () => {
  return await prisma.cMS.findMany();
};

export const getCMSByClave = async (clave: string) => {
  return await prisma.cMS.findUnique({
    where: { clave }
  });
};

export const createCMS = async (data: any) => {
  return await prisma.cMS.create({
    data
  });
};

export const updateCMS = async (id: number, data: any) => {
  return await prisma.cMS.update({
    where: { id },
    data
  });
};

export const deleteCMS = async (id: number) => {
  return await prisma.cMS.delete({
    where: { id }
  });
};
