import { Router } from 'express';
import * as consultaController from '../controllers/consulta.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/', consultaController.getConsultas);
router.get('/:id', consultaController.getConsulta);
router.post('/', consultaController.createConsulta);
router.put('/:id', consultaController.updateConsulta);
router.delete('/:id', consultaController.deleteConsulta);

export default router;
