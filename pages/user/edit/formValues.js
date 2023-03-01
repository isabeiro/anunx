
import * as yup from 'yup'
import ProductsModel from '../../../src/models/products'

const product = await ProductsModel.findOne({ _id: id })

const initialValues = {
  title: product.title,
  category: product.category,
  description: product.description,
  price: product.price,
  email: product.user.email,
  name: product.user.name,
  phone: product.user.phone,
  local: product.user.local,
  timestamp: product.user.timestamp,
}

const validationSchema = yup.object().shape({
  title: yup.string()
    .min(6, 'Escreva um título maior')
    .max(100, 'Título muito grande')
    .required('Campo obrigatório'),
  category: yup.string().required('Campo obrigatório'),
  description: yup.string()
  .min(50, 'Escreva uma descrição com pelo menos 50 caracteres.')
  .required('Campo obrigatório'),
  price: yup.number().required('Campo obrigatório'),
  email: yup.string().email('Digite um e-mail válido').required('Campo obrigatório'),
  name: yup.string().required('Campo obrigatório'),
  phone: yup.number().required('Campo obrigatório'),
  local: yup.string().required('Campo obrigatório'),
  files: yup.array().min(1, 'Envie pelo menos uma foto').required('Campo obrigatório')
})

export {
  initialValues,
  validationSchema,
}