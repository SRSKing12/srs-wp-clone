import React from 'react'
import { Box, makeStyles, InputBase } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  component: {
    backgroundColor: "#f6f6f6",
    height: 43,
    display: "flex",
    alignItems: "center"
  },
  search: {
    position: 'relative',
    borderRadius: 18,
    backgroundColor: "#ffffff",
    margin: "0 13px",
    width: '100%',
  },
  searchIcon: {
    color: "#54656f",
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  inputRoot: {
    width: "100%"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: 65,
    fontSize: 14,
    height: 15,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}))

const Search = ({setText}) => {
  const classes = useStyles()

  return (
    <Box className={classes.component}>
      <Box className={classes.search}>
        <Box className={classes.searchIcon}>
          <SearchIcon fontSize='small'/>
        </Box>
        <InputBase
          placeholder="Search or start a new chat"
          inputProps={{ 'aria-label': 'search' }}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          onChange={(e) => setText(e.target.value)}
        />
      </Box>
    </Box>

  )
}

export default Search