import { http, HttpResponse } from "msw";
// import { character } from "../hooks/useCharacter";
const backendUrl = process.env.REACT_APP_BACKEND_URL || "";

const mockCharacters = [
  {
    _id: "1",
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
    _id: "2",
    name: "Gandalf",
    class: "Mago",
    race: "Maiar",
    gender: "Masculino",
    age: "700",
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
  // Listar personagens
  http.get(`${backendUrl}/my-characters`, () => {
    return HttpResponse.json(mockCharacters);
  }),

  // Buscar personagem por ID
  http.get(`${backendUrl}/my-characters/:id`, (req) => {
    const { id } = req.params;
    const mockCharacter = mockCharacters.find((c) => c._id === id);

    if (mockCharacter) {
      return HttpResponse.json(mockCharacter);
    } else {
      return new HttpResponse(404, {}, { error: "Character not found" });
    }
  }),

  // Criar personagem
  http.post(`${backendUrl}/my-characters`, async ({ request }) => {
    const newCharacter = await request.json();

    const savedCharacter = {
      ...newCharacter,
      _id: (mockCharacters.length + 1).toString(),
    };
    mockCharacters.push(savedCharacter);
    return HttpResponse.json(savedCharacter, { status: 201 });
  }),

  // Atualizar personagem parcialmente (PATCH)
  http.patch(`${backendUrl}/my-characters/:id`, async ({ request, params }) => {
    const { id } = params;
    const updates = await request.json();

    const characterIndex = mockCharacters.findIndex((c) => c._id === id);

    if (characterIndex === -1) {
      return new HttpResponse(404, {}, { error: "Character not found" });
    }

    mockCharacters[characterIndex] = {
      ...mockCharacters[characterIndex],
      ...updates,
    };

    return HttpResponse.json(mockCharacters[characterIndex]);
  }),

  // Atualizar personagem completamente (PUT)
  http.put(`${backendUrl}/my-characters/:id`, async ({ request, params }) => {
    const { id } = params;
    const newCharacter = await request.json();

    const characterIndex = mockCharacters.findIndex((c) => c._id === id);
    if (characterIndex === -1) {
      return new HttpResponse(404, {}, { error: "Character not found" });
    }

    const updated = { ...newCharacter, _id: id };
    mockCharacters[characterIndex] = updated;

    return HttpResponse.json(updated);
  }),

  // Deletar personagem
  http.delete(`${backendUrl}/my-characters/:id`, ({ params }) => {
    const { id } = params;
    const index = mockCharacters.findIndex((c) => c._id === id);

    if (index === -1) {
      return new HttpResponse(404, {}, { error: "Character not found" });
    }

    mockCharacters.splice(index, 1);

    return HttpResponse.json({
      message: `Character ${id} deleted successfully.`,
    });
  }),

  // Gerar texto por IA
  http.post(`${backendUrl}/api_bp/gerar-texto`, async ({ request }) => {
    const { prompt } = await request.json();

    // Extração simples do nome do personagem a partir do prompt
    const nameMatch = prompt.match(/Name:(.+?)\n/);
    const name = nameMatch ? nameMatch[1].trim() : "Personagem Desconhecido";

    // Texto gerado fictício com base no nome
    const fakeBackstory = `[História dramática sobre ${name}]`;

    return HttpResponse.json({
      "Generated Text": fakeBackstory,
    });
  }),
];