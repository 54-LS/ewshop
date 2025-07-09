import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const Home = ()=> import('../views/home/Home.vue')
const Category = () => import('../views/category/Category.vue');
const Detail = () => import('../views/detail/Detail.vue');
const ShopCart = () => import('../views/shopcart/ShopCart.vue');
const Profile = () => import('../views/profile/Profile.vue');

const routes = [  //存储路由，创建路由规则
  {
    path:'/HomeView',
    name:'HomeView',
    component: HomeView,
    meta:{
      title:'图书兄弟'
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta:{
      title:'图书兄弟'
    }
  },
  {
    path:'/category',
    name:'category',
    component: Category,
    meta:{
      title:'图书兄弟-分类页面'
    }
  },
  {
    path:'/detail',
    name:'detail',
    component: Detail,
    meta:{
      title:'图书兄弟-图书详情'
    }
  },
  {
    path:'/shopcart',
    name:'shopcart',
    component: ShopCart,
    meta:{
      title:'图书兄弟-购物车'
    }
  },
  {
    path:'/profile',
    name:'profile',
    component: Profile,
    meta:{
      title:'图书兄弟-个人中心'
    }
  }
]

const router = createRouter({   //创建路由器
  history: createWebHistory(process.env.BASE_URL),
  routes   //创建的路由规则
})

router.beforeEach((to,from,next)=>{
  //如果没有登录，在这里到login
  next();
  document.title = to.meta.title
})

export default router
