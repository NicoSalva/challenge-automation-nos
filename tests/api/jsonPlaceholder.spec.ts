import { test, expect } from '../fixtures/encryptedKeyFixture';

test.describe('JSONPlaceholder API Tests', () => {
  const endpoint = 'https://jsonplaceholder.typicode.com/posts';

  test('TEST01 - Validate POST request to JSONPlaceholder', async ({ request, encryptedKey }) => {

    const postBody = {
      title: 'Test Title',
      body: 'This is a test body content.',
      userId: 1,
    };

    const response = await request.post(endpoint, {
      data: postBody,
    });

    expect(response.status()).toBe(201);
    
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
