import { http, HttpResponse } from 'msw';

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('http://localhost:3000/api/user', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      id: 'msw3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      name: 'MSW',
      email: 'msw@example.com',
      walletAddress: '0x1234567890123456789012345678901234567890',
      profileImage: 'https://avatars.githubusercontent.com/u/78407912?v=4',
      message: 'Hello, I am a developer',
      projectsCreated: 3,
      projectsBackedCount: 7,
      totalAmountBacked: 150000,
    });
  }),
];
