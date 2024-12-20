import { expect, test as baseTest } from '@playwright/test';
import crypto from 'crypto';

// 
const test = baseTest.extend<{ encryptedKey: string }>({
    encryptedKey: async ({}, use) => {
        const secretKey = process.env.SECRET_KEY || 'default-secret'; // Clave secreta desde variable de entorno
        const hash = crypto.createHash('sha256').update(secretKey).digest('hex');
        console.log('Encrypted Key:', hash); // Logueo único antes de cada test
        await use(hash); // Proveer la clave encriptada al test
    },
});

export { test, expect };
