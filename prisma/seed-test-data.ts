import 'dotenv/config';
import prisma from '../src/config/prisma';

async function main() {
  console.log('Creando datos ficticios de prueba...');

  // 1. Obtener el paciente (usuario con ID 1 o crear uno si no existe/usar el admin para prueba)
  // Usaremos el admin que ya existe para esta prueba rápida, o crearemos un paciente si prefieres.
  const user = await prisma.usuario.findFirst({ where: { email: 'admin@aleli.com' } });

  if (!user) {
    console.error('No se encontró el usuario admin@aleli.com. Realiza el registro primero.');
    return;
  }

  // 2. Crear una Consulta vinculada al usuario
  const consulta = await prisma.consulta.create({
    data: {
      fecha: new Date(),
      diagnostico: 'Chequeo general preventivo - Resultados de laboratorio pendientes.',
      usuarioId: user.id
    }
  });

  // 3. Crear el Resultado Medico vinculado a esa consulta
  const resultado = await prisma.resultadoMedico.create({
    data: {
      fecha: new Date(),
      descripcion: 'Hemograma completo - Todos los valores se encuentran dentro de los rangos normales. Se recomienda mantener dieta balanceada.',
      archivo: 'resultado_examen_001.pdf',
      consultaId: consulta.id,
      usuarioId: user.id
    }
  });

  console.log('¡Datos creados con éxito!');
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
