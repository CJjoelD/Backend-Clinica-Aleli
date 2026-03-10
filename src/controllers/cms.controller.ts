import { Request, Response } from 'express';
import * as cmsService from '../services/cms.service';

export const getCMSList = async (req: Request, res: Response) => {
  try {
    const list = await cmsService.getAllCMS();
    res.json(list);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCMS = async (req: Request, res: Response) => {
  try {
    const item = await cmsService.getCMSByClave(req.params.clave as string);
    if (!item) return res.status(404).json({ message: 'Contenido no encontrado' });
    res.json(item);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createCMS = async (req: Request, res: Response) => {
  try {
    const newItem = await cmsService.createCMS(req.body);
    res.status(201).json(newItem);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCMS = async (req: Request, res: Response) => {
  try {
    const itemActualizado = await cmsService.updateCMS(Number(req.params.id), req.body);
    res.json(itemActualizado);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCMS = async (req: Request, res: Response) => {
  try {
    await cmsService.deleteCMS(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};