import { Router } from 'express';
import * as usuarioController from '../controllers/usuario.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticateToken); // Todas las rutas de usuarios requieren autenticación

router.get('/', usuarioController.getUsuarios);
router.get('/:id', usuarioController.getUsuario);
router.post('/', usuarioController.createUsuario);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

export default router;
