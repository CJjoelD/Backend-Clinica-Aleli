import { Request, Response } from 'express';
import * as resultadoService from '../services/resultado.service';

export const getResultados = async (req: Request, res: Response) => {
  try {
    const resultados = await resultadoService.getAllResultados();
    res.json(resultados);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getResultado = async (req: Request, res: Response) => {
  try {
    const resultado = await resultadoService.getResultadoById(Number(req.params.id));
    if (!resultado) return res.status(404).json({ message: 'Resultado no encontrado' });
    res.json(resultado);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createResultado = async (req: Request, res: Response) => {
  try {
    const nuevoResultado = await resultadoService.createResultado(req.body);
    res.status(201).json(nuevoResultado);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateResultado = async (req: Request, res: Response) => {
  try {
    const resultadoActualizado = await resultadoService.updateResultado(Number(req.params.id), req.body);
    res.json(resultadoActualizado);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteResultado = async (req: Request, res: Response) => {
  try {
    await resultadoService.deleteResultado(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const buscarResultado = async (req: Request, res: Response) => {
  try {
    const { cedula, numeroOrden } = req.query;
    if (!cedula || !numeroOrden) {
        return res.status(400).json({ message: 'Cedula and Numero de Orden are required.' });
    }
    const resultado = await resultadoService.getResultadoByCedulaAndOrder(String(cedula), String(numeroOrden));
    if (!resultado) {
        return res.status(404).json({ message: 'No result found for the provided information.' });
    }
    res.json(resultado);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
