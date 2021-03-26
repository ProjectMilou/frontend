import React from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import {
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  Chip,
} from '@material-ui/core';

export type FilterBarProps = {
    filtersList: string[];
    ogFiltersList: string[];
    handleChange: (
      event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
    ) => void;
    name: string;
  };

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      color: '#0D1B3B',
    },
    formControl: {
      margin: theme.spacing(2),
      minWidth: "200px",
      maxWidth: "200px",
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 1,
    }
  })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      Width: 300,
    },
  },
  getContentAnchorEl: null
};

function getStyles(tmp: string, list: string[], theme: Theme) {
    return {
      fontWeight:
        list.indexOf(tmp) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}

export const FilterBar: React.FC<FilterBarProps> = ({
    filtersList,
    ogFiltersList,
    handleChange,
    name,
  }) => {
    const classes = useStyles();
    const theme = useTheme();
  
    return (
      <FormControl className={classes.formControl}>
        <InputLabel id="id-label">{name}</InputLabel>
        <Select
          name={name}
          multiple
          value={filtersList}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected as string[]).map((value) => (
                <Chip
                  key={value}
                  label={value}
                  variant="outlined"
                  color="primary"
                  size="small"
                  className={classes.chip}
                />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          <MenuItem disabled value="">
            <em>{name}</em>
          </MenuItem>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {ogFiltersList.map((tmp) => (
            <MenuItem
              key={tmp}
              value={tmp}
              style={getStyles(tmp, filtersList, theme)}
            >
              <Checkbox color="primary" checked={filtersList.indexOf(tmp) > -1} />
              <ListItemText primary={tmp} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };