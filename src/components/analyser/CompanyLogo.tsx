import React from 'react';
import { Stock } from '../../analyser/APIClient';
import logo from '../../assets/images/logo1.png';


type LogoProps = {
    stockOverview: Stock;
    style: string;
}

const CompanyLogo: React.FC<LogoProps> = ({
    stockOverview,
    style
  }) => {
    if(stockOverview.picture.toString() !== ''){
      return (
            <img
                className={style}
                alt='Company Logo'
                src={stockOverview.picture.toString()}
              />  
    );
    }
    return (
      <div>
          <img
              className={style}
              alt='Company Logo'
              src={logo}
            />
      </div>   
      )
};

export default CompanyLogo;