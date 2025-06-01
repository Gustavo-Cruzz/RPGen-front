import { http, HttpResponse } from 'msw';

const backendUrl = process.env.REACT_APP_BACKEND_URL || '';

export const userHandlers = [
  // Endpoint de registro
  http.post(`${backendUrl}/api/auth/register`, async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json({
      message: '(mock) Usuário cadastrado com sucesso',
      user: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });
  }),

  // Endpoint de login
  http.post(`${backendUrl}/api/auth/login`, async ({ request }) => {
    const body = await request.json();

    if (body.email === 'mock@email.com' && body.password === '123') {
      return HttpResponse.json({
        message: '(mock) Usuário logado com sucesso',
        token: 'mock-jwt-token',
        user: {
          username: 'MockUser',
          email: 'mock@email.com',
        },
      });
    }

    return HttpResponse.json(
      { message: 'Credenciais inválidas' },
      { status: 401 }
    );
  }),

  // Endpoint para manter o usuário autenticado
  http.get(`${backendUrl}/api/auth/me`, ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (authHeader === 'Bearer mock-jwt-token') {
      return HttpResponse.json({
        user: {
          username: 'MockUser',
          email: 'mock@email.com',
        },
      });
    }
    return HttpResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }),
];
