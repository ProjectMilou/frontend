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
import * as API from '../../../analyser/APIClient';
import SearchOption from './SearchOption';

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

const SearchBar: React.FC = () => {
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
          disableClearable
          open={open}
          options={stocks}
          getOptionLabel={(option: API.Stock) =>
            `${option.symbol}: ${option.name}`
          }
          onInputChange={(event, value, reason) => {
            if (reason.startsWith('input') && !!value) {
              setOpen(true);
            } else {
              setOpen(false);
            }
            setInputValue(value);
          }}
          onChange={() => {
            setOpen(false);
          }}
          renderOption={(option: API.Stock) => <SearchOption stock={option} />}
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
