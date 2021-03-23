/* eslint-disable no-param-reassign */
import React from 'react';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Input, InputLabel, MenuItem, FormControl, ListItemText, Select, Checkbox, Chip, Typography, Container } from '@material-ui/core';
import { Filter } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        typography: {
            color: '#0D1B3B'
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300,
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
    }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface Filters {
    countries: string[],
    industries: string[],
    investmentCategory: string[],
    currency: string[],
    specialCriteria: string[],
}
function createNewFilter() {
    const filter: Filters = { countries: [], industries: [], investmentCategory: [], currency: [], specialCriteria: [], }
    return filter
}

const filters: Filters = {
    countries: ['United State', 'Australia', 'United Kingdom', 'Germany', 'Canada', 'India', 'China',],
    industries: [],
    investmentCategory: [],
    currency: [],
    specialCriteria: [],
}

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

// async function componentDidMount() {
//     const response = await fetch('https://milou-backend.herokuapp.com/stocks')
//     if (response.ok) {
//         console.log('SUCCESS')
//     } else {
//         console.log('NOT SUCESS')
//     }
//     const data = await response.json()
//     console.log(data)
// }

export default function MultipleSelect() {
    const classes = useStyles();
    const theme = useTheme();
    const [filter, setFilter] = React.useState<Filters>(createNewFilter)

    const handleChange = (event: React.ChangeEvent<{ name?: string | undefined, value: unknown }>) => {
        const temp = event.target.value as string[]
        switch (event.target.name) {
            case 'country':
                setFilter(prevFilter => {
                    prevFilter.countries = temp
                    return { ...filter, countries: prevFilter.countries }
                })
                // setFilter({ ...filter, countries: temp })
                break;
            case 'industry':
                setFilter(prevFilter => {
                    prevFilter.industries = temp
                    return { ...filter, industries: prevFilter.industries }
                })
                break;
            case 'investmentCategory':
                setFilter(prevFilter => {
                    prevFilter.investmentCategory = temp
                    return { ...filter, investmentCategory: prevFilter.investmentCategory }
                })
                break;
            case 'currency':
                setFilter(prevFilter => {
                    prevFilter.currency = temp
                    return { ...filter, currency: prevFilter.currency }
                })
                break;
            case 'specialCriteria':
                setFilter(prevFilter => {
                    prevFilter.specialCriteria = temp
                    return { ...filter, specialCriteria: prevFilter.specialCriteria }
                })
                break;
            default:
                break;
        }
        // console.log(filter)
    };

    const clearFilters = () => {
        setFilter((prevFilter) => {
            prevFilter.countries = []
            prevFilter.industries = []
            prevFilter.investmentCategory = []
            prevFilter.currency = []
            prevFilter.specialCriteria = []
            return { ...prevFilter }
        })
        // console.log(filter)
    }
    // componentDidMount()
    return (
        <div>
            <Typography className={classes.typography} variant='h2'>
                Filter options
            </Typography>
            <Typography className={classes.typography} variant='subtitle1'>
                Select and combine filters to find the most suitable investments for you.
            </Typography>

            {/* Filter for country */}
            <FormControl className={classes.formControl}>
                <InputLabel id="country-label">Country</InputLabel>
                <Select
                    labelId="country-label"
                    id="country"
                    name='country'
                    multiple
                    value={filter.countries}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {(selected as string[]).map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {filters.countries.map((tmp) => (
                        <MenuItem key={tmp} value={tmp} style={getStyles(tmp, filter.countries, theme)}>
                            <Checkbox color='primary' checked={filter.countries.indexOf(tmp) > -1} />
                            <ListItemText primary={tmp} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Filter for industry */}
            <FormControl className={classes.formControl}>
                <InputLabel id="industry-label">Industry</InputLabel>
                <Select
                    labelId="industry-label"
                    id="industry"
                    name='industry'
                    multiple
                    value={filter.industries}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {(selected as string[]).map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {filters.industries.map((tmp) => (
                        <MenuItem key={tmp} value={tmp} style={getStyles(tmp, filter.industries, theme)}>
                            <Checkbox color='primary' checked={filter.industries.indexOf(tmp) > -1} />
                            <ListItemText primary={tmp} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <button type='button' onClick={clearFilters}>
                Clear filters
            </button>
        </div>
    );
}
