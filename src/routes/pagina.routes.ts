import { Router } from 'express';
import * as paginaController from '../controllers/pagina.controller';

const router = Router();

router.get('/', paginaController.getPaginas);
router.get('/:id', paginaController.getPagina);
router.post('/', paginaController.createPagina);
router.put('/:id', paginaController.updatePagina);
router.delete('/:id', paginaController.deletePagina);

export default router;
