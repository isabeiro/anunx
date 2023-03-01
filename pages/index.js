import Link from 'next/link'
import slugify from 'slugify'

import {
  Container,
  Typography,
  Grid
} from '@material-ui/core'

import { makeStyles } from '@material-ui/styles'
import TemplateDefault from '../src/templates/Default'
import Card from '../src/components/Card'
import dbConnect from '../src/utils/dbConnect'
import ProductsModel from '../src/models/products'
import { formatCurrency } from '../src/utils/currency'
import SearchBar from '@/src/components/SearchBar'

const useStyles = makeStyles((theme) => ({
  productLink: {
    textDecoration: 'none !important',
  },
  cardGrid: {
    marginTop: 50,
  }
}))

const Home = ({ products }) => {
  const classes = useStyles()

  return (
    <TemplateDefault>
      <Container maxWidth="md">
        <SearchBar />
      </Container>

      <Container maxWidth="lg" className={classes.cardGrid}>
        <Typography component="h2" variant="h4" align="center" color="textPrimary">
          Destaques
        </Typography>
        <br />
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
      </Container>
    </TemplateDefault>
  )
}

export async function getServerSideProps() {
  await dbConnect()

  const products = await ProductsModel.aggregate([{
    $sample: { size: 6 }
  }])

  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  }
}

export default Home