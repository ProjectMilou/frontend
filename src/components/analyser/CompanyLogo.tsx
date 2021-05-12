import React from 'react';
import { Stock } from '../../analyser/APIClient';
import logo from '../../assets/images/placeholder.png';

type LogoProps = {
  stockOverview: Stock;
  style: string;
};

/**
 * This component displays the stock logos and replaces it with the Milou logo incase it doesn't exist
 * @param style allows the logo to be reused in different location independently styled
 */
const CompanyLogo: React.FC<LogoProps> = ({ stockOverview, style }) => {
  if (stockOverview.picture.toString() !== '') {
    return (
      <img
        className={style}
        alt="Company Logo"
        src={stockOverview.picture.toString()}
      />
    );
  }
  return <img className={style} alt="Company Logo" src={logo} />;
};

export default CompanyLogo;
