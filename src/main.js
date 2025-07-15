import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { SwipeCell,Tab, Tabs,Swipe, SwipeItem,Lazyload,Badge,Collapse, 
    CollapseItem,Sidebar, SidebarItem,Image,Button,Card,Tag } from 'vant';

createApp(App)
.use(Image).use(Button).use(Card).use(Tag)
.use(Tab).use(Tabs).use(SwipeCell)
.use(Sidebar).use(SidebarItem)
.use(Collapse).use(CollapseItem)
.use(Badge)
.use(Lazyload,{
    loading:require('./assets/images/default.png')
})
.use(Swipe).use(SwipeItem)
.use(store).use(router).mount('#app')
