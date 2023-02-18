import {
  Paper,
  Button,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Container,
  IconButton,
  InputBase,
  Typography,
  Grid
} from '@material-ui/core'

import { makeStyles } from '@material-ui/styles'
import SearchIcon from '@material-ui/icons/search'
import TemplateDefault from '../src/templates/Default'

const useStyles = makeStyles((theme) => ({
  searchBox: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 2),
    marginTop: 20,
  },
  cardMedia: {
    paddingTop: '56%',
  },
}))

const Home = () => {
  const classes = useStyles()
  
  return (
    <TemplateDefault>
      <Container maxWidth="md">
        <Typography component="h1" variant="h3" align="center" color="textPrimary">
          O que deseja encontrar?
        </Typography>
        <Paper className={classes.searchBox}>
          <InputBase 
            placeholder="Ex.: iPhone 12 com garantia"
            fullWidth
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Container>

      <Container maxWidth="lg" className={classes.cardGrid}>
        <Typography component="h2" variant="h4" align="center" color="textPrimary">
          Destaques
        </Typography>
        <br />
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                className={classes.cardMedia}
                image={'http://source.unsplash.com/random'}
                title="Título da imagem"
              />
              <CardContent>
                <Typography component="h2" variant="h5">
                  Produto X
                </Typography>
                <Typography>
                  R$ 60,00
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                className={classes.cardMedia}
                image={'http://source.unsplash.com/random'}
                title="Título da imagem"
              />
              <CardContent>
                <Typography component="h2" variant="h5">
                  Produto
                </Typography>
                <Typography>
                  R$ 60,00
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                className={classes.cardMedia}
                image={'http://source.unsplash.com/random'}
                title="Título da imagem"
              />
              <CardContent>
                <Typography component="h2" variant="h5">
                  Produto
                </Typography>
                <Typography>
                  R$ 60,00
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </TemplateDefault>
  )
}

export default Home