import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { JWT_SECRET } from '@config';

export const createAccessToken = (obj: any) => jwt.sign(obj, JWT_SECRET, { expiresIn: '90d' });

export const checkPassword = async (passwordToCheck: string, passwordInDB: string) =>
    bcrypt.compare(passwordToCheck, passwordInDB);

export const checkAccessToken = (token: string) => jwt.verify(token, JWT_SECRET);
