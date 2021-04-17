import React, { useState } from 'react';
import {
  Box,
  Container,
  Input,
  Link,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import BankAccountService from '../../../services/BankAccountService';
import IBank from '../../../services/models/bank/IBank';

// TODO don't hardcode the api?
const apiURL = 'https://api.milou.io/';
const useStyles = makeStyles({
  searchResults: { maxHeight: '70vh' },
});

interface SearchResult {
  id: number;
  name: string;
  location: string;
  city: string;
}

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
          placeholder="search Bank"
          onChange={(e) => handleSearch(e.target.value)}
        />

        {searchResultData.length !== 0 && (
          <List className={style.searchResults}>
            {searchResultData.map((result) => (
              <ListItem disableGutters>
                <Link href={`${apiURL}user/bank?bankId=${result.id}`}>
                  <ListItemText
                    primary={result.name}
                    secondary={result.location /* should be BIC */}
                  />
                </Link>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
};

export default BankSearch;
