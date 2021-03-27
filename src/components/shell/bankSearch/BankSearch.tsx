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

const BankSearch: React.FC = () => {
  const theme = useTheme();
  const style = useStyles(theme);
  const [searchResultData, setSearchResultData] = useState<string[]>([]);

  const handleSearch = (search: string) => {
    if (search === '') setSearchResultData([]);
    else {
      /* Maybe a local pattern matching is preferable?
      fetch('https://api.milou.io/user/bank', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setSearchResultData(data.banks.map((x: any) => x.name));
        });
        */
      setSearchResultData(search.split('').map((x) => x.concat('bank')));
    }
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
