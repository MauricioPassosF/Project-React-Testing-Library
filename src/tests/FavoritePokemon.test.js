import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Componente <FavoritePokemon.js />', () => {
  it('Exibe-se na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', async () => {
    renderWithRouter(<App />);
    const linkFavPoke = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(linkFavPoke);
    const noFavText = await screen.findByText('No favorite Pokémon found');
    expect(noFavText).toBeInTheDocument();
  });

  // it.only('Apenas são exibidos os Pokémon favoritados', () => {
  //   const { history } = renderWithRouter(<App />);
  //   const linkDetails = screen.getByRole('link', { name: 'More details' });
  //   userEvent.click(linkDetails);
  //   const checkboxFavoritePoke = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  //   userEvent.click(checkboxFavoritePoke);
  //   act(() => { history.push('/favorites'); });

  // });
});
