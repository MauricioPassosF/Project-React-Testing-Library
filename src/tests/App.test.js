import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Componente <App.js />', () => {
  it('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavPoke = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavPoke).toBeInTheDocument();
  });

  it('A aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  it('A aplicação é redirecionada para a página de About, na URL /about ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);
    console.log(history);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  it('A aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavPoke = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(linkFavPoke);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('A aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/invalid'); });
    const notFoundText = await screen.findByRole('heading', {
      name: 'Page requested not found',
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
