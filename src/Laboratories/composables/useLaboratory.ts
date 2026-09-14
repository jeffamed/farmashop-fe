import { laboratoryService } from '@/Laboratories/services/laboratoryService'
import { useQuery } from '@tanstack/vue-query'
import { useLaboratoryStore } from '@/Laboratories/stores/laboratory.store.ts'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
export const useLaboratory = () => {

  const service = laboratoryService()
  const store = useLaboratoryStore()
  const { laboratories, filter, total, pagination } = storeToRefs(store)

  const laboratoriesData = useQuery({
    queryKey: ['laboratories', filter],
    queryFn: () => service.getLaboratories(store.filter)
  })

  watch(laboratoriesData.data, (data) => {
    if (data) {
      store.setLaboratories(data)
    }
  })

  return{
    laboratoriesData,
    laboratories,
    filter, total, pagination
  }

}
