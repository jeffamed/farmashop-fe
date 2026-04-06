<template>
  <aside
    :class="[
      'fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-99999 border-r border-gray-200',
      {
        'lg:w-[290px]': isExpanded || isMobileOpen || isHovered,
        'lg:w-[90px]': !isExpanded && !isHovered,
        'translate-x-0 w-[290px]': isMobileOpen,
        '-translate-x-full': !isMobileOpen,
        'lg:translate-x-0': true,
      },
    ]"
    @mouseenter="!isExpanded && (isHovered = true)"
    @mouseleave="isHovered = false"
  >
    <div :class="['py-8 flex', !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start']">
      <router-link to="/">
        <img
          v-if="isExpanded || isHovered || isMobileOpen"
          class="dark:hidden"
          src="/images/logo/logo.svg"
          alt="Logo"
          width="150"
          height="40"
        />
        <img
          v-if="isExpanded || isHovered || isMobileOpen"
          class="hidden dark:block"
          src="/images/logo/logo-dark.svg"
          alt="Logo"
          width="150"
          height="40"
        />
        <img v-else src="/images/logo/logo-icon.svg" alt="Logo" width="32" height="32" />
      </router-link>
    </div>
    <div class="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
      <nav class="mb-6">
        <div class="flex flex-col gap-4">
          <div v-for="(menuGroup, groupIndex) in menuGroups" :key="groupIndex">
            <h2
              :class="[
                'mb-4 text-xs uppercase flex leading-5 text-gray-400',
                !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start',
              ]"
            >
              <template v-if="isExpanded || isHovered || isMobileOpen">
                {{ menuGroup.title }}
              </template>
              <HorizontalDots v-else />
            </h2>
            <ul class="flex flex-col gap-4">
              <li v-for="(item, index) in menuGroup.items" :key="item.name">
                <button
                  v-if="item.subItems"
                  @click="toggleSubmenu(groupIndex, index)"
                  :class="[
                    'menu-item group w-full',
                    {
                      'menu-item-active': isSubmenuOpen(groupIndex, index),
                      'menu-item-inactive': !isSubmenuOpen(groupIndex, index),
                    },
                    !isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start',
                  ]"
                >
                  <span
                    :class="[
                      isSubmenuOpen(groupIndex, index)
                        ? 'menu-item-icon-active'
                        : 'menu-item-icon-inactive',
                    ]"
                  >
                    <component :is="item.icon" />
                  </span>
                  <span v-if="isExpanded || isHovered || isMobileOpen" class="menu-item-text">{{
                    item.name
                  }}</span>
                  <ChevronDownIcon
                    v-if="isExpanded || isHovered || isMobileOpen"
                    :class="[
                      'ml-auto w-5 h-5 transition-transform duration-200',
                      {
                        'rotate-180 text-brand-500': isSubmenuOpen(groupIndex, index),
                      },
                    ]"
                  />
                </button>
                <router-link
                  v-else-if="item.path"
                  :to="item.path"
                  :class="[
                    'menu-item group',
                    {
                      'menu-item-active': isActive(item.path),
                      'menu-item-inactive': !isActive(item.path),
                    },
                  ]"
                >
                  <span
                    :class="[
                      isActive(item.path) ? 'menu-item-icon-active' : 'menu-item-icon-inactive',
                    ]"
                  >
                    <component :is="item.icon" />
                  </span>
                  <span v-if="isExpanded || isHovered || isMobileOpen" class="menu-item-text">{{
                    item.name
                  }}</span>
                </router-link>
                <transition
                  @before-enter="startTransition"
                  @after-enter="endTransition"
                  @before-leave="startTransition"
                  @after-leave="endTransition"
                >
                  <div
                    v-show="
                      isSubmenuOpen(groupIndex, index) && (isExpanded || isHovered || isMobileOpen)
                    "
                  >
                    <ul class="mt-2 space-y-1 ml-9">
                      <li v-for="subItem in item.subItems" :key="subItem.name">
                        <router-link
                          :to="{ name: subItem.pathname }"
                          :class="[
                            'menu-dropdown-item',
                            {
                              'menu-dropdown-item-active': isActive(subItem.path),
                              'menu-dropdown-item-inactive': !isActive(subItem.path),
                            },
                          ]"
                        >
                          {{ subItem.name }}
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </transition>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </aside>
</template>
<script setup lang="ts">
import '@n8n/chat/style.css'
import { createChat } from '@n8n/chat'
import { useSidebar } from '@/composables/useSidebar'
import { computed, onMounted } from 'vue'
import { ChevronDownIcon, GridIcon, HorizontalDots } from '@/components/icons'
import { useRoute } from 'vue-router'

