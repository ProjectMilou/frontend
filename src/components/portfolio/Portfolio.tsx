import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Portfolio: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation();
  return <div>{t('portfolio')}</div>;
};

export default Portfolio;
