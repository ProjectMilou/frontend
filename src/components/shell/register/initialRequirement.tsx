import { useTranslation } from 'react-i18next';
import { IRequirements } from './util-password';

const InitialPasswordRequirements = (): IRequirements => {
  const { t } = useTranslation();
  return {
    requirement: [
      {
        text: t('error.passwordRequirement.length'),
        done: false,
      },
      {
        text: t('error.passwordRequirement.cases'),
        done: false,
      },
      {
        text: t('error.passwordRequirement.number'),
        done: false,
      },
      {
        text: t('error.passwordRequirement.specialCharacter'),
        done: false,
      },
    ],
  };
};

export default InitialPasswordRequirements;
