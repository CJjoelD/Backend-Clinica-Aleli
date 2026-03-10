import { Request, Response } from 'express';
import * as usuarioService from '../services/usuario.service';

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    res.json(usuarios);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await usuarioService.getUsuarioById(Number(req.params.id));
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUsuario = async (req: Request, res: Response) => {
  try {
    const nuevoUsuario = await usuarioService.createUsuario(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUsuario = async (req: Request, res: Response) => {
  try {
    const usuarioActualizado = await usuarioService.updateUsuario(Number(req.params.id), req.body);
    res.json(usuarioActualizado);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  try {
    await usuarioService.deleteUsuario(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
