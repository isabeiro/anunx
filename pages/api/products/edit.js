import nextConnect from 'next-connect'
import { put } from '../../../src/controllers/products'

const route = nextConnect()

route.put(put)

export default route

export const config = {
  api: {
    bodyParser: false
  }
}