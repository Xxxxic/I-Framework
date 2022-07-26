import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// vue组件之间的通信
import mitt from 'mitt'

// 引入Elmessage和Elloading的css样式文件
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'

const app=createApp(App)
app.config.globalProperties.emitter = mitt()
app.use(store)
app.use(router)
app.mount('#app')
