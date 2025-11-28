// src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import { userService } from '../services';
import { generateToken } from '../services/authentication.service';

const ALLOWED_ADMIN_EMAILS = ['secretaria@example.com', 'drjohngosling@mail.com'];

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const user = await userService.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    if (!ALLOWED_ADMIN_EMAILS.includes(user.email)) {
      return res.status(403).json({ error: 'No tiene permisos de administrador' });
    }

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'medical123';

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = generateToken({
      userId: String(user.id),
      email: user.email,
      name: user.name,
      role: 'admin',
    });

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: 'admin',
      },
    });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  login,
};
