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
  const ogFilters: API.Filters = { countries: [], industries: [], currencies: [], mcSizes: [] };
  stocks.forEach((s) => {
    if (!ogFilters.countries.includes(s.country)) {
      ogFilters.countries.push(s.country);
    }
    if (!ogFilters.industries.includes(s.country)) {
      ogFilters.industries.push(s.industry);
    }
    if (!ogFilters.currencies.includes(s.currency)) {
      ogFilters.currencies.push(s.currency);
    }
  });
  ogFilters.countries.sort();
  ogFilters.industries.sort();
  ogFilters.currencies.sort();
  return ogFilters;
}

export type FilterProps = {
  stocks: API.Stock[];
};

const Filter: React.FC<FilterProps> = ({ stocks }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const ogFilters = setOriginalFilters(stocks);
  const emptyFilters: API.Filters = { countries: [], industries: [], currencies: [], mcSizes: [] };
  const [filters, setFilters] = React.useState<API.Filters>(emptyFilters);

  const clearFilters = () => {
    setFilters({ countries: [], industries: [], currencies: [], mcSizes: []});
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const temp = event.target.value as string[];
    const name = event.target.name as string;
    if (temp.indexOf('') > -1) {
      switch (name) {
        case 'Country':
          setFilters({ ...filters, countries: [] });
          break;
        case 'Industry':
          setFilters({ ...filters, industries: [] });
          break;
        case 'Currency':
          setFilters({ ...filters, currencies: [] });
          break;
        default:
          break;
      }
    } else {
      switch (name) {
        case 'Country':
          setFilters({ ...filters, countries: temp });
          break;
        case 'Industry':
          setFilters({ ...filters, industries: temp });
          break;
        case 'Currency':
          setFilters({ ...filters, currencies: temp });
          break;
        default:
          break;
      }
    }
  };

  const sendRequest = () => {
    // TODO: send a filter request and tell?
  };

  return (
    <Container className={classes.filterContainer}>
      <FilterBar
        filtersList={filters.countries}
        ogFiltersList={ogFilters.countries}
        handleChange={handleChange}
        name={t('stock.country')}
      />
      <FilterBar
        filtersList={filters.industries}
        ogFiltersList={ogFilters.industries}
        handleChange={handleChange}
        name={t('stock.industry')}
      />
      <FilterBar
        filtersList={filters.currencies}
        ogFiltersList={ogFilters.currencies}
        handleChange={handleChange}
        name={t('stock.currencies')}
      />
      <ButtonGroup
        className={classes.buttonGroup}
        variant="contained"
        color="primary"
      >
        <Button
          type="button"
          onClick={() => sendRequest}
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
