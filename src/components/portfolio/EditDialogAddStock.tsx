import React from 'react';
import {
  CircularProgress,
  InputAdornment,
  TableCell,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';
import Search from '@material-ui/icons/Search';
import { stockSearch, StockSearchResult } from '../../portfolio/APIClient';
import { AddEntryProps } from './EditDialog';
import StyledNumberFormat from '../shared/StyledNumberFormat';

/** A search bar that adds stocks to an edit dialog. */
const EditDialogAddStock: React.FC<AddEntryProps> = ({ ids, add }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<StockSearchResult[] | undefined>(
    undefined
  );
  // The Autocomplete component does not re-render on select (probably a Material-UI bug).
  // This key is changed on select and forces the component to re-render, so the input is cleared on select.
  const [key, setKey] = React.useState<number>(0);
  const isMounted = React.useRef<boolean>(true);

  const fetchOptions = async (searchTerm: string) => {
    setLoading(true);
    try {
      setOptions(await stockSearch(searchTerm));
    } catch {
      if (isMounted.current) {
        setOptions([]);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  React.useEffect(() => {
    // fetch options initially and after they have been cleared
    if (!options) {
      fetchOptions('');
    }
  }, [options]);

  React.useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  const { t } = useTranslation();

  return (
    <Autocomplete
      key={key}
      options={options?.filter((s) => !ids.includes(s.symbol)) || []}
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
            new: true,
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
      onBlur={() => setOptions(undefined)}
      getOptionLabel={(option) => option.name || option.symbol}
      renderInput={(params) => (
        <TextField
          {...params} // eslint-disable-line react/jsx-props-no-spreading
          variant="outlined"
          placeholder={t('portfolio.dialog.edit.search')}
          onChange={(e) => fetchOptions(e.currentTarget.value)}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading && <CircularProgress size={24} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default EditDialogAddStock;
