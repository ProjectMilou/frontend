// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';

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
}));
