export type OptionValue = string | number
export type SelectOption = Record<string, OptionValue>
export type SelectSize = 'sm' | 'md' | 'lg'

export interface SearchSelectProp {
  search: string
  modelValue?: OptionValue | OptionValue[] | null
  options: SelectOption[]
  multiple?: boolean
  placeholder?: string
  searchPlaceholder?: string
  label?: string
  trackBy?: string
  helperText?: string
  size?: SelectSize
}
