import 'dotenv/config';
import prisma from '../src/config/prisma';

async function main() {
  const roles = [
    { id: 1, nombre: 'Admin' },
    { id: 2, nombre: 'Paciente' },
    { id: 3, nombre: 'Medico' },
  ];

  console.log('Verificando roles...');

  for (const rol of roles) {
    await prisma.rol.upsert({
      where: { id: rol.id },
      update: {},
      create: rol,
    });
  }

  console.log('Roles listos.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
