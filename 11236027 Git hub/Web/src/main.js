import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Toast from 'vue-toastification';
import { router } from './router/router.js'
import 'vue-toastification/dist/index.css';
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App)
app.use(router)
app.use(Toast)

app.mount('#app')
