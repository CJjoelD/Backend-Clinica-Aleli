import 'dotenv/config';
import prisma from '../src/config/prisma';

async function main() {
  console.log('Creando resultado médico ficticio...');

  // 1. Buscar o crear un usuario paciente (ID 2 por defecto en seeds anteriores)
  let user = await prisma.usuario.findFirst({
    where: { 
      rol: { nombre: 'PACIENTE' }
    }
  });

  if (!user) {
    user = await prisma.usuario.findFirst();
  }

  if (!user) {
     console.error('No se encontró ningún usuario para asociar el resultado.');
     return;
  }

  console.log(`Asociando resultado a: ${user.nombre} (${user.email})`);

  // 2. Crear una Consulta
  const consulta = await prisma.consulta.create({
    data: {
      fecha: new Date(),
      diagnostico: 'Examen de rutina preventivo.',
      usuarioId: user.id
    }
  });

  // 3. Crear el Resultado Médico
  const resultado = await prisma.resultadoMedico.create({
    data: {
      fecha: new Date(),
      descripcion: 'Hemograma completo y perfil lipídico - Todos los niveles se encuentran dentro de los rangos óptimos de salud.',
      archivo: 'analisis_clinico_001.pdf',
      consultaId: consulta.id,
      usuarioId: user.id
    }
  });

  console.log('¡Resultado médico ficticio creado con éxito!');
  console.log('Consulta ID:', consulta.id);
  console.log('Resultado ID:', resultado.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
