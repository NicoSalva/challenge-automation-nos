import { test, expect } from '@playwright/test';
import { getEncryptedSecret } from '../utils/cryptoUtils';

test('Example Test', async ({ request }) => {
    // Loguear la clave secreta encriptada
    console.log('Encrypted Key:', getEncryptedSecret());

    // Aquí incluirías la lógica de tu prueba
    const response = await request.get('https://pokeapi.co/api/v2/pokemon/pikachu');
    expect(response.status()).toBe(200);
});
