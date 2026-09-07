import type { IconName } from '@/components/icons/type.ts'

export interface MenuSubItem {
  name: string
  path: string
  pathname: string
  can: string
}

export interface MenuItem {
  icon: IconName
  name: string
  path?: string
  pathname?: string
  subItems?: MenuSubItem[]
  can?: string[]
}

export interface MenuGroup {
  title: string
  items: MenuItem[]
}
