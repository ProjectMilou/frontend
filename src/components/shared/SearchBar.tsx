import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  makeStyles,
  createStyles,
  Theme,
  TextFieldProps,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Search from '@material-ui/icons/Search';
import { navigate } from '@reach/router';
import * as API from '../../analyser/APIClient';
import SearchOption from './SearchOption';
import { saveStockToPortfolios } from '../../portfolio/APIClient';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      margin: theme.spacing(-3),
      minWidth: 10,
      maxWidth: 380,
      position: 'absolute',
      left: '50%',
      marginBottom: 20,
      height: 44,
    },
    input: {
      height: theme.spacing(6),
      color: theme.palette.primary.main,
    },
  })
);

/**
 * if id is given then the search bar is displayed on the portfolio page and different onclick
 * inside the search bar is called. Otherwise it is assumed that search bar is displayed on analyzer page
 */
type SearchBarProps = {
  id?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ id }) => {
  const classes = useStyles();

  const [stocks, setStocks] = React.useState<API.Stock[]>();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const fetch = async () => {
    try {
      const emptyFilters: API.Filters = {
        country: [],
        industry: [],
        currency: [],
        mc: [],
      };
      const s = await API.listStocks('', emptyFilters);
      setStocks(s);
    } catch (err) {
      setStocks(undefined);
      // TODO: implement proper error handling
      // eslint-disable-next-line no-console
      console.error('uncaught error when requesting listStocks!', err);
    }
  };

  React.useEffect(() => {
    fetch();
  }, []);

  return (
    <div style={{ width: 300 }}>
      {stocks && (
        <Autocomplete
          id="search"
          freeSolo
          inputValue={inputValue}
          // removes clear button
          disableClearable
          autoHighlight
          open={open}
          options={stocks}
          getOptionLabel={(option: API.Stock) =>
            // use '%' as seperator to display only symbol and name
            `${option.symbol}: ${option.name}%${option.isin}${option.wkn}`
          }
          onInputChange={(event, value, reason) => {
            if (reason.startsWith('input') && !!value) {
              setOpen(true);
            } else {
              setOpen(false);
            }
            // prevent isin and wkn from being displayed. Dirty fix, but currently the only one possible with Material-UI autocomplete
            setInputValue(value.split('%')[0]);
          }}
          onChange={(event, value) => {
            setOpen(false);
            // if id is null (on analyzer page) navigate to new page if value is of type stock
            // if id is non null (portfolio page) make api request
            if (typeof value === 'object' && value !== null) {
              if (id) {
                saveStockToPortfolios(value.symbol, [{ id, qty: 1 }]);
              } else {
                navigate(`/analyser/${value.symbol}`);
              }
            }
          }}
          onBlur={() => setOpen(false)}
          renderOption={(option: API.Stock) =>
            id ? (
              // if on portfolio page disable the navigation link
              <SearchOption stock={option} disableLink />
            ) : (
              <SearchOption stock={option} />
            )
          }
          renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
            <TextField
              // clear input whenever textfield is clicked
              onClick={() => setInputValue('')}
              variant="outlined"
              className={classes.textField}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              InputProps={{
                ...params.InputProps,
                type: 'search',
                className: classes.input,
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              // label="Search"
              margin="normal"
              placeholder="Name, Symbol, ISIN or WKN"
            />
          )}
        />
      )}
    </div>
  );
};

export default SearchBar;
