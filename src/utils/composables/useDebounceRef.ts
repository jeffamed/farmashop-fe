import { ref, watch, type Ref } from 'vue'

export const useDebouncedRef = <T>(source: Ref<T>, delay = 300) => {
  const debounced = ref(source.value) as Ref<T>

  let timeout: ReturnType<typeof setTimeout>

  watch(source, (value) => {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      debounced.value = value
    }, delay)
  })

  return debounced
}
