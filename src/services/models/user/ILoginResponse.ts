export interface ILoginResponse {
  token: string;
  user: {
    email: string;
    id: string;
  };
}
