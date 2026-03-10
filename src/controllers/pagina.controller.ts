import { Request, Response } from 'express';
import * as paginaService from '../services/pagina.service';

export const getPaginas = async (req: Request, res: Response) => {
  try {
    const paginas = await paginaService.getAllPaginas();
    res.json(paginas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPagina = async (req: Request, res: Response) => {
  try {
    const pagina = await paginaService.getPaginaById(Number(req.params.id));
    if (!pagina) return res.status(404).json({ message: 'Página no encontrada' });
    res.json(pagina);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createPagina = async (req: Request, res: Response) => {
  try {
    const nuevaPagina = await paginaService.createPagina(req.body);
    res.status(201).json(nuevaPagina);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePagina = async (req: Request, res: Response) => {
  try {
    const paginaActualizada = await paginaService.updatePagina(Number(req.params.id), req.body);
    res.json(paginaActualizada);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePagina = async (req: Request, res: Response) => {
  try {
    await paginaService.deletePagina(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
