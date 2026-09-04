import { farmashopApi } from '../api/axios';
import type { Product } from '../types/Product';

const URL: string = '/v1/products'
/*export const getProducts = async (): Promise<Product[]> => {
  const { data } = await farmashopApi.get(url)
  return data
}

export const createProduct = async (payload: Product) => {
    return await farmashopApi.post(url, payload)
}*/

export const productService =  {
   async getProducts(): Promise<Product[]> {
      const { data } = await farmashopApi.get(URL)
      return data
   },
   async createProduct(payload: Product) {
      return await farmashopApi.post(URL, payload)
   }
}

