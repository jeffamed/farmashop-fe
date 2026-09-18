import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createNotivue } from 'notivue'
import VueTelInput from 'vue-tel-input'

import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'

import 'notivue/notification.css'
import 'notivue/animations.css'
import 'vue-tel-input/vue-tel-input.css'
import 'vue-multiselect/dist/vue-multiselect.css'

const app = createApp(App)
const notivue = createNotivue({
  position: 'top-right',
  limit: 4,
  enqueue: true,
  avoidDuplicates: true,
  notifications: {
    global: {
      duration: 3000,
    },
  },
});


app.use(notivue);
app.use(createPinia())
app.use(router)
app.use(VueTelInput)

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
