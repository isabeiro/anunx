import {
  Paper,
  Container,
  IconButton,
  InputBase,
  Typography,
  Grid,
  Box
} from '@material-ui/core'

import Link from 'next/link'
import slugify from 'slugify'

import { makeStyles } from '@material-ui/styles'
import SearchIcon from '@material-ui/icons/search'

import Card from '../../src/components/Card'
import TemplateDefault from '../../src/templates/Default'
import { formatCurrency } from '../../src/utils/currency'
import ProductsModel from '../../src/models/products'

const useStyles = makeStyles((theme) => ({
  searchBox: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 2),
    marginBottom: 20,
  },
  productLink: {
    textDecoration: 'none !important',
  },
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}))

const List = ({ products }) => {
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
              ENCONTRADOS {products.length} ANÚNCIOS
            </Typography>
            <br /><br />
            <Grid container spacing={4}>
              {
                products.map(product => {
                  const category = slugify(product.category).toLocaleLowerCase()
                  const title = slugify(product.title).toLocaleLowerCase()

                  return (
                    <Grid item xs={12} sm={6} md={4}>
                      <Link href={`/${category}/${title}/${product._id}`} className={classes.productLink}>
                        <Card 
                        image={`/uploads/${product.files[0].name}`}
                        title={product.title}
                        subtitle={formatCurrency(product.price)}
                        />
                      </Link>
                    </Grid>
                  )
                })
              }
            </Grid>
          </Box>
        </Grid>

      </Container>        
    </TemplateDefault>
  )
}

export async function getServerSideProps({ query }) {
  const { q } = query

  const products = await ProductsModel.find({
    $or: [
      { 
        title: {
          $regex: q,
          $options: 'i'
        }
      },
      { 
        description: {
          $regex: q,
          $options: 'i'
        }
      },
    ]
  })

  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  }
}

export default List