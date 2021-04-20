import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import * as API from '../../../analyser/APIClient';
import Volatility from './Volatility';
import Leverage from './Leverage';

// props type declaration
export type DetailsProps = {
  stockOverview: API.Stock;
  stockDetails: API.StockDetails;
  companyReports: API.CompanyReports;
  interestCoverages: API.InterestCoverageList;
  risks: API.RiskList;
};

const useStyles = makeStyles(({ palette, typography }: Theme) =>
  createStyles({
    titleContainer: {
      display: 'flex',
      marginBottom: '2rem',
    },
    titleWrapper: {
      marginRight: '1rem',
    },
    sectionTitle: {
      margin: 0,
      color: palette.primary.main,
      // TODO use theme fontsize and weight
      fontSize: '2.25rem',
      fontWeight: typography.fontWeightRegular,
      whiteSpace: 'nowrap',
    },
    lineWrapper: {
      display: 'flex',
      width: '100%',
      borderColor: palette.primary.main,
    },
    line: {
      width: '100%',
      alignSelf: 'center',
      paddingLeft: '2%',
    },
  })
);

const Risks: React.FC<DetailsProps> = ({
  stockOverview,
  stockDetails,
  companyReports,
  interestCoverages,
  risks,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div>
      <div className={classes.titleContainer}>
        <div className={classes.titleWrapper}>
          <h2 className={classes.sectionTitle}>
            {t('analyser.details.RiskHeader')}
          </h2>
        </div>
        <div className={classes.lineWrapper}>
          <hr className={classes.line} />
        </div>
      </div>
      <Volatility details={stockDetails} risks={risks} />
      <Leverage
        stockOverview={stockOverview}
        companyReports={companyReports}
        interestCoverages={interestCoverages}
      />
    </div>
  );
};
export default Risks;
