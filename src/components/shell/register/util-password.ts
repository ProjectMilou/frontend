import React from 'react';

interface IPasswordRequirement {
  text: string;
  done: boolean;
}

export interface IRequirements {
  requirement: IPasswordRequirement[];
}

interface CheckProps {
  password: string;
  setRequirements: React.Dispatch<React.SetStateAction<IRequirements>>;
}
export const checkPasswordRequirements = ({
  password,
  setRequirements,
}: CheckProps): void => {
  setRequirements((prevState) => ({
    requirement: [
      {
        ...prevState.requirement[0],
        done: password.length >= 8,
      },
      {
        ...prevState.requirement[1],
        done: /[a-z]{1}/.test(password) && /[A-Z]{1}/.test(password),
      },
      {
        ...prevState.requirement[2],
        done: /[0-9]{1}/.test(password),
      },
      {
        ...prevState.requirement[3],
        done: /[^a-zA-Z][^0-9]{1}/.test(password),
      },
    ],
  }));
};
