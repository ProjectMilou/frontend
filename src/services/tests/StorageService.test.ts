import StorageService from '../StorageService';
describe('StorageService', () => {
  test('Can get a token', () => {
    let token = StorageService.getToken();
    expect(token).toBeFalsy();

    const randstr = 'asdfjoasejfaosd';
    localStorage.setItem('token', randstr);
    token = StorageService.getToken();
    expect(token).toBe(randstr);
  });

  test('Can set a token', () => {
    const randstr = 'asdfjoasejfaosd';
    StorageService.setToken(randstr);
    const token = localStorage.getItem('token');
    expect(token).toBe(randstr);
  });

  test('Can clear a token', () => {
    const randstr = 'asdfjoasejfaosd';
    localStorage.setItem('token', randstr);

    StorageService.removeToken();

    const token = localStorage.getItem('token');
    expect(token).toBeFalsy();
  });
});
