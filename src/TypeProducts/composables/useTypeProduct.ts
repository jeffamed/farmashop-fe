import { basicApiService, type Payload } from '@/services/basicApiService.ts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useTypeProductStore } from '@/TypeProducts/stores/typeProduct.store.ts'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useDebouncedRef } from '@/utils/composables/useDebounceRef'

export const useTypeProduct = () => {
  type UpdateTypeProductVariables = {
    id: number
    payload: Payload
  }

  const typeProductStore = useTypeProductStore()
  const { typeProducts, search } = storeToRefs(typeProductStore)
  const queryClient = useQueryClient()
  const debouncedSearch = useDebouncedRef(search)
  const typeProductService = basicApiService('type-products')

  const { isPending, data, error, isError } = useQuery({
    queryKey: ['type-products', debouncedSearch],
    queryFn: () => typeProductService.getList(debouncedSearch.value),
  })

  watch(data, (typeProducts) => {
    if (typeProducts) {
      typeProductStore.setTypeProducts(typeProducts)
    }
  })

  const createTypeProduct = useMutation({
    mutationFn: typeProductService.saveData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['type-products'],
      })
    },
  })

  const deleteTypeProduct = useMutation({
    mutationFn: typeProductService.deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['type-products'],
      })
    },
  })

  const editTypeProduct = useMutation({
    mutationFn: ({id, payload}: UpdateTypeProductVariables) => typeProductService.updateData(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['type-products'],
      })
    },
  })

  return {
    isPending,
    typeProducts,
    error,
    isError,
    createTypeProduct,
    deleteTypeProduct,
    editTypeProduct,
    search
  }
}
