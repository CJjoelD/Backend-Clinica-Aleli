import 'dotenv/config';
import prisma from '../src/config/prisma';

async function main() {
  console.log('Sembrando datos completos del CMS...');

  const items = [
    // Servicios
    { clave: 'Odontología General', valor: 'Cuidado integral de tu salud bucal con tecnología de punta.', tipo: 'servicio', imagenUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800' },
    { clave: 'Pediatría', valor: 'Atención especializada para el crecimiento y desarrollo de tus hijos.', tipo: 'servicio', imagenUrl: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800' },
    { clave: 'Ginecología', valor: 'Cuidado experto para cada etapa de la vida de la mujer.', tipo: 'servicio', imagenUrl: 'https://images.unsplash.com/photo-1579152276511-df404c96561f?auto=format&fit=crop&q=80&w=800' },
    { clave: 'Fisioterapia', valor: 'Rehabilitación física personalizada para recuperar tu movilidad.', tipo: 'servicio', imagenUrl: 'https://images.unsplash.com/photo-1576091160550-217359f49a4c?auto=format&fit=crop&q=80&w=800' },
    
    // Especialidades
    { clave: 'Cardiología', valor: 'Expertos en salud cardiovascular y prevención.', tipo: 'especialidad', imagenUrl: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=800' },
    { clave: 'Dermatología', valor: 'Tratamientos avanzados para la salud de tu piel.', tipo: 'especialidad', imagenUrl: 'https://images.unsplash.com/photo-1584515159913-6f425827ae79?auto=format&fit=crop&q=80&w=800' },
    { clave: 'Nutrición', valor: 'Planes alimenticios personalizados para mejorar tu calidad de vida.', tipo: 'especialidad', imagenUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800' },
    
    // General
    { clave: 'Horario de Atención', valor: 'Lunes a Viernes: 08:00 - 18:00 | Sábados: 09:00 - 13:00', tipo: 'general', imagenUrl: '' },
    { clave: 'Teléfono Contacto', valor: '+593 99 999 9999', tipo: 'general', imagenUrl: '' },
    { clave: 'Email Clínica', valor: 'contacto@clinicaaleli.com', tipo: 'general', imagenUrl: '' },
    { clave: 'Dirección Principal', valor: 'Av. Las Palmeras y 10 de Agosto, Quito, Ecuador', tipo: 'general', imagenUrl: '' }
  ];

  for (const item of items) {
    await prisma.cMS.upsert({
      where: { clave: item.clave },
      update: {
        valor: item.valor,
        tipo: item.tipo.toLowerCase(),
        imagenUrl: item.imagenUrl
      },
      create: {
        clave: item.clave,
        valor: item.valor,
        tipo: item.tipo.toLowerCase(),
        imagenUrl: item.imagenUrl
      }
    });
  }

  console.log('¡CMS sembrado con éxito!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
