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

// export type SearchBarProps = {
//   token: string;
// };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      margin: theme.spacing(2),
      minWidth: 10,
      maxWidth: 280,
    },
  })
);

const SearchBar: React.FC = () => {
  const [stocks, setStocks] = React.useState<API.Stock[]>();
  const classes = useStyles();

  const isMounted = React.useRef(true);
  const fetch = async () => {
    const s = await API.listStocks('');
    setStocks(s);
  };

  React.useEffect(() => {
    fetch();
    return () => {
      isMounted.current = false;
    };
    // deps must be empty because the function should only be called on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              className={classes.textField}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              // label="Search"
              margin="normal"
              variant="standard"
              placeholder="Name, Symbol, ISIN or WKN"
            />
          )}
        />
      )}
    </div>
  );
};

export default SearchBar;
