import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export interface AuthRequest extends Request {
  user?: any;
}

/**
 * Middleware para autenticar el token JWT enviado en los headers.
 * Extrae el token, lo verifica y añade los datos del usuario a la solicitud.
 */
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado, token no proporcionado' });
  }

  const decoded = authService.verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }

  req.user = decoded; // Adjunta el usuario decodificado al request
  next();
};

/**
 * Middleware para restringir el acceso a rutas según el rol del usuario.
 * @param roles Lista de roles permitidos (ej: ['ADMIN', 'PACIENTE'])
 */
export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.rol)) {
      return res.status(403).json({ message: 'No tienes permisos para realizar esta acción' });
    }
    next();
  };
};
