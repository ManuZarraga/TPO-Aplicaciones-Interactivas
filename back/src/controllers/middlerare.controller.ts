// src/controllers/middleware.controller.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken, AuthPayload } from '../services/authentication.service';

export interface AuthRequest extends Request {
  user?: AuthPayload;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'No autorizado: falta token' });
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
      return res.status(401).json({ error: 'No autorizado: formato inválido' });
    }

    const payload = verifyToken(token);

    if (!payload) {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    // usuario en la request para los controllers
    (req as AuthRequest).user = payload;

    console.log('Autenticación exitosa para', payload.email);
    next();
  } catch (error) {
    next(error);
  }
};

export const middlewareController = {
  authMiddleware,
};
