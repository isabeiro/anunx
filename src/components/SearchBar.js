import { useState } from 'react'
import { useRouter } from 'next/router'

import {
  Paper,
  IconButton,
  InputBase,
  Typography,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/styles'
import SearchIcon from '@material-ui/icons/search'

const useStyles = makeStyles((theme) => ({
  searchBox: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 2),
    marginTop: 20,
  },
}))

const SearchBar = ({ products }) => {
  const router = useRouter()
  const [search, setSearch] = useState()
  const classes = useStyles()

  const handleSubmitSearch = () => {
    router.push({
      pathname: `/search/${search}`
    })
  }
  
  return (
    <>
      <Typography component="h1" variant="h3" align="center" color="textPrimary">
        O que deseja encontrar?
      </Typography>
      <Paper className={classes.searchBox}>
        <InputBase 
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ex.: iPhone 12 com garantia"
          fullWidth
        />
        <IconButton onClick={handleSubmitSearch}>
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  )
}

export default SearchBar