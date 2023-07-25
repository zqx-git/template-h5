import './assets/main.css'

// Toast
import 'vant/es/toast/style'
// Dialog
// import 'vant/es/dialog/style';
// Notify
// import 'vant/es/notify/style';
// ImagePreview
// import 'vant/es/image-preview/style';

import App from './App.vue'
import router from './router'
import pinia from './store/index'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')

console.log(__AAA__)
