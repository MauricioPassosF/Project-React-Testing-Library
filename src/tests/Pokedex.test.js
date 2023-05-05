import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../pages';
import pokemonList from '../data';

describe('Componente <Pokedex.js />', () => {
  const testIdName = 'pokemon-name';
  const testIdNext = 'next-pokemon';
  it('A página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList.filter((poke, index) => index < 2) }
      isPokemonFavoriteById={ { 25: true, 4: true } }
    />);
    screen.getByRole('heading', {
      name: 'Encountered Pokémon',
      level: 2,
    });
  });

  it('Exibe-se o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList.filter((poke, index) => index < 2) }
      isPokemonFavoriteById={ { 25: true, 4: true } }
    />);
    const buttonNextPoke = screen.getByTestId(testIdNext);
    expect(buttonNextPoke).toHaveTextContent('Próximo Pokémon');
    const firstPoke = screen.getByTestId(testIdName);
    expect(firstPoke).toHaveTextContent('Pikachu');
    userEvent.click(buttonNextPoke);
    const secondPoke = await screen.findByTestId(testIdName);
    expect(secondPoke).toHaveTextContent('Charmander');
    userEvent.click(buttonNextPoke);
    const thirdPoke = await screen.findByTestId(testIdName);
    expect(thirdPoke).toHaveTextContent('Pikachu');
  });

  it('Mostra-se apenas um Pokémon por vez', async () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList.filter((poke, index) => index < 2) }
      isPokemonFavoriteById={ { 25: true, 4: true } }
    />);
    const buttonNextPoke = screen.getByTestId(testIdNext);
    const pokesFirst = screen.getAllByTestId(testIdName);
    expect(pokesFirst).toHaveLength(1);
    userEvent.click(buttonNextPoke);
    const pokesSecond = await screen.findAllByTestId(testIdName);
    expect(pokesSecond).toHaveLength(1);
  });

  it('A Pokédex tem os botões de filtro', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList.filter((poke, index) => index < 2 || index === 6) }
      isPokemonFavoriteById={ { 25: true, 4: true, 6: true } }
    />);
    const buttonsFilter = screen.getAllByTestId('pokemon-type-button');
    expect(buttonsFilter).toHaveLength(2);
    expect(buttonsFilter[0]).toHaveTextContent(/electric/i);
    expect(buttonsFilter[1]).toHaveTextContent(/fire/i);
  });

  // it.only('A Pokédex não tem os botões de filtro sem os pokémons', () => {
  //   renderWithRouter(<Pokedex
  //     pokemonList={ [pokemonList
  //       .filter((poke, index) => index < 2 || index === 6)
  //       .map(({ id }) => id)] }
  //     isPokemonFavoriteById={ { 25: true, 4: true, 6: true } }
  //   />);
  //   const buttonsFilter = screen.getAllByTestId('pokemon-type-button');
  //   expect(buttonsFilter).not.toBeDefined();
  // });

  it('A Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList.filter((poke, index) => index < 2 || index === 6) }
      isPokemonFavoriteById={ { 25: true, 4: true, 6: true } }
    />);
    screen.getByRole('button', { name: /all/i });
  });

  it('A Pokédex tem botões que funcionam corretamente', async () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList.filter((poke, index) => index < 2 || index === 6) }
      isPokemonFavoriteById={ { 25: true, 4: true, 6: true } }
    />);
    const firstUnfilteredPoke = screen.getByTestId(testIdName);
    expect(firstUnfilteredPoke).toHaveTextContent('Pikachu');
    const buttonNextPoke = screen.getByTestId(testIdNext);
    userEvent.click(buttonNextPoke);
    const secondUnfilteredPoke = await screen.findByTestId(testIdName);
    expect(secondUnfilteredPoke).toHaveTextContent('Charmander');
    const buttonsFilter = screen.getAllByTestId('pokemon-type-button');
    const buttonAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(buttonsFilter[1]);
    const firstFilteredPoke = await screen.findByTestId(testIdName);
    expect(firstFilteredPoke).toHaveTextContent('Charmander');
    userEvent.click(buttonNextPoke);
    const secondFilteredPoke = await screen.findByTestId(testIdName);
    expect(secondFilteredPoke).toHaveTextContent('Rapidash');
    userEvent.click(buttonAll);
    const firstAllPoke = await screen.findByTestId(testIdName);
    expect(firstAllPoke).toHaveTextContent('Pikachu');
    userEvent.click(buttonNextPoke);
    const secondAllPoke = await screen.findByTestId(testIdName);
    expect(secondAllPoke).toHaveTextContent('Charmander');
  });
});
