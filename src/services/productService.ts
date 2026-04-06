import { api } from '../api/axios';
import type { Product } from '../types/Product';

const url = '/v1/products'
export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get(url)
  return data
}

export const createProduct = async (payload: Product) => {
    return await api.post(url, payload)
}
