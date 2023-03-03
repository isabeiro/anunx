import axios from 'axios'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'

import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Select,
  Typography,
  MenuItem,
  FormHelperText,
  CircularProgress,
} from '@material-ui/core'

import TemplateDefault from '../../../src/templates/Default'
import useToasty from '../../../src/contexts/Toasty'
import { validationSchema } from './formValues'
import ProductsModel from '../../../src/models/products'
import useStyles from './styles'

const Edit = ({ userId, image, product }) => {
  const classes = useStyles()
  const { setToasty } = useToasty()
  const router = useRouter

  const initialValues = {
    title: product.title,
    category: product.category,
    description: product.description,
    price: product.price,
    name: product.user.name,
    email: product.user.email,
    phone: product.user.phone,
    local: product.user.local,
    timestamp: product.user.timestamp,
    files: [product.files],
  }

  const formValues = {
    ...initialValues,
  }   

  formValues.userId = userId
  formValues.image = image

  const handleSuccess = () => {
    setToasty({
      open: true,
      severity: 'success',
      text: 'Anúncio editado com sucesso',
    })
    
    router.push('/user/dashboard')
  }

  const handleError = (error) => {
    setToasty({
      open: true,
      text: 'Ops, ocorreu um erro, tente novamente.',
      severity: 'error',
    })
    console.log(error)
  }

  const handleFormSubmit = (values) => {
    const formData = new FormData()

    for(let field in values) {
      if (field === 'files') {
        values.files.forEach(file => {
          formData.append('files', file)
        })
      } else {
        formData.append(field, values[field])
      }
    }

    axios.put(`/api/products/edit/${product._id}`, formData)
      .then(handleSuccess())
      .catch(handleError())
  }
  
  return (
    <TemplateDefault>  
      <Formik 
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {
          ({
            touched,
            values,
            errors,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => {
            
            return (
              <form onSubmit={handleSubmit}>
                <Input type="hidden" name="userId" value={values.userId} />
                <Input type="hidden" name="image" value={values.image} />
                <Input type="hidden" name="timestamp" value={values.timestamp} />
                <Input type="hidden" name="productId" value={product._id} />

                <Container maxWidth="sm">
                  <Typography component="h1" variant="h2" align="center" color="textPrimary">
                    Editar Anúncio
                  </Typography>
                  <Typography component="h5" variant="h5" align="center" color="textPrimary">
                    Quanto mais detalhado, melhor!
                  </Typography>
                </Container>

                <br/><br/>

                <Container maxWidth="md" className={classes.boxContainer}>
                  <Box className={classes.box}>
                    
                    <FormControl error={errors.title && touched.title} fullWidth>
                      <InputLabel className={classes.inputLabel}>Título do Anúncio</InputLabel>
                      <Input 
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        { errors.title && touched.title ? errors.title : null }
                      </FormHelperText>
                    </FormControl>

                    <br /><br />

                    <FormControl error={errors.category && touched.category} fullWidth>
                      <InputLabel className={classes.inputLabel}>Categoria</InputLabel>

                      <Select
                        name="category"
                        value={values.category}
                        fullWidth
                        onChange={handleChange}
                      >
                        <MenuItem value="Bebê e Criança">Bebê e Criança</MenuItem>
                        <MenuItem value="Agricultura">Agricultura</MenuItem>
                        <MenuItem value="Moda">Moda</MenuItem>
                        <MenuItem value="Carros, Motos e Barcos">Carros, Motos e Barcos</MenuItem>
                        <MenuItem value="Serviços">Serviços</MenuItem>
                        <MenuItem value="Lazer">Lazer</MenuItem>
                        <MenuItem value="Animais">Animais</MenuItem>
                        <MenuItem value="Moveis, Casa e Jardim">Moveis, Casa e Jardim</MenuItem>
                        <MenuItem value="Imóveis">Imóveis</MenuItem>
                        <MenuItem value="Equipamentos e Ferramentas">Equipamentos e Ferramentas</MenuItem>
                        <MenuItem value="Celulares e Tablets">Celulares e Tablets</MenuItem>
                        <MenuItem value="Esportes">Esportes</MenuItem>
                        <MenuItem value="Tecnologia">Tecnologia</MenuItem>
                        <MenuItem value="Emprego">Emprego</MenuItem>
                        <MenuItem value="Outros">Outros</MenuItem>
                      </Select>
                      <FormHelperText>
                        { errors.category && touched.category ? errors.category : null }
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Container>

                <Container maxWidth="md" className={classes.boxContainer}>
                  <Box className={classes.box}>
                    <FormControl error={errors.description && touched.description} fullWidth>
                      <InputLabel className={classes.inputLabel} >Escreva os detalhes do que está vendendo</InputLabel>

                      <Input
                        name="description"
                        multiline
                        minRows={6}
                        variant="outlined"
                        onChange={handleChange}
                        value={values.description}
                      />
                      <FormHelperText>
                        { errors.description && touched.description ? errors.description : null }
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Container>

                <Container maxWidth="md" className={classes.boxContainer}>
                  <Box className={classes.box}>
                    <FormControl error={errors.price && touched.price} fullWidth>
                      <InputLabel className={classes.inputLabel}>Preço de venda</InputLabel>

                      <Input
                        name="price"
                        variant="outlined"
                        onChange={handleChange}
                        startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                        value={values.price}
                      />
                      <FormHelperText>
                        { errors.price && touched.price ? errors.price : null }
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Container>

                <Container maxWidth="md" className={classes.boxContainer}>
                  <Box className={classes.box}>
                    <Typography component="h6" variant="h6" color="textPrimary" gutterBottom>
                      Dados de Contato
                    </Typography>
                    
                    <FormControl error={errors.name && touched.name} fullWidth>
                      <InputLabel className={classes.inputLabel}>Nome</InputLabel>
                      <Input 
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        { errors.name && touched.name ? errors.name : null }
                      </FormHelperText>
                    </FormControl>
                    <br /><br />

                    <FormControl error={errors.email && touched.email} fullWidth>
                      <InputLabel className={classes.inputLabel}>E-mail</InputLabel>
                      <Input 
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        { errors.email && touched.email ? errors.email : null }
                      </FormHelperText>
                    </FormControl>
                    <br /><br />

                    <FormControl error={errors.phone && touched.phone} fullWidth>
                      <InputLabel className={classes.inputLabel}>Telefone</InputLabel>
                      <Input 
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        { errors.phone && touched.phone ? errors.phone : null }
                      </FormHelperText>
                    </FormControl>
                    <br /><br />

                    <FormControl error={errors.local && touched.local} fullWidth>
                      <InputLabel className={classes.inputLabel}>Estado</InputLabel>
                      <Input 
                        name="local"
                        value={values.local}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        { errors.local && touched.local ? errors.local : null }
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Container>

                <Container maxWidth="md" className={classes.boxContainer}>
                  <Box textAlign="right">
                    {
                      isSubmitting
                        ? <CircularProgress className={classes.loading} />
                        : <Button type="submit" variant="contained" color="primary">
                          Editar Anúncio
                        </Button>
                    }
                    
                  </Box>
                </Container>
              </form>
            )
          }
        }
      </Formik>
    </TemplateDefault>
  )
}

Edit.requireAuth = true

export async function getServerSideProps({ req, query }) {
  const { userId, user } = await getSession({ req })
  const { idProduct } = query

  const product = await ProductsModel.findOne({ _id: idProduct })

  return {
    props: {
      userId: userId ?? null,
      image: user.image,
      product: JSON.parse(JSON.stringify(product))
    }
  }
}

export default Edit
