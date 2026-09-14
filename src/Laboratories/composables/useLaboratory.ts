import { laboratoryService } from '@/Laboratories/services/laboratoryService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useLaboratoryStore } from '@/Laboratories/stores/laboratory.store.ts'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
export const useLaboratory = () => {

  const service = laboratoryService()
  const store = useLaboratoryStore()
  const { laboratories, filter, total, pagination } = storeToRefs(store)
  const clientQuery = useQueryClient()

  const laboratoriesData = useQuery({
    queryKey: ['laboratories', filter],
    queryFn: () => service.getLaboratories(store.filter)
  })

  watch(laboratoriesData.data, (data) => {
    if (data) {
      store.setLaboratories(data)
    }
  })

  const createLaboratory = useMutation({
    mutationFn: service.createLaboratory,
    onSuccess: () => {
      clientQuery.invalidateQueries({
        queryKey: ['laboratories'],
      })
    }
  })

  const deleteLaboratory = useMutation({
    mutationFn: service.deleteLaboratory,
    onSuccess: () => {
      clientQuery.invalidateQueries({
        queryKey: ['laboratories'],
      })
    }
  })

  const editLaboratory = useMutation({
    mutationFn: service.updateLaboratory,
    onSuccess: () => {
      clientQuery.invalidateQueries({
        queryKey: ['laboratories'],
      })
    },
  })

  return{
    laboratoriesData,
    laboratories,
    filter,
    total,
    pagination,
    createLaboratory,
    deleteLaboratory,
    editLaboratory,
  }
}
