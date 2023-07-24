import './assets/main.css'

// Toast
import 'vant/es/toast/style'
// Dialog
// import 'vant/es/dialog/style';
// Notify
// import 'vant/es/notify/style';
// ImagePreview
// import 'vant/es/image-preview/style';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

console.log(__AAA__)
