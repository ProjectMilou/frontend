import React, { useState } from 'react';
import {
  Input,
  useTheme,
  Box,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  searchResults: {
    position: 'absolute',
    width: 400,
    background: 'white',
  },
});

const getSearchResultData = (search: string) => {
  if (search === '') return [];
  return search.split('').map((x) => search + x);
};

const BankSearch: React.FC = () => {
  const theme = useTheme();
  const style = useStyles(theme);
  const [searchResultData, setSearchResultData] = useState<string[]>([]);

  const handleSearch = (search: string) => {
    setSearchResultData(getSearchResultData(search));
  };

  return (
    <Box mx={3}>
      <Input
        placeholder="search Bank"
        onChange={(e) => handleSearch(e.target.value)}
      />

      {searchResultData.length !== 0 ? (
        <Box boxShadow={3} className={style.searchResults}>
          <List>
            {searchResultData.map((result) => (
              <ListItem disableGutters>
                <ListItemText>{result}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : null}
    </Box>
  );
};

export default BankSearch;
