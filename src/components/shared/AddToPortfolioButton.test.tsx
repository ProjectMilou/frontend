import { render, screen, fireEvent } from '@testing-library/react';
import * as React from 'react';
import AddToPortfolioButton from './AddToPortfolioButton';

describe('AddToPortfolioButton', () => {
  const renderComponent = (valid?: boolean) =>
    render(<AddToPortfolioButton symbol={valid ? 'A' : ''} />);

  test('Render button', () => {
    const { container } = renderComponent(true);

    screen.getByText('analyzer.addToPortfolio');

    expect(
      container.querySelector('[class *= makeStyles-addButton]')
    ).toBeInTheDocument();
  });

  test.skip('Clicking button opens dialog window', () => {
    const { container } = renderComponent(true);

    fireEvent.click(screen.getByText('analyzer.addToPortfolio'));

    expect(
      container.querySelector('[class *= MuiDialogTitle-root]')
    ).toBeInTheDocument();

    screen.getByText('portfolio.dialog.addStock.title');

    screen.getByText('portfolio.dialog.addStock.text');
  });
});
