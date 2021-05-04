import React from 'react';
import {
  CircularProgress,
  TableCell,
  TableRow,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';
import { stockSearch, StockSearchResult } from '../../portfolio/APIClient';
import { AddEntryProps } from './EditDialog';
import StyledNumberFormat from '../shared/StyledNumberFormat';

/** A search bar that adds stocks to an edit dialog. */
const EditDialogAddStock: React.FC<AddEntryProps> = ({ ids, add }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<StockSearchResult[]>([]);
  // The Autocomplete component does not re-render on select (probably a Material-UI bug).
  // This key is changed on select and forces the component to re-render, so the input is cleared on select.
  const [key, setKey] = React.useState<number>(0);

  const fetchOptions = async (searchTerm: string) => {
    setLoading(true);
    try {
      setOptions(await stockSearch(searchTerm));
    } catch {
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // fetch options initially
    fetchOptions('');
  }, []);

  const { t } = useTranslation();

  return (
    <TableRow>
      <TableCell colSpan={3}>
        <Autocomplete
          key={key}
          options={options.filter((s) => !ids.includes(s.symbol))}
          open={open}
          loading={loading}
          blurOnSelect
          clearOnBlur
          loadingText={t('loading')}
          noOptionsText={t('noResults')}
          openText={t('open')}
          closeText={t('close')}
          clearText={t('clear')}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          onChange={(_, stock) => {
            if (stock) {
              add(stock.symbol, {
                displayName: stock.name || stock.symbol,
                initialValue: 0,
                value: 1,
                additionalTableCells: (
                  <TableCell>
                    {stock.price && (
                      <StyledNumberFormat value={stock.price} suffix="€" />
                    )}
                  </TableCell>
                ),
              });
            }
            setKey(key + 1);
          }}
          getOptionLabel={(option) => option.name || option.symbol}
          renderInput={(params) => (
            <TextField
              {...params} // eslint-disable-line react/jsx-props-no-spreading
              variant="outlined"
              onChange={(e) => fetchOptions(e.currentTarget.value)}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading && <CircularProgress />}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </TableCell>
    </TableRow>
  );
};

export default EditDialogAddStock;