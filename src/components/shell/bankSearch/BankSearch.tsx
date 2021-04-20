import React, { useState } from 'react';
import {
  Box,
  Container,
  Input,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import BankAccountService from '../../../services/BankAccountService';
import IBank from '../../../services/models/bank/IBank';

const useStyles = makeStyles({
  searchResults: { maxHeight: '70vh' },
});

const BankSearch: React.FC = () => {
  const theme = useTheme();
  const style = useStyles(theme);
  const [searchResultData, setSearchResultData] = useState<IBank[]>([]);

  const handleSearch = (search: string) => {
    if (search === '') setSearchResultData([]);
    else {
      BankAccountService.search(search).then(setSearchResultData);
    }
  };

  return (
    <Container>
      <Box my={3}>
        <Input
          autoFocus
          fullWidth
          placeholder="Search Bank"
          onChange={(e) => handleSearch(e.target.value)}
        />

        {searchResultData.length !== 0 && (
          <List className={style.searchResults}>
            {searchResultData.map((bank) => (
              <ListItem
                button
                disableGutters
                onClick={() => BankAccountService.add(bank.id)}
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
    </Container>
  );
};

export default BankSearch;
