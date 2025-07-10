import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Swipe, SwipeItem,Lazyload,Badge } from 'vant';

createApp(App)
.use(Badge)
.use(Lazyload,{
    loading:require('./assets/images/default.png')
})
.use(Swipe)
.use(SwipeItem)
.use(store).use(router).mount('#app')
