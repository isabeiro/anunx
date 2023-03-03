
import * as yup from 'yup'

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
})

export {
  validationSchema,
}