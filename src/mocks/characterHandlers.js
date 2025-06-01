import { http, HttpResponse } from 'msw';

const backendUrl = process.env.REACT_APP_BACKEND_URL || '';

export const characterHandlers = [
  // Endpoint exemplo para listar personagens
  http.get(`${backendUrl}/characters`, () => {
    return HttpResponse.json([
      { _id: '1', name: 'Personagem 1' },
      { _id: '2', name: 'Personagem 2' },
    ]);
  }),

  // Outros endpoints de personagens podem ser adicionados aqui
];
