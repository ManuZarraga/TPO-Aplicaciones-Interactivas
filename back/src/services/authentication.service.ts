import * as jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export interface AuthPayload {
  userId: string;
  email: string;
  name: string;
  role: 'admin';
}

export function generateToken(payload: AuthPayload, expiresIn: string | number = '8h'): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: expiresIn as any });
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, SECRET_KEY) as AuthPayload;
  } catch (error) {
    return null;
  }
}
