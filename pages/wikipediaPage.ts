import { Page } from '@playwright/test';

export class WikipediaPage {
  private page: Page;

  // Definimos los locators
  private artistLocator = 'text=artwork by';
  private imageLocator = 'img[src*="_art.png"]';

  constructor(page: Page) {
    this.page = page;
  }

  // Navegar a la página de un Pokémon
  async navigateToPokemon(name: string) {
    await this.page.goto(`https://en.wikipedia.org/wiki/${name}`);
  }

  // Obtener el título de la página
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  // Obtener el artista del dibujo
  async getArtist(): Promise<string | null> {
    const artistElement = this.page.locator(this.artistLocator);
    return await artistElement.textContent();
  }

  // Obtener la URL de la imagen del Pokémon
  async getPokemonImageUrl(): Promise<string | null> {
    const imageElement = this.page.locator(this.imageLocator);
    return await imageElement.getAttribute('src');
  }

  // Descargar la imagen
  async downloadImage(imageUrl: string): Promise<Buffer> {
    const response = await this.page.request.get(imageUrl);
    if (!response.ok()) {
      throw new Error(`Failed to fetch image. Status: ${response.status()}`);
    }
    return await response.body();
  }

  // Validar el tipo MIME de la imagen
  validateImageMimeType(contentType: string): void {
    const validMimeTypes = /image\/(jpeg|png|svg\+xml)/i;
    if (!validMimeTypes.test(contentType)) {
      throw new Error(`Invalid MIME type: ${contentType}`);
    }
  }
}

