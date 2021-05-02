import React from 'react';
import {
  Button,
  ButtonGroup,
  makeStyles,
  Container,
  Typography,
  Theme,
  createStyles,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import * as API from '../../../analyser/APIClient';
import { FilterBar } from './FilterBar';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    filterContainer: {
      'background-color': palette.background.default,
      minWidth: '50%',
      maxWidth: 'sm',
      minHeight: '90px',
    },
    buttonGroup: {
      marginTop: '20px',
      marginBottom: '20px',
      marginLeft: '20px',
    },
  })
);

// Filter props type declaration
export type FilterProps = {
  stocks: API.Stock[];
  filters: API.Filters;
  setFilters: React.Dispatch<React.SetStateAction<API.Filters>>;
};

/**
 * @param stocks - A array of stocks
 * @param filters - Current filters
 * @param setFilters - Update filters
 * @return A filter which can filter stocks list by currency, country, market cap and industry
 */
const Filter: React.FC<FilterProps> = ({ stocks, filters, setFilters }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const emptyFilters: API.Filters = {
    country: [],
    industry: [],
    currency: [],
    mc: [],
  };
  const [ogFilters, setOgFilters] = React.useState<API.Filters>(emptyFilters);

  // add all found filters to og filters, never remove
  const setOriginalFilters = () => {
    const contries: Set<string> = new Set(ogFilters.country);
    const industries: Set<string> = new Set(ogFilters.industry);
    const currencies: Set<string> = new Set(ogFilters.currency);
    const mc: Set<string> = new Set(ogFilters.mc);
    stocks.forEach((s) => {
      if (s.country) contries.add(s.country);
      if (s.industry) industries.add(s.industry);
      if (s.currency) currencies.add(s.currency);
      if (s.mcSize) mc.add(s.mcSize);
    });
    setOgFilters({
      country: Array.from(contries).sort(),
      industry: Array.from(industries).sort(),
      currency: Array.from(currencies).sort(),
      mc: Array.from(mc).sort(),
    });
  };

  // clear all filters
  const clearFilters = () => {
    setFilters(emptyFilters);
  };

  React.useEffect(() => {
    setOriginalFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stocks]);

  // update filters
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
        case 'Market Cap':
          setFilters({ ...filters, mc: [] });
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
        case 'Market Cap':
          setFilters({ ...filters, mc: temp });
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
        <Button type="button" onClick={clearFilters} startIcon={<Delete />}>
          <Typography>{t('analyser.filter.clear')}</Typography>
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default Filter;
