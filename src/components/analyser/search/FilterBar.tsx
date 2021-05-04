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
import { useTranslation } from 'react-i18next';

// FilterBar props type declaration
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
    formControl: {
      margin: theme.spacing(2),
      minWidth: '200px',
      maxWidth: '200px',
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 1,
    },
    clearList: {
      fontWeight: 500,
      '&:hover': {
        backgroundColor: theme.palette.error.main,
      },
    },
  })
);

/** @type Height of each item in the menu */
const ITEM_HEIGHT = 48;
/** @type Padding of each item in the menu */
const ITEM_PADDING_TOP = 8;
/** @type Props applied to the Menu element */
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      Width: 300,
    },
  },
  getContentAnchorEl: null,
};

/**
 * Menu item's font weight will be medium if it's selected.
 *
 * @param {string} tmp - Menu item's text
 * @param {string[]} list - List of a filter
 * @param {Theme} theme - Theme
 * @return Font weight of a menu item
 */
function getStyles(tmp: string, list: string[], theme: Theme) {
  return {
    fontWeight:
      list.indexOf(tmp) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

/**
 * Component to display a bar where filters can be selected
 *
 * @param filtersList - Filtered list of stocks' currency / country / market Cap / industry
 * @param ogFiltersList - Original list of stocks' currency / country / market Cap / industry
 * @param handleChange - Update the list if filter is changed
 * @param name - Currency / Country / Market Cap / Industry
 */
export const FilterBar: React.FC<FilterBarProps> = ({
  filtersList,
  ogFiltersList,
  handleChange,
  name,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

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
        <MenuItem value="" className={classes.clearList}>
          {t('analyser.filter.clearSingle')}
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
