import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// vue 2.0 syntax
//Vue.prototype.$echarts = echarts

// vue 3.0 syntax
//const app = createApp(App).use(router).mount('#app')
const app = createApp(App).use(router).mount('body')