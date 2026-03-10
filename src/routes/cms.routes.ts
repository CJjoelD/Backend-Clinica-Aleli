import { Router } from 'express';
import * as cmsController from '../controllers/cms.controller';

const router = Router();

router.get('/', cmsController.getCMSList);
router.get('/:clave', cmsController.getCMS);
router.post('/', cmsController.createCMS);
router.put('/:id', cmsController.updateCMS);
router.delete('/:id', cmsController.deleteCMS);

export default router;
