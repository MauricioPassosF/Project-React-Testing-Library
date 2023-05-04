import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Componente <Pokedex.js />', () => {
  it('A página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const headingPokedex = screen.getByRole('heading', {
      name: 'Encountered Pokémon',
      level: 2,
    });
    expect(headingPokedex).toBeInTheDocument();
  });

  it('Exibe-se o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    const { history } = renderWithRouter(<App />);
    const buttonNextPoke = screen.getByTestId('next-pokemon');
    // console.log(buttonNextPoke);
    expect(buttonNextPoke).toBeInTheDocument();
    console.log(history);
    userEvent.click(buttonNextPoke);
    console.log(history);
    // expect(buttonNextPoke).toHaveProperty('name', 'Próximo Pokémon');
  });

  it.skip('Mostra-se apenas um Pokémon por vez', () => {
  });

  it.skip('A Pokédex tem os botões de filtro', () => {
  });

  it.skip('A Pokédex contém um botão para resetar o filtro', () => {
  });
});
