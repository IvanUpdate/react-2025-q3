import { http } from 'msw';

export const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  species: 'Human',
  image: 'https://rick.com/image.png',
};

export const handlers = [
  http.get('https://rickandmortyapi.com/api/character', (req, res, ctx) => {
    const name = req.url.searchParams.get('name');

    if (name === 'error') {
      return res(ctx.status(404), ctx.json({ error: 'Character not found' }));
    }

    return res(ctx.status(200), ctx.json({ results: [mockCharacter] }));
  }),
];
