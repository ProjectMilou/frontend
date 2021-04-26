export interface PasswordInput {
  password: string;
  confirmPassword: string;
}

export interface UserInput extends PasswordInput {
  email: string;
}

export interface ErrorState {
  email: string;
  password: string;
  confirmPassword: string;
}
