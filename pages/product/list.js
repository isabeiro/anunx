import {
  Paper,
  Container,
  IconButton,
  InputBase,
  Typography,
  Grid,
  Box
} from '@material-ui/core'

import { makeStyles } from '@material-ui/styles'
import SearchIcon from '@material-ui/icons/search'
import TemplateDefault from '../../src/templates/Default'

import Card from '../../src/components/Card'

const useStyles = makeStyles((theme) => ({
  searchBox: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 2),
    marginBottom: 20,
  },
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}))

const List = () => {
  const classes = useStyles()

  return (
    <TemplateDefault>
      <Container maxWidth="lg">

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Paper component="form" className={classes.searchBox}>
              <InputBase
                className={classes.inputSearch}
                placeholder="Ex.: iPhone 12 com garantia"
                fullWidth
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
       
        <Grid item xs={12} sm={12} md={12}>
          <Box className={classes.box}>
            <Typography component="h6" variant="h6" align="left" color="textPrimary">
              Anúncios
            </Typography>
            <Typography component="span" variant="subtitle2" align="left">
              ENCONTRADOS 200 ANÚNCIOS
            </Typography>
            <br /><br />
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Card 
                  image={'http://source.unsplash.com/random?a=1'}
                  title="Produto X"
                  subtitle="R$ 60,00"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card 
                  image={'http://source.unsplash.com/random?a=2'}
                  title="Produto X"
                  subtitle="R$ 60,00"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card 
                  image={'http://source.unsplash.com/random?a=3'}
                  title="Produto X"
                  subtitle="R$ 60,00"
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>

      </Container>        
    </TemplateDefault>
  )
}

export default List