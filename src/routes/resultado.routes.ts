import { Router } from 'express';
import * as resultadoController from '../controllers/resultado.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/', resultadoController.getResultados);
router.get('/:id', resultadoController.getResultado);
router.post('/', resultadoController.createResultado);
router.get('/buscar', resultadoController.buscarResultado);
router.put('/:id', resultadoController.updateResultado);
router.delete('/:id', resultadoController.deleteResultado);

export default router;
