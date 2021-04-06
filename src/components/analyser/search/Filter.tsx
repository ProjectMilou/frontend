import React from 'react';
import {
  Button,
  ButtonGroup,
  makeStyles,
  Container,
  Typography,
} from '@material-ui/core';
import { FilterList, Delete } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import * as API from '../../../analyser/APIClient';
import { FilterBar } from './FilterBar';

const useStyles = makeStyles({
  filterContainer: {
    'background-color': '#EEF1FB',
    minWidth: '50%',
    maxWidth: 'sm',
    minHeight: '90px',
  },
  buttonGroup: {
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '20px',
  },
});

function setOriginalFilters(stocks: API.Stock[]) {
  const ogFilters: API.Filters = { country: [], industry: [], currency: [], mc: [] };
  stocks.forEach((s) => {
    if (!ogFilters.country.includes(s.country)) {
      ogFilters.country.push(s.country);
    }
    if (!ogFilters.industry.includes(s.country)) {
      ogFilters.industry.push(s.industry);
    }
    if (!ogFilters.currency.includes(s.currency)) {
      ogFilters.currency.push(s.currency);
    }
  });
  ogFilters.country.sort();
  ogFilters.industry.sort();
  ogFilters.currency.sort();
  return ogFilters;
}

export type FilterProps = {
  stocks: API.Stock[];
  filters: API.Filters;
  setFilters: React.Dispatch<React.SetStateAction<API.Filters>>
  updateStockList: () => Promise<void>
};

const Filter: React.FC<FilterProps> = ({ stocks, filters, setFilters, updateStockList }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const ogFilters = setOriginalFilters(stocks);
  const emptyFilters: API.Filters = { country: [], industry: [], currency: [], mc: [] };

  const clearFilters = () => {
    setFilters(emptyFilters)
    updateStockList()
   
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const temp = event.target.value as string[];
    const name = event.target.name as string;
    if (temp.indexOf('') > -1) {
      switch (name) {
        case 'Country':
          setFilters({ ...filters, country: [] });
          break;
        case 'Industry':
          setFilters({ ...filters, industry: [] });
          break;
        case 'Currency':
          setFilters({ ...filters, currency: [] });
          break;
        default:
          break;
      }
    } else {
      switch (name) {
        case 'Country':
          setFilters({ ...filters, country: temp });
          break;
        case 'Industry':
          setFilters({ ...filters, industry: temp });
          break;
        case 'Currency':
          setFilters({ ...filters, currency: temp });
          break;
        default:
          break;
      }
    }
  };

  return (
    <Container className={classes.filterContainer}>
      <FilterBar
        filtersList={filters.country}
        ogFiltersList={ogFilters.country}
        handleChange={handleChange}
        name={t('stock.country')}
      />
      <FilterBar
        filtersList={filters.industry}
        ogFiltersList={ogFilters.industry}
        handleChange={handleChange}
        name={t('stock.industry')}
      />
      <FilterBar
        filtersList={filters.currency}
        ogFiltersList={ogFilters.currency}
        handleChange={handleChange}
        name={t('stock.currency')}
      />
      <FilterBar
        filtersList={filters.mc}
        ogFiltersList={ogFilters.mc}
        handleChange={handleChange}
        name={t('stock.marketCap')}
      />
      <ButtonGroup
        className={classes.buttonGroup}
        variant="contained"
        color="primary"
      >
        <Button
          type="button"
          onClick={() => updateStockList()}
          startIcon={<FilterList />}
        >
          Adapt
        </Button>
        <Button type="button" onClick={clearFilters} startIcon={<Delete />}>
          <Typography>{t('analyser.filter.clear')}</Typography>
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default Filter;
