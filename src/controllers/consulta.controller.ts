import { Request, Response } from 'express';
import * as consultaService from '../services/consulta.service';

export const getConsultas = async (req: Request, res: Response) => {
  try {
    const consultas = await consultaService.getAllConsultas();
    res.json(consultas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getConsulta = async (req: Request, res: Response) => {
  try {
    const consulta = await consultaService.getConsultaById(Number(req.params.id));
    if (!consulta) return res.status(404).json({ message: 'Consulta no encontrada' });
    res.json(consulta);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createConsulta = async (req: Request, res: Response) => {
  try {
    const nuevaConsulta = await consultaService.createConsulta(req.body);
    res.status(201).json(nuevaConsulta);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateConsulta = async (req: Request, res: Response) => {
  try {
    const consultaActualizada = await consultaService.updateConsulta(Number(req.params.id), req.body);
    res.json(consultaActualizada);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteConsulta = async (req: Request, res: Response) => {
  try {
    await consultaService.deleteConsulta(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
