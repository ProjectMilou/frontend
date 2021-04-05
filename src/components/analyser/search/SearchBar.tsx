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
  const [stocks, setStocks] = React.useState<API.Stock[]>();
  const classes = useStyles();

  const fetch = async () => {
    try {
      const s = await API.listStocks('');
      setStocks(s);
    } catch (err) {
      setStocks(undefined);
      console.log('uncaught error when requesting listStocks!');
    }
  };

  React.useEffect(() => {
    fetch();
  }, []);

  const [open, setOpen] = useState(false);
  return (
    <div style={{ width: 300 }}>
      {stocks && (
        <Autocomplete
          id="search"
          freeSolo
          open={open}
          options={stocks}
          getOptionLabel={(option: API.Stock) =>
            `${option.symbol} ${option.name}${option.ISIN}${option.WKN}`
          }
          onInputChange={(e, v, r) => {
            if (r.startsWith('input') && !!v) {
              setOpen(true);
            } else {
              setOpen(false);
            }
          }}
          onChange={() => setOpen(false)}
          renderOption={(option: API.Stock) => <SearchOption stock={option} />}
          renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
            <TextField
              variant="outlined"
              className={classes.textField}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              InputProps={{
                ...params.InputProps,
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
