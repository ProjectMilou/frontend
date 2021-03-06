import React, { useState } from 'react';
import {
  Box,
  Input,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import BankAccountService from '../../../services/BankAccountService';
import IBank from '../../../services/models/bank/IBank';

const useStyles = makeStyles({
  searchResults: { maxHeight: '70vh' },
});

interface BankAddSearchProps {
  handleAdding: (id: number) => void;
}

const BankAddSearch: React.FC<BankAddSearchProps> = (props) => {
  const theme = useTheme();
  const style = useStyles(theme);
  const [searchResultData, setSearchResultData] = useState<IBank[]>([]);
  const { t } = useTranslation();
  const { handleAdding } = props;

  const handleSearch = (search: string) => {
    if (search === '') setSearchResultData([]);
    else {
      BankAccountService.search(search).then(setSearchResultData);
    }
  };

  return (
    <Box my={3}>
      <Input
        autoFocus
        fullWidth
        placeholder={t('shell.bank.search.enter')}
        aria-label="text"
        onChange={(e) => handleSearch(e.target.value)}
      />

      {searchResultData.length !== 0 && (
        <List className={style.searchResults}>
          {searchResultData.map((bank) => (
            <ListItem
              button
              disableGutters
              onClick={() => handleAdding(bank.id)}
              key={`${bank.name}`}
            >
              <ListItemText
                primary={bank.name}
                secondary={bank.bic || bank.location}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default BankAddSearch;
