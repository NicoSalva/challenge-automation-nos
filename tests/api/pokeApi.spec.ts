import { test, expect } from '../fixtures/encryptedKeyFixture';
import { readExcel } from '../../utils/readExcel';
import { allure } from 'allure-playwright';

const testData = readExcel('./data/Datos-pruebas.xlsx');

test.describe('Pokémon API Tests', () => {
  
  const endpoint = 'https://pokeapi.co/api/v2/pokemon';
  for (const { id, name } of testData) {
    test(`Validate Pokémon Data for ID/Name: ${id || name}`, async ({ request, encryptedKey }) => {
      const query = id || name;

      // Realizar la petición
      const startTime = Date.now();
      const response = await request.get(`${endpoint}/${query}`);
      const elapsedTime = Date.now() - startTime;

      // Loguear fecha y hora de finalización
      console.log('Test Finished At:', new Date().toISOString());

      expect(elapsedTime).toBeLessThanOrEqual(10000);
      expect(response.status()).toBe(200);

      const data = await response.json();
      if (id) expect(data.id).toBe(Number(id));
      if (name) expect(data.name).toBe(name.toLowerCase());
      expect(data.abilities.length).toBeGreaterThan(0); //Que tiene al menos una habilidad
    });
  }
});
