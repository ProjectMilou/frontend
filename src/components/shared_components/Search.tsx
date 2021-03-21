/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Search from '@material-ui/icons/Search'

export default function FreeSolo() {
  return (
    <div style={{ width: 300 }} >
      <Autocomplete
        id="search"
        freeSolo
        options={stocks}
        getOptionLabel={(option) => option.name + option.symbol + option.ISIN + option.WKN}
        renderOption={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Name, ISIN or WKN"
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              )
            }} />
        )}
      />
    </div>
  );
}

interface Stock {
  symbol: string,
  name: string,
  ISIN: string,
  WKN: string | number,
}

const stocks: Stock[] = [
  { symbol: 'IBM', name: 'International Business Machines', ISIN: 'US4592001014', WKN: 851399 },
  { symbol: 'BMW', name: 'Bayerische Motoren Werke', ISIN: 'DE0005190003', WKN: 519000 },
  { symbol: 'DAI', name: 'Daimler', ISIN: 'DE0007100000', WKN: 710000 },
  { symbol: 'HLAG', name: 'Hapag-Lloyd', ISIN: 'DE000HLAG475', WKN: 'HLAG47' },
  { symbol: 'MRK', name: 'MERCK Kommanditgesellschaft auf Aktien', ISIN: 'US96145D1054', WKN: 'A14V41' },
];
