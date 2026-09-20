import type { SelectSize } from '@/types/Component.ts'

interface ClassValue {
  [key: string]: string
}
export const selectSizeClasses: Record<SelectSize, ClassValue> = {
  sm: {
    trigger: 'px-3 py-2 text-xs',
    triggerIcon: 'h-3.5 w-3.5',
    searchInput: 'py-1 pr-2 pl-8 text-xs',
    searchIcon: 'left-3 h-3.5 w-3.5',
    option: 'px-2.5 py-1.5 text-xs',
    optionCheck: 'h-3.5 w-3.5',
    optionCheckIcon: 'h-2 w-2',
    chip: 'py-0.5 pr-1.5 pl-2.5 text-[11px]',
    chipIcon: 'h-3.5 w-3.5',
    chipIconInner: 'h-2.5 w-2.5',
  },
  md: {
    trigger: 'px-4 py-3 text-sm',
    triggerIcon: 'h-4 w-4',
    searchInput: 'py-2 pr-2 pl-9 text-sm',
    searchIcon: 'left-3.5 h-4 w-4',
    option: 'px-3 py-2.5 text-sm',
    optionCheck: 'h-4 w-4',
    optionCheckIcon: 'h-2.5 w-2.5',
    chip: 'py-1 pr-2 pl-3 text-xs',
    chipIcon: 'h-4 w-4',
    chipIconInner: 'h-3 w-3',
  },
  lg: {
    trigger: 'px-5 py-3.5 text-base',
    triggerIcon: 'h-5 w-5',
    searchInput: 'py-2.5 pr-2 pl-10 text-base',
    searchIcon: 'left-4 h-5 w-5',
    option: 'px-4 py-3 text-base',
    optionCheck: 'h-5 w-5',
    optionCheckIcon: 'h-3 w-3',
    chip: 'py-1.5 pr-2.5 pl-3.5 text-sm',
    chipIcon: 'h-5 w-5',
    chipIconInner: 'h-3.5 w-3.5',
  },
}
