import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';
import pokemonList from '../data';

describe('Componente <FavoritePokemon.js />', () => {
  it('Exibe-se na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', async () => {
    renderWithRouter(<FavoritePokemon />);
    screen.getByText(/No favorite Pokémon found/i);
  });

  it('Apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<FavoritePokemon
      pokemonList={ pokemonList.filter((poke, index) => index < 2) }
    />);
    const pokesName = screen.getAllByTestId('pokemon-name');
    const pokesType = screen.getAllByTestId('pokemon-type');
    expect(pokesName).toHaveLength(2);
    expect(pokesType).toHaveLength(2);
    screen.getByText(/pikachu/i);
    screen.getByText(/charmander/i);
  });
});
