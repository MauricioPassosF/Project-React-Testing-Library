import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Componente <PokemonDetails.js />', () => {
  it('As informações detalhadas do Pokémon selecionado são mostradas na tela', async () => {
    renderWithRouter(<App />);
    const linkDetailsApp = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(linkDetailsApp);
    screen.getByRole('heading', { name: /pikachu details/i, level: 2 });
    const linkDetails = screen.queryByRole('link', { name: /more details/i });
    expect(linkDetails).not.toBeInTheDocument();
    screen.getByRole('heading', { name: /summary/i, level: 2 });
    const pokeText = screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
    expect(pokeText).toBeInTheDocument();
  });

  it('Existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);
    const linkDetailsApp = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(linkDetailsApp);
    screen.getByRole('heading', { name: /game locations of pikachu/i, level: 2 });
    const locationsImages = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(locationsImages).toHaveLength(2);
    expect(locationsImages[0]).toHaveProperty('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    screen.getByText(/kanto viridian forest/i);
    expect(locationsImages[1]).toHaveProperty('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    screen.getByText(/kanto power plant/i);
  });

  it('O usuário pode favoritar um Pokémon através da página de detalhes', async () => {
    renderWithRouter(<App />);
    const linkDetailsApp = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(linkDetailsApp);
    const altImage = 'Pikachu is marked as favorite';
    const checkbox = await screen.findByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();
    const imageFavPrev = screen.queryByRole('img', { name: altImage });
    expect(imageFavPrev).not.toBeInTheDocument();
    userEvent.click(checkbox);
    await screen.findByRole('img', { name: altImage });
    userEvent.click(checkbox);
    const imageFavAfter = screen.queryByRole('img', { name: altImage });
    expect(imageFavAfter).not.toBeInTheDocument();
  });
});
