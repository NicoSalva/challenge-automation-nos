import { test, expect } from '../tests/fixtures/encryptedKeyFixture';
import { readExcel } from '../utils/readExcel';

const testData = readExcel('./data/Datos-pruebas.xlsx');



test.describe('Pokémon API Tests', () => {
    for (const { id, name } of testData) {
        test(`Validate Pokémon Data for ID/Name: ${id || name}`, async ({ request }) => {
            const query = id || name;

            // Realizar la petición
            const startTime = Date.now();
            const response = await request.get(`https://pokeapi.co/api/v2/pokemon/${query}`);
            const elapsedTime = Date.now() - startTime;

            // Loguear fecha y hora de finalización
            console.log('Test Finished At:', new Date().toISOString());

            // Validar tiempo de respuesta
            expect(elapsedTime).toBeLessThanOrEqual(10000);

            // Validar el status
            expect(response.status()).toBe(200);

            // Validar datos de la respuesta
            const data = await response.json();
            if (id) expect(data.id).toBe(Number(id));
            if (name) expect(data.name).toBe(name.toLowerCase());
            expect(data.abilities.length).toBeGreaterThan(0); // Validar que tiene al menos una habilidad
        });
    }
});
