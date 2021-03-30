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

type Filters = {
  countries: string[];
  industries: string[];
  currency: string[];
  marketCapitalization: string[];
};

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
  const ogFilters: Filters = {
    countries: [],
    industries: [],
    currency: [],
    marketCapitalization: ['Mega', 'Large', 'Mid', 'Small', 'Micro'],
  };
  // Mega: More than $200 billion
  // Large: $10 billion to $200 billion
  // Mid: $2 billion to $10 billion
  // Small: $300 million to $2 billion
  // Micro: $50 million to $300 million

  stocks.forEach((s) => {
    if (!ogFilters.countries.includes(s.country)) {
      ogFilters.countries.push(s.country);
    }
    if (!ogFilters.industries.includes(s.country)) {
      ogFilters.industries.push(s.industry);
    }
    if (!ogFilters.currency.includes(s.currency)) {
      ogFilters.currency.push(s.currency);
    }
  });
  ogFilters.countries.sort();
  ogFilters.industries.sort();
  ogFilters.currency.sort();
  return ogFilters;
}

export type FilterProps = {
  stocks: API.Stock[];
};

const Filter: React.FC<FilterProps> = ({ stocks }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const ogFilters = setOriginalFilters(stocks);
  const emptyFilters: Filters = {
    countries: [],
    industries: [],
    currency: [],
    marketCapitalization: [],
  };
  const [filters, setFilters] = React.useState<Filters>(emptyFilters);

  const clearFilters = () => {
    setFilters({
      countries: [],
      industries: [],
      currency: [],
      marketCapitalization: [],
    });
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
          setFilters({ ...filters, currency: [] });
          break;
        case 'MC':
          setFilters({ ...filters, marketCapitalization: [] });
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
          setFilters({ ...filters, currency: temp });
          break;
        case 'MC':
          setFilters({ ...filters, marketCapitalization: temp });
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
        filtersList={filters.currency}
        ogFiltersList={ogFilters.currency}
        handleChange={handleChange}
        name={t('stock.currency')}
      />
      <FilterBar
        filtersList={filters.marketCapitalization}
        ogFiltersList={ogFilters.marketCapitalization}
        handleChange={handleChange}
        name="MC"
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
