import { Router } from 'express';
import authRoutes from './auth.routes';
import usuarioRoutes from './usuario.routes';
import consultaRoutes from './consulta.routes';
import paginaRoutes from './pagina.routes';
import cmsRoutes from './cms.routes';
import resultadoRoutes from './resultado.routes';
import contactoRoutes from './contacto.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/consultas', consultaRoutes);
router.use('/paginas', paginaRoutes);
router.use('/cms', cmsRoutes);
router.use('/resultados', resultadoRoutes);
router.use('/contacto', contactoRoutes);

export default router;
