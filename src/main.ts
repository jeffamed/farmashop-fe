import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createNotivue } from 'notivue'

import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'

import 'notivue/notification.css'
import 'notivue/animations.css'

const app = createApp(App)
const notivue = createNotivue();

app.use(notivue);
app.use(createPinia())
app.use(router)
VueQueryPlugin.install(app,
  {
    queryClientConfig:{
      defaultOptions:{
        queries:{
          staleTime: 1000 * 60 * 3,
          gcTime: 1000 * 60 * 5,
        }
      }
    }
  })

app.mount('#app')
