import { test, expect } from '../fixtures/encryptedKeyFixture';
import { readExcel } from '../../utils/readExcel';
import * as fs from 'fs';
import * as path from 'path';
import { WikipediaPage } from '../../pages/WikipediaPage';

const testData = readExcel('./data/Datos-pruebas.xlsx'); 
const imageFolder = './images'; 

test.describe('Wikipedia Pokémon Tests', () => {
  
  test.beforeAll(() => {
    if (!fs.existsSync(imageFolder)) {
      fs.mkdirSync(imageFolder);
      console.log(`Created folder: ${imageFolder}`);
    }
  });

  for (const { name } of testData) {
    test(`TEST - Validate Wikipedia page for Pokémon: ${name}`, async ({ page, encryptedKey }) => {
      const wikipediaPage = new WikipediaPage(page);

      await wikipediaPage.navigateToPokemon(name);

      const pageTitle = await wikipediaPage.getPageTitle();
      expect(pageTitle.toLowerCase()).toContain(name.toLowerCase());
      console.log(`Titulo de pagina validado para ${name}: ${pageTitle}`);

      // Obtener y loguear al artista
      const artist = await wikipediaPage.getArtist();
      console.log(`Artista para ${name}:`, artist || 'artista no encontrado');

      // Obtener la URL de la imagenx
      const imageUrl = await wikipediaPage.getPokemonImageUrl();
      if (!imageUrl) {
        throw new Error(`Imagen no encontrada para Pokémon: ${name}`);
      }
      console.log(`URL de la imagen extraida ${name}:`, imageUrl);

      // Construir la URL absoluta de la imagen
      const absoluteImageUrl = imageUrl.startsWith('http')
        ? imageUrl
        : new URL(imageUrl, 'https://en.wikipedia.org').toString();

      // Descargamos la imagen
      const imageBuffer = await wikipediaPage.downloadImage(absoluteImageUrl);

      const contentType = 'image/png'; // Hardcodeado por simplicidad en esta prueba
      wikipediaPage.validateImageMimeType(contentType);

      // Validar tamaño de la imagen
      expect(imageBuffer.byteLength).toBeLessThan(500000);

      const extension = 'png'; 
      const imageName = `${name}.${extension}`;
      const imagePath = path.join(imageFolder, imageName);

      fs.writeFileSync(imagePath, imageBuffer);
      console.log(`Imagen de pokemon ${name} nombrada ${imagePath}`);

      const savedExtension = path.extname(imagePath).substring(1);
      expect(['jpg', 'jpeg', 'png', 'svg']).toContain(savedExtension);
    });
  }
});
