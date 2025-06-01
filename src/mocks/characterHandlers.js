import { http, HttpResponse } from 'msw';

const backendUrl = process.env.REACT_APP_BACKEND_URL || '';

const characters = [
  {
    _id: '1',
    name: "Aragorn",
    class: "Guerreiro",
    race: "Humano",
    gender: "Masculino",
    age: "87",
    height: "1.98",
    weight: "95",
    eyeColor: "Cinza",
    skinColor: "Branco",
    hairColor: "Preto",
    description: "Um rei disfarçado que luta para proteger seus amigos.",
    allies: "Gandalf, Legolas, Gimli",
    notes: "Possui uma espada chamada Andúril.",
    traits: "Corajoso, Líder",
    history: "Filho de Arathorn, herdeiro do trono de Gondor.",
    equipment: "Espada Andúril, Capa, Anel",
  },
  {
    _id: '2',
    name: "Gandalf",
    class: "Mago",
    race: "Maiar",
    gender: "Masculino",
    age: "Indeterminado",
    height: "1.80",
    weight: "75",
    eyeColor: "Azul",
    skinColor: "Branco",
    hairColor: "Cinza",
    description: "Um mago poderoso que guia a Sociedade do Anel.",
    allies: "Aragorn, Frodo, Legolas",
    notes: "Conhecido como Mithrandir.",
    traits: "Sábio, Poderoso",
    history: "Enviado pelos Valar para ajudar a Terra-média.",
    equipment: "Cajado, Espada Glamdring",
  },
];

export const characterHandlers = [
  // Endpoint para listar personagens
  http.get(`${backendUrl}/characters`, () => {
    return HttpResponse.json(characters);
  }),

  // Mock para buscar personagem por ID
  http.get(`${backendUrl}/characters/:id`, (req) => {
    const { id } = req.params;
    const character = characters.find(c => c._id === id);

    if (character) {
      return HttpResponse.json(character);
    } else {
      return new HttpResponse(404, {}, { error: 'Character not found' });
    }
  }),
];
