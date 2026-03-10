import { Request, Response } from 'express';

export const enviarMensaje = async (req: Request, res: Response) => {
    try {
        const { nombre, apellido, email, mensaje } = req.body;

        // Aquí iría la lógica de Nodemailer para enviar el correo real
        // Por ahora lo simulamos
        console.log('Nuevo mensaje de contacto recibido:');
        console.log(`De: ${nombre} ${apellido} (${email})`);
        console.log(`Mensaje: ${mensaje}`);

        // TODO: Configurar TRANSPORTER de Nodemailer con credenciales reales
        /*
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        */

        res.status(200).json({
            status: 'success',
            message: 'Mensaje enviado correctamente a la Clínica Alelí'
        });
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
        res.status(500).json({
            status: 'error',
            message: 'Ocurrió un error al enviar el mensaje'
        });
    }
};
