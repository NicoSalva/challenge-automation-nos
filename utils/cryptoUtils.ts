import { createHash } from 'crypto';
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno desde .env

export const getEncryptedSecret = (): string => {
    const secretKey = process.env.SECRET_KEY || '';
    if (!secretKey) {
        throw new Error('SECRET_KEY is not defined in .env');
    }
    return createHash('sha256').update(secretKey).digest('hex');
};
