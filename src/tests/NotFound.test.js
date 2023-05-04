import React from 'react';
import { screen, render } from '@testing-library/react';
import { NotFound } from '../pages';

describe('Teste o componente <NotFound.js />', () => {
  it('a página contém um heading h2 com o texto Page requested not found', () => {
    render(<NotFound />);
    const headingNotFound = screen.getByRole('heading', {
      name: 'Page requested not found',
      level: 2,
    });
    expect(headingNotFound).toBeInTheDocument();
  });

  it('a página mostra a imagem correta', () => {
    render(<NotFound />);
    const imageNotFound = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    expect(imageNotFound).toBeInTheDocument();
    expect(imageNotFound).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