onMounted(() => {
  createChat({
    webhookUrl: 'http://localhost:5678/webhook/5d4bde84-176d-4133-9c03-64e1eacdd568/chat',
    defaultLanguage: 'es',
    initialMessages: ['Hola! 👋', 'Mi nombre es FarmIA. Como puedo ayudarte hoy?'],
    i18n: {
      es: {
        title: 'Hola! 👋',
        subtitle: 'Iniciar un chat. Estamos aqui para ayudarte 24/7.',
        footer: '',
        getStarted: 'Nueva conversación',
        inputPlaceholder: 'Escribe tus dudas aqui',
      },
    },
  })
})
const route = useRoute()
const { isExpanded, isMobileOpen, isHovered, openSubmenu } = useSidebar()
const menuGroups = [
  {
    title: 'Menu',
    items: [
      {
        icon: GridIcon,
        name: 'Dashboard',
        pathname: 'home',
        path: '/',
      },
      {
        icon: GridIcon,
        name: 'Inventario',
        subItems: [
          {
            name: 'Product',
            path: '/product',
            pathname: 'product',
          },
        ],
      },
    ],
  },
]
const isActive = (path: string) => route.path === path

const toggleSubmenu = (groupIndex: number, itemIndex: number) => {
  const key = `${groupIndex}-${itemIndex}`
  openSubmenu.value = openSubmenu.value === key ? null : key
}

const isAnySubmenuRouteActive = computed(() => {
  return menuGroups.some((group) =>
    group.items.some(
      (item) => item.subItems && item.subItems.some((subItem) => isActive(subItem.path)),
    ),
  )
})

const isSubmenuOpen = (groupIndex: number, itemIndex: number): boolean => {
  const key = `${groupIndex}-${itemIndex}`
  const subItems = menuGroups[groupIndex].items[itemIndex].subItems

  return (
    openSubmenu.value === key ||
    Boolean(isAnySubmenuRouteActive.value && subItems?.some((subItem) => isActive(subItem.path)))
  )
}

const startTransition = (el: HTMLElement) => {
  el.style.height = 'auto'
  const height = el.scrollHeight
  el.style.height = '0px'
  el.offsetHeight // force reflow
  el.style.height = height + 'px'
}

const endTransition = (el: HTMLElement) => {
  el.style.height = ''
}
</script>
<style>
/* 🧢 HEADER - reducir título y espacio */
.chat-header {
  padding: 10px 14px !important;
}

.chat-header h1,
.chat-header .chat-title {
  font-size: 1.2rem !important;
  margin: 0 !important;
  line-height: 1.2;
}

.chat-header p,
.chat-header .chat-subtitle {
  font-size: 0.85rem;
  margin-top: 4px;
}

/* ❌ quitar espacio vacío arriba de los mensajes */
.chat-body {
  padding-top: 10px !important;
}

/* 💬 lista de mensajes más compacta */
.chat-messages {
  padding-top: 5px !important;
}

/* 📩 FOOTER */
.chat-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 10px;
  gap: 8px;
}

/* ✍️ INPUT ocupa todo el ancho */
.chat-input {
  flex: 1;
}

/* 🚀 BOTÓN ENVIAR CENTRADO */
.chat-input-send-button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

/* si el botón está dentro de otro contenedor */
.chat-input-send-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
