import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, makeStyles, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import DuplicateIcon from '@material-ui/icons/AddToPhotos';
import EditIcon from '@material-ui/icons/Edit';
import classNames from 'classnames';
import { PortfolioOverview } from '../../portfolio/APIClient';

const useStyles = makeStyles(() => ({
  action: { display: 'inline-block' },
  disabled: {
    cursor: 'not-allowed',
  },
}));

type DashboardActionsProps = {
  portfolio: PortfolioOverview;
  renamePortfolio: (id: string) => void;
  duplicatePortfolio: (id: string) => void;
  deletePortfolio: (id: string) => void;
};

const DashboardActions: React.FC<DashboardActionsProps> = ({
  portfolio,
  renamePortfolio,
  duplicatePortfolio,
  deletePortfolio,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <Tooltip title={t('portfolio.rename').toString()}>
        <div className={classes.action}>
          <IconButton
            onClick={(e) => {
              renamePortfolio(portfolio.id);
              e.stopPropagation();
            }}
          >
            <EditIcon />
          </IconButton>
        </div>
      </Tooltip>
      <Tooltip title={t('portfolio.duplicate').toString()}>
        <div className={classes.action}>
          <IconButton
            onClick={(e) => {
              duplicatePortfolio(portfolio.id);
              e.stopPropagation();
            }}
          >
            <DuplicateIcon />
          </IconButton>
        </div>
      </Tooltip>
      <Tooltip
        title={(portfolio.virtual
          ? t('portfolio.delete')
          : t('portfolio.deleteReal')
        ).toString()}
        // stop click event propagation here because the delete button can be disabled
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={classNames(
            classes.action,
            !portfolio.virtual && classes.disabled
          )}
        >
          <IconButton
            disabled={!portfolio.virtual}
            onClick={() => {
              deletePortfolio(portfolio.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </Tooltip>
    </>
  );
};

export default DashboardActions;
