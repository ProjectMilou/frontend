const url = 'https://api.milou.io';

export interface UserInput {
  email: string;
  password: string;
  confirmPassword: string;
}

interface FetchProps {
  login: UserInput;
  onSuccess: () => void;
  onFail: () => void;
}

const fetchRegister = ({ login, onSuccess, onFail }: FetchProps): void => {
  fetch(url.concat('/user/register'), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: login.email, password: login.password }),
  }).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  });
};

export default fetchRegister;
