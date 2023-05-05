import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Pokemon } from '../components';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Componente <Pokemon.js />', () => {
  it('Renderiza-se um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonList[0] } isFavorite={ false } />);
    const name = screen.getByTestId('pokemon-name');
    expect(name).toHaveTextContent('Pikachu');
    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent('Electric');
    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    const imageAbout = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(imageAbout).toBeInTheDocument();
    expect(imageAbout).toHaveProperty('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  it('O card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes', async () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemonList[0] }
      isFavorite={ false }
    />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe('/pokemon/25');
  });

  it('Existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonList[0] }
      isFavorite
    />);
    const imageFav = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(imageFav).toBeInTheDocument();
    expect(imageFav).toHaveProperty('src', 'http://localhost/star-icon.svg');
  });

  it('Pokémon não favoritados não tem ícone de estrela', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonList[0] }
      isFavorite={ false }
    />);
    expect(screen.getByRole('img', { name: 'Pikachu is marked as favorite' })).toBeUndefined();
  });
});
