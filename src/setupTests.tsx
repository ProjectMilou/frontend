// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import React from 'react';
import fetchMock from 'jest-fetch-mock';

// mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    // return the key instead of the translation
    t: (x: unknown) => x,
    i18n: {
      // do nothing on language change
      changeLanguage: () => new Promise(() => {}),
    },
  }),
  /*
   * Mock Trans component. There are multiple ways to use the Trans component.
   * This mock renders the 'i18nKey', 'values' and 'components' properties as
   * text so that is is possible to check for their presence in tests. If the
   * Trans component is used in a different way, this mock will either not do
   * much (children won't be rendered) or fail ('values' or 'components' are
   * of type array instead of object). Therefore, if the component is used in
   * a different way than assumed by this mock, the mock needs to be updated.
   */
  Trans: ({
    i18nKey,
    values,
    components,
  }: {
    i18nKey: string | undefined;
    values: { [_: string]: React.ReactNode } | undefined;
    components: { [_: string]: React.ReactNode } | undefined;
  }) => (
    <span className="trans-mock">
      {i18nKey}
      {values &&
        Object.entries(values).map(([k, v]) => <span key={k}>{v}</span>)}
      {components &&
        Object.entries(components).map(([k, v]) => <span key={k}>{v}</span>)}
    </span>
  ),
}));

// mock apex
// credit to https://github.com/apexcharts/react-apexcharts/issues/260#issuecomment-794481122
jest.mock('react-apexcharts', () => ({
  __esModule: true,
  default: () => <div>mocked chart</div>,
}));

// mock fetch
fetchMock.enableMocks();

// mock portfolio router
export const mockPortfolioRouter = jest.mock('./portfolio/Router.ts', () => ({
  portfolioDetails: jest.fn(),
  portfolioDashboard: jest.fn(),
  stockDetails: jest.fn(),
  importPortfolio: jest.fn(),
}));

export default {};
