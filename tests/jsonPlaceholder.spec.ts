import { test, expect } from '../tests/fixtures/encryptedKeyFixture';

test.describe('JSONPlaceholder API Tests', () => {
  const endpoint = 'https://jsonplaceholder.typicode.com/posts';

  test('TEST01 - Validate POST request to JSONPlaceholder', async ({ request, encryptedKey }) => {

    // Cuerpo del POST
    const postBody = {
      title: 'Test Title',
      body: 'This is a test body content.',
      userId: 1,
    };

    // Realizar POST request
    const response = await request.post(endpoint, {
      data: postBody,
    });

    // Validar el código de estado
    expect(response.status()).toBe(201);

    // Validar el contenido de la respuesta
    const responseData = await response.json();
    expect(responseData).toMatchObject({
      title: postBody.title,
      body: postBody.body,
      userId: postBody.userId,
    });

    // Loguear fecha y hora de finalización
    console.log('Test Finished At:', new Date().toISOString());
  });
});
