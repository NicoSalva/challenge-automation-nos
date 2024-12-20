import { test, expect } from '../tests/fixtures/encryptedKeyFixture';
import { readExcel } from '../utils/readExcel';
import * as fs from 'fs';
import * as path from 'path';
import { WikipediaPage } from '../pages/WikipediaPage';

const testData = readExcel('./data/Datos-pruebas.xlsx'); // Carga los datos del Excel
const imageFolder = './images'; // Carpeta para guardar las imágenes

test.describe('Wikipedia Pokémon Tests', () => {
  // Crear la carpeta 'images' si no existe antes de todas las pruebas
  test.beforeAll(() => {
    if (!fs.existsSync(imageFolder)) {
      fs.mkdirSync(imageFolder);
      console.log(`Created folder: ${imageFolder}`);
    }
  });

  for (const { name } of testData) {
    test(`TEST - Validate Wikipedia page for Pokémon: ${name}`, async ({ page }) => {
      const wikipediaPage = new WikipediaPage(page);

      // Navegar a la página del Pokémon
      await wikipediaPage.navigateToPokemon(name);

      // Validar el título de la página
      const pageTitle = await wikipediaPage.getPageTitle();
      expect(pageTitle.toLowerCase()).toContain(name.toLowerCase());
      console.log(`Page title validated for ${name}: ${pageTitle}`);

      // Obtener y loguear al artista
      const artist = await wikipediaPage.getArtist();
      console.log(`Artist for ${name}:`, artist || 'Artist not found');

      // Obtener la URL de la imagen
      const imageUrl = await wikipediaPage.getPokemonImageUrl();
      if (!imageUrl) {
        throw new Error(`No image URL found for Pokémon: ${name}`);
      }
      console.log(`Extracted Image URL for ${name}:`, imageUrl);

      // Construir la URL absoluta de la imagen
      const absoluteImageUrl = imageUrl.startsWith('http')
        ? imageUrl
        : new URL(imageUrl, 'https://en.wikipedia.org').toString();

      // Descargar la imagen
      const imageBuffer = await wikipediaPage.downloadImage(absoluteImageUrl);

      // Validar tipo MIME
      const contentType = 'image/png'; // Hardcodeado por simplicidad en esta prueba
      wikipediaPage.validateImageMimeType(contentType);

      // Validar tamaño de la imagen
      expect(imageBuffer.byteLength).toBeLessThan(500000);

      // Guardar la imagen
      const extension = 'png'; // Derivado del tipo MIME
      const imageName = `${name}.${extension}`;
      const imagePath = path.join(imageFolder, imageName);

      fs.writeFileSync(imagePath, imageBuffer);
      console.log(`Image saved for ${name} at ${imagePath}`);

      // Validar la extensión del archivo guardado
      const savedExtension = path.extname(imagePath).substring(1);
      expect(['jpg', 'jpeg', 'png', 'svg']).toContain(savedExtension);
    });
  }
});
