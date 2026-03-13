import prisma from './src/config/prisma';
import * as bcrypt from 'bcryptjs';

async function main() {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const user = await prisma.usuario.upsert({
        where: { email: 'admin@aleli.com' },
        update: { password: hashedPassword },
        create: {
            nombre: 'Admin Alelí',
            email: 'admin@aleli.com',
            password: hashedPassword,
            rolId: 1
        }
    });
    console.log('✅ Usuario admin@aleli.com creado/actualizado con éxito');
    console.log('ID del usuario:', user.id);
}

main()
    .catch((e) => {
        console.error('❌ Error detallado:');
        console.error(e);
        process.exit(1);
    })
    .finally(async () => await prisma.$disconnect());
