/* eslint-disable no-param-reassign */
import React from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import {
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  Chip,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import { FilterList, Delete } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import * as API from '../../../analyser/APIClient';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      color: '#0D1B3B',
    },
    formControl: {
      margin: theme.spacing(2),
      minWidth: 200,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 1,
    },
  })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      Width: 300,
    },
  },
};

function getStyles(tmp: string, list: string[], theme: Theme) {
  return {
    fontWeight:
      list.indexOf(tmp) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type Filters = {
  countries: string[];
  industries: string[];
  currency: string[];
};

export type FilterBarProps = {
  filtersList: string[];
  ogFiltersList: string[];
  handleChange: (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => void;
  name: string;
};
export const FilterBar: React.FC<FilterBarProps> = ({
  filtersList,
  ogFiltersList,
  handleChange,
  name,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="id-label">{name}</InputLabel>
      <Select
        name={name}
        multiple
        value={filtersList}
        onChange={handleChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {(selected as string[]).map((value) => (
              <Chip
                key={value}
                label={value}
                variant="outlined"
                color="primary"
                size="small"
                className={classes.chip}
              />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        <MenuItem disabled value="">
          <em>{name}</em>
        </MenuItem>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {ogFiltersList.map((tmp) => (
          <MenuItem
            key={tmp}
            value={tmp}
            style={getStyles(tmp, filtersList, theme)}
          >
            <Checkbox color="primary" checked={filtersList.indexOf(tmp) > -1} />
            <ListItemText primary={tmp} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

function setOriginalFilters(stocks: API.Stock[]) {
  const ogFilters: Filters = { countries: [], industries: [], currency: [] };
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

export type FilterOptionsProps = {
  stocks: API.Stock[];
};

const Filteroptions: React.FC<FilterOptionsProps> = ({ stocks }) => {
  const { t } = useTranslation();
  const ogFilters = setOriginalFilters(stocks);
  const emptyFilters: Filters = { countries: [], industries: [], currency: [] };
  const [filters, setFilters] = React.useState<Filters>(emptyFilters);

  const clearFilters = () => {
    setFilters((prevFilters) => {
      prevFilters.countries = [];
      prevFilters.industries = [];
      prevFilters.currency = [];
      return { ...prevFilters };
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
          setFilters((prevFilter) => {
            prevFilter.countries = [];
            return { ...filters, countries: prevFilter.countries };
          });
          break;
        case 'Industry':
          setFilters((prevFilter) => {
            prevFilter.industries = [];
            return { ...filters, industries: prevFilter.industries };
          });
          break;
        case 'Currency':
          setFilters((prevFilter) => {
            prevFilter.currency = [];
            return { ...filters, currency: prevFilter.currency };
          });
          break;
        default:
          break;
      }
    } else {
      switch (name) {
        case 'Country':
          setFilters((prevFilter) => {
            prevFilter.countries = temp;
            return { ...filters, countries: prevFilter.countries };
          });
          break;
        case 'Industry':
          setFilters((prevFilter) => {
            prevFilter.industries = temp;
            return { ...filters, industries: prevFilter.industries };
          });
          break;
        case 'Currency':
          setFilters((prevFilter) => {
            prevFilter.currency = temp;
            return { ...filters, currency: prevFilter.currency };
          });
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
    <>
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
      <ButtonGroup variant="contained" color="primary">
        <Button
          type="button"
          onClick={() => sendRequest}
          startIcon={<FilterList />}
        >
          Adapt
        </Button>
        <Button type="button" onClick={clearFilters} startIcon={<Delete />}>
          Clear All
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Filteroptions;
