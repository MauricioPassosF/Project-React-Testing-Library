import React from 'react';
import { screen, render } from '@testing-library/react';
import { About } from '../pages';

describe('Teste o componente <About.js />', () => {
  it('A página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const headingAbout = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(headingAbout).toBeInTheDocument();
  });

  it('A página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const paragraphsAbout1 = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
    const paragraphsAbout2 = screen.getByText(/one can filter pokémon by type, and see more details for each one of them/i);
    expect(paragraphsAbout1 && paragraphsAbout2).toBeTruthy();
  });

  it('A página contém a imagem correta de uma Pokédex', () => {
    render(<About />);
    const imageAbout = screen.getByRole('img', { name: /pokédex/i });
    expect(imageAbout).toBeInTheDocument();
    expect(imageAbout).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
