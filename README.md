# Vue 3.0移动端商城项目开发



> 原readme.md内容
>
> ````md
> # ewshop
> 
> ## Project setup
> ```
> npm install
> ```
> 
> ### Compiles and hot-reloads for development
> ```
> npm run serve
> ```
> 
> ### Compiles and minifies for production
> ```
> npm run build
> ```
> 
> ### Customize configuration
> See [Configuration Reference](https://cli.vuejs.org/config/).
> ````



## 一、初始化项目

#### 1.后端接口

https://www.showdoc.com.cn/1207745568269674/6094279351627422



#### 2.创建项目

*第一步：*进入文件夹在终端创建脚手架`vue create ewshop`
*第二步：*创建新的项目`Manually select features`
<img src="C:/Users/86151/AppData/Roaming/Typora/typora-user-images/image-20250705142214202.png" alt="image-20250705142214202" style="zoom: 50%;" />
![image-20250705142408916](C:/Users/86151/AppData/Roaming/Typora/typora-user-images/image-20250705142408916.png)
*第三步：*创建配置文件，ewshop目录中新建一个`vue.config.js`
*第四步：*修改标题小图标

```
public-->index.html
<link rel="icon" href="<%= BASE_URL %>favicon.png">  //修改favicon.png
```



#### 3.初始化项目设置别名

**在导入图片时需要使用@符进入src目录，所以添加配置项**
vue.config.js

```js
module.exports = {
  configureWebpack: {
    resolve:{
      alias:{
        'assets':'@/assets'
      }
    }
  },
  publicPath: './'
}
```

> 此时可以直接使用别名assets,而不用使用@/assets



Home.vue
```vue
<template>
  <div class="home">
    <img src="~assets/images/1.png">
    <img :src="imgsrc">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

data(){
  return {
    imgsrc:require('assets/images/2.png')
  }
```

**注意：在字符串中使用别名时要加~波浪线，而在js中导入时用require方法**



*常用初始化配置*

```js
module.exports = {
  configureWebpack: {
    resolve:{
      alias:{
        'assets':'@/assets',
        'components':'@/components',
        'network':'@/network',
        'utils':'@/utils',
        'views':'@/views'
      }
    }
  },
  publicPath: './'
}
```



#### 4.初始化全局样式内容

*第一步：*从github上下载第三方css样式常用的`normalize.css`放入文件assets/css文件夹中

*第二步：*在同一个目录下创建自己全局样式`base.css`

base.css

```css
@import "./normalize.css";  /*导入第三方样式*/

:root{
    --color-text:#666;         /*声明变量，使用是var(变量名)*/
    --color-high-text: #42bBaa;
    --color-tint:#42b983;
    --color-background:#FFFFFF;
    --font-size:14px;
    --line-height:1.5;
}

*,
*::before,*::after{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    user-select: none;  /*禁止用户选择文件或图片 */
    background: var(--color-background);
    color: var(--color-text);
    width: 100vw;
}

a{
    color:var(--color-text);
    text-decoration: none;
}

.left{
    float: left;
}
.right{
    float: right;
}
```

在App.vue导入可直接使用

```vue
<style lang="scss">
  @import "assets/css/base.css";
</style>

在其他子组件也可以使用
<style>
  .demo1{
    color: var(--color-high-text);
  }
</style>
```



#### 5.封装网络请求

*第一步：*首先在network里创建`request.js`（通用网络请求）和其他网络请求如：home.js,cart.js
*第二步：*安装axios插件`npm i axios -S`
*第三步：*在request.js中暴露请求

```js
import axios from "axios";

export function request(config){
    //创建一个实例，基础配置
    const instance = axios.create({
        baseURL: 'https://api.shop.eduwork.cn',  //请求域名
        timeout:5000  //请求时间
    })

    //请求拦截
    instance.interceptors.request.use(config=>{
        //如果有一个接口需要认证才可以访问，就在这统一设置
        
        //直接放行
        return config;
    },err=>{
        //错误时统一处理
    })

    //响应拦截
    instance.interceptors.response.use(res=>{
        //直接放行
        return res.data ? res.data:res;//有data直接返回，没有就res 
    },err=>{
        //有错误要处理，根据状态码处理，显示错误信息

    })

    return instance(config);
}
```

home.js
```js
import { request } from "./request";

//得到首页所有数据
export function getHomeAllData(){
    return request({
        url:'/api/index'
    })
}
```

*第四步：*渲染到页面上
HomeView.vue

```vue
<template>
  <div class="home">
    {{banner}}
  </div>
</template>

<script>
import {onMounted,ref} from 'vue';
import { getHomeAllData } from 'network/home';

export default {
  name: 'HomeView',
  
  setup(){

    const banner = ref([])

    onMounted(()=>{
      getHomeAllData().then(res=>{
        
        banner.value = res.slides;

      }).catch((err)=>{

      })

    })

    return {
      banner
    }
  },

  components: {

  }
}
</script>

<style>
  .demo1{
    color: var(--color-high-text);
  }
</style>
```



## 二、项目制作首页

#### （一）、底部导航栏制作

*第一步：*在view目录中创建每个主页面：首页(home),分类(category),购物车(shopcart),个人中心(profile)
               举例：Profile.vue

```vue
<template>
    <div>
        <h1>个人中心</h1>
    </div>
</template>

<script>
    export default {
        name:'Profile' //每个页面只修改这个
    }
</script>

<style scoped>

</style>
```

*第二步：*添加路由router目录中index.js

```js
const Home = ()=> import('../views/home/Home.vue')
const Category = () => import('../views/category/Category.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path:'/category',
    name:'category',
    component: Category
  }
]
```

> icon图标使用[阿里组件库](https://www.iconfont.cn/),添加进购物车，下载代码解压至`src/assets/css`中,在App.vue中导入后使用
>
> `@import "assets/css/iconfont.css";`使用如下第三步



*第三步：*使用路由App.vue

```vue
<template>
  
  <router-view/>

  <div id="nav">
    <router-link class="tab-bar-item" to="/">
      <div class="icon"><i class="iconfont icon-shouye"></i></div>
      <div>首页</div>
    </router-link> 
    <router-link class="tab-bar-item" to="/category">
      <div class="icon"><i class="iconfont icon-sort"></i></div>
      <div>分类</div>
    </router-link>
    <router-link class="tab-bar-item" to="/shopcart">
      <div class="icon"><i class="iconfont icon-gouwuche"></i></div>
      <div>购物车</div>
    </router-link>
    <router-link class="tab-bar-item" to="/profile">
      <div class="icon"><i class="iconfont icon-touxiang"></i></div>
      <div>我的</div>
    </router-link>
  </div>
</template>
```

*第四步：*调整样式

```
#nav{
    display: flex;
    position: fixed;
}    
.tab-bar-item{
    flex: 1;  //平均分布
    text-align: center;
    height: 50px;
    font-size: 16px;
}
.tab-bar-item .icon{
    height: 24px;
    width: 24px;
    margin-top: 5px;
    display: inline-block;
    vertical-align: middle;
}
```



#### （二）、顶部导航栏制作

*第一步：*设置导航条（一般分为左，中，右三部分），创建component/common/navbar/NavBar.vue

> slot插槽，用于导航栏不同页面不同展现形式

```vue
<template>
    <div class="nav-bar">
        <div class="left"><slot name="left">
            <img src="~assets/images/left.png">
    	</slot></div>
        <div class="center"><slot>ewshop</slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
    export default {
        name:"NavBar"
    }
</script>

```

*第二步：*在Home.vue中,`<nav-bar>`为类名

```vue
<template>
    <div>
       <nav-bar>
            <template #left>&lt;</template>
            <template #default>图书兄弟</template>
       </nav-bar> 
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    export default {
        name:'Home',
        components:{   //添加组件
            NavBar
        }
    }
</script>
```

*第三步：*设置样式

```css
<style scoped>
    .nav-bar{
        display: flex;
        background-color: var(--color-tint);
        color: #fff;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
        height: 45px;
        line-height: 45px;
        text-align: center;
        box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.1);
    }
    .left, .right{
        width: 60px;
    }
    .left img{
        width: 45px;
        padding: 12px;
    }
    .center{
        flex: 1;  /*中间内容占剩余部分*/
    }
</style>
```

*第四步：*添加事件，导入路由使用

```html
<template>
    <div class="nav-bar">
        <div class="left" @click="goback()"><slot name="left">
            <img src="~assets/images/left.png">
        </slot></div>
        <div class="center"><slot>ewshop</slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
    // 导入路由
    import { useRouter } from 'vue-router';
    export default {
        name:"NavBar",
        setup(){
            const router = useRouter();
            const goback = ()=>{
                router.go(-1);  //回到上一个页面
            }
            // 组合式api要return才能使用
            return {goback}
        }
    }
</script>
```

Home.vue
```html
<template>
    <div>
       <nav-bar>
            <template #default>图书兄弟</template>
       </nav-bar> 
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    export default {
        name:'Home',
        components:{   //添加组件
            NavBar
        }
    }
</script>
```

*第五步：*添加导航首位index.js中,每个组件添加`meta{ title:’…’ }`

```js
{
    path:'/profile',
    name:'profile',
    component: Profile,
    meta:{
      title:'图书兄弟-个人中心'
    }
  }

const router = createRouter({   //创建路由器
  history: createWebHistory(process.env.BASE_URL),
  routes   //创建的路由规则
})

router.beforeEach((to,from,next)=>{
  //如果没有登录，在这里到login
  next();
  document.title = to.meta.title
})
```



#### （三）、首页推荐制作

*第一步：*在Home.vue中添加静态图片占位

```vue
<template>
    <div>
       <nav-bar>
            <template #default>图书兄弟</template>
       </nav-bar> 
    </div>
    <div class="banner">
        <img src="@/assets/images/1.png">
    </div>
</template>

<style scoped>
.banner img{
    width: 100%;
    height: auto;
    margin-top: 45px;
}
</style>
```

*第二步：*新建推荐子组件views — home — ChildComps  — RecommendView.vue，进行最初样式设计

```vue
<template>
    <div class="recommend">
        <div class="recommend-item">
            <a href="">
                <img src="~assets/images/11.png">
                <div>细说php</div>
            </a>
        </div>
        <div class="recommend-item">
            <a href="">
                <img src="~assets/images/11.png">
                <div>细说php</div>
            </a>
        </div>
        <div class="recommend-item">
            <a href="">
                <img src="~assets/images/11.png">
                <div>细说php</div>
            </a>
        </div>
        <div class="recommend-item">
            <a href="">
                <img src="~assets/images/11.png">
                <div>细说php</div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name:'RecommendView'
    }
</script>

<style scoped lang="scss">
    .recommend {
        display: flex;
        width: 100%;
        text-align: center;
        padding: 15px 0 30px;
        border-bottom: 8px solid #eee;
        font-size: 12px;
    }
    .recommend-item{
        flex: 1;
        img{
            width: 70px;
            height: 70px;
            margin-bottom: 10px;
        }
    }
</style>
```

*第三步：*在Home.vue中注册并使用组件

```vue
<recommend-view></recommend-view>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import RecommendView from "./ChildComps/RecommendView.vue";
    export default {
        name:'Home',
        components:{   //添加组件
            NavBar,
            RecommendView
        }
    }
</script>
```

*第四步：*在数据库中引入推荐，需要请求数据（接口的请求和使用）

> network中的home.js专门请求首页数据

Home.vue
```js
//获取请求的首页数据
import { getHomeAllData } from "@/network/home";
//导入生命周期函数和响应式
import { ref,onMounted } from "vue";

export default {
    setup(){
        const recommends = ref([]);
        
        onMounted(()=>{
            getHomeAllData().then((res)=>{
                console.log(res)
                //将请求数据传给ref响应式数组
                recommends.value = res.goods.data
            })
        })
    },
}
```

> 用属性的方式将信息传给组件

`<recommend-view :recommends="recommends"></recommend-view>`

> RecommendView.vue组件中使用属性值

```html
<template>
    <div class="recommend">
        <div class="recommend-item" v-for="item in recommends.slice(0,4)" :key="item.id">
            <a href="">
                <img :src="item.cover_url">
                <div>{{ item.title }}</div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name:'RecommendView',
        // 接收属性值
        props:{
            recommends:{
                type:Array,
                default() {
                    return [];
                }
            }
        }
    }
</script>
```

*第五步：*商品详情a链接跳转
1.先给a添加点击事件`<a href="" @click.prevent="goD(item.id)">`
2.导入并使用路由器

```js
import { useRouter } from 'vue-router';

setup(){
    const router = useRouter();

    const goD = (id)=>{
        router.push({path:'/detail',query:{id}})
    }

    return {goD}
}
```

3.在详情组件添加id值，首先引入路由并使用

```js
//插值语法使用
<template #default>图书详情:{{ id }}</template>

//引入路由
import { useRoute } from "vue-router";
import { ref } from 'vue'

setup() {
    const route = useRoute();
    let id = ref(0);
    id.value = route.query.id

    return {
        id
    }
}
```



#### （四）、选项卡制作

*第一步：*component — content — tabControl —TabControl.vue

```vue
<template>
    <div class="tab-control">
        <div v-for="(items,index) in titles" :key="index"
        @click="itemClick(index)"
        class="tab-control-item" :class="{active:index==currentIndex}">
            <span>{{ items }}</span>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue'
    export default {
        name:'TabControl',
        props:{
            titles:{
                type:Array,
                default(){
                    return [];
                }
            }
        },
        setup(props,{emit}){  //{emit}传给父组件
            let currentIndex = ref(0);

            const itemClick = (index)=>{
                currentIndex.value = index;
                emit('tabClick',index)  //传给父组件的方法tabClick
            }
            return {
                currentIndex,itemClick
            }
        }
    }
</script>

<style scoped lang="scss">
    .tab-control{
        display: flex;
        height: 40px;
        width: 100%;
        font-size: 14px;
        text-align: center;
        line-height: 40px;
        background-color: #fff;
        position: sticky;
        top: 44px;
        .tab-control-item{
            flex: 1;
        }
        .active{
            color: var(--color-tint);
            span{
                border-bottom: 3px solid var(--color-tint);
            }  
        }
    }
</style>
```

Home.vue
```vue
<template>
    <div class="tab-control">
        <div v-for="(items,index) in titles" :key="index"
        @click="itemClick(index)"
        class="tab-control-item" :class="{active:index==currentIndex}">
            <span>{{ items }}</span>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue'
    export default {
        name:'TabControl',
        props:{
            titles:{
                type:Array,
                default(){
                    return [];
                }
            }
        },
        setup(props,{emit}){  //{emit}传给父组件
            let currentIndex = ref(0);

            const itemClick = (index)=>{
                currentIndex.value = index;
                emit('tabClick',index)  //传给父组件的方法tabClick
            }
            return {
                currentIndex,itemClick
            }
        }
    }
</script>

<style scoped lang="scss">
    .tab-control{
        display: flex;
        height: 40px;
        width: 100%;
        font-size: 14px;
        text-align: center;
        line-height: 40px;
        background-color: #fff;
        position: sticky;
        top: 44px;
        .tab-control-item{
            flex: 1;
        }
        .active{
            color: var(--color-tint);
            span{
                border-bottom: 3px solid var(--color-tint);
            }  
        }
    }
</style>
```

#### （五）、列表组件制作

*第一步：*创建内容组件goods/GoodsList.vue,GoodsListItem.vue
*第二步：*导入组件并使用

GoodsListItem.vue

```vue
<template>
    <div class="goods-item">
        <img src="~assets/images/11.png">
        <span class="bookname">标题</span>
        <div>
            <span class="price"><small>￥</small>66</span>
            <span class="collect">3</span>
        </div>
    </div>
</template>

<script>
    export default {
        name:'GoodsListItem'
    }
</script>

<style scoped lang="scss">
    .goods-item{
        width: 45%;
        font-size: 12px;
        position: relative;

        img{
            width: 100%;
            border-radius: 3px;
            padding: 10px;
        }
        .price{
            color: red;
            padding-right: 20px;
        }
        .collect{
            position: relative;
        }
        /*.collect::before：为 .collect 元素的前面插入一个内容（伪元素）*/ 
        .collect::before{
            content: '';
            position: absolute;
            left: -15px;
            width: 14px;
            height: 14px;
            top: -1px;
            /* 0 0 x轴y轴位置，14px 14px指缩放尺寸*/
            background: url('~assets/images/collect.png') 0 0/14px 14px;
        }
    }
</style>
```

GoodsList.vue
```vue
<template>
    <div class="goods">
        <GoodsListItem></GoodsListItem>
        <GoodsListItem></GoodsListItem>
        <GoodsListItem></GoodsListItem>
        <GoodsListItem></GoodsListItem>
        <GoodsListItem></GoodsListItem>
        <GoodsListItem></GoodsListItem>
        <GoodsListItem></GoodsListItem>
        <GoodsListItem></GoodsListItem>
    </div>
</template>

<script>
    import GoodsListItem from './GoodsListItem.vue';
    export default {
        name:'GoodsList',
        components:{
            GoodsListItem
        }
    }
</script>

<style scoped>
    .goods{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        z-index: 4;
    }
</style>
```

> 新知识：

==collect::before：为 .collect 元素的前面插入一个内容（伪元素）==
==在background中0 0 x轴y轴位置，14px 14px指缩放尺寸==
==z-index越大越往上==



*第三步：*接口的使用
1.home.js添加一个方法,默认类型为热销

```js
export function getHomeGoods(type='sales',page=1){
    return request({
        url:`/api/index?${type}=1&page=${page}`
    })
}
```

2.Home.vue中使用该方法

```js
//导入后再使用
onMounted(()=>{
    //热销
    getHomeGoods('sales').then((res)=>{
        console.log(res)
    }),
    //推荐
    getHomeGoods('recommend').then((res)=>{
        console.log(res)
    }),
    //新品
    getHomeGoods('new').then((res)=>{
        console.log(res)
    })
})
```

创建数组对象存放这三个数组

```js
//导入reactive
import { reactive } from "vue";

//定义商品对象
const goods = reactive({
    sales:{page:0,list:[]},
    new:{page:0,list:[]},
    recommend:{page:0,list:[]}
})

//将请求数据传入响应式对象
//热销
getHomeGoods('sales').then((res)=>{
    goods.sales.list = res.goods.data
})

//使用计算属性获取当前类型
import { computed } from "vue";
//当前类型
let currentType = ref('sale')
//计算属性,展示的商品
const showGoods = computed(()=>{
    return goods[currentType.value].list
})

//将当前类型数据传给子组件
<goods-list :goods="showGoods"></goods-list>

//子组件接收数据
props:{
    goods:{
        type:Array,
        default() {
            return [];
        }
    }
},
//子组件使用数据并传给孙组件
<GoodsListItem v-for="item in goods" :key="item.id" :product="item"></GoodsListItem>

//孙组件接收数据并使用
props:{
    product:{
        type:Object,  //对象类型
        default() {
            return {};
        }
    }
}

<img :src="product.cover_url">
<span class="bookname">{{ product.title }}</span>
<div>
    <span class="price"><small>￥</small>{{ product.price }}</span>
    <span class="collect">{{ product.collects_count }}</span>
</div>

//父组件绑定事件
const typeList = ['sales','new','recommend'];
//子组件传来的方法对应的自定义方法
const tabClick = (index)=>{
    // temid.value = index,
    currentType.value = typeList[index]
}
```



*第四步：*使用插件better-scroll上拉回弹

首先使用npm下载插件
` npm install better-scroll --save`

使用步骤
```js
//包住滚动的内容
<div class="wrapper">
    <div class="content">
    
//样式
#home{
    height: 100vh;
    position: relative;
}
.wrapper{
    position: absolute;
    top: 45px;
    bottom: 50px;
    left: 0px;
    right: 0px;
    overflow: hidden;
}

//引入滚动组件
import BScroll from "better-scroll";
import { setTimeout } from "core-js";

//挂载前定义变量
let bs;

//挂载时要
setTimeout(() => {
    let wrapper = document.querySelector('.wrapper');
    bs = new BScroll(wrapper, {
        probeType: 3,
        click: true,
        pullUpLoad: true
    });

    bs.on('scroll', (position) => {
        // console.log(position.y);
    });

    bs.on('pullingUp',()=>{
        console.log('下拉加载更多。。。')
        console.log(document.querySelector('.content').clientHeight)
        bs.refresh()
    })
},1000);


// 监听任何一个变量有变化
watchEffect(() => {
    nextTick(() => {
        bs && bs.refresh(); // 如果需要刷新滚动区域，可以调用 refresh 方法
    });
});
```

==问题==

> 页面无法滚动主要原因：没确保在 DOM 元素完全加载之后再初始化 BetterScroll。使用 `onMounted` 钩子，并在所有数据加载完成后初始化 BetterScroll。解决方式:使用计时，并停两秒操作

*第五步：*更新下一页

```js
//第一步：将下一页请求的数据放到列表中
bs.on('pullingUp',()=>{
    const page = goods[currentType.value].page+1;

    getHomeGoods(currentType.value,page).then(res=>{
        goods[currentType.value].list.push(...res.goods.data);
        goods[currentType.value].page +=1
    })
    //完成上拉，等数据请求完成，新数据展示
    bs.finishPullUp();
    //重新计算高度
    bs.refresh()
    console.log('当前类型'+currentType.value+'页数'+page)
    console.log(document.querySelector('.content').clientHeight)

})


//第二步：点击每个板块时重新计算高度
const tabClick = (index) => {
    // temid.value = index,
    const typeList = ['sales', 'new', 'recommend'];
    currentType.value = typeList[index]
    nextTick(() => {
        bs && bs.refresh(); // 如果需要刷新滚动区域，可以调用 refresh 方法
    });
}

//第三步：在GoodList.vue中修改key的值
:key="item"
```



*第六步：*固定导航栏

```js
//第一步：copy一个导航栏，到一定高度出现
<tab-control v-show="tabShow" @tabClick="tabClick" :titles="['畅销', '新书', '精选']"></tab-control>

//第二步：使用ref计算高度偏移量
<div ref="banref">
    <div class="banner">
        <img src="@/assets/images/1.png">
    </div>
    <!-- 用属性的方式将信息传给组件 -->
    <recommend-view :recommends="recommends"></recommend-view>
</div>

//第三步：创建tabShow变量和banref
    //导航栏初始为false
    let tabShow = ref(false)
    //声明ref变量
    let banref = ref(null)
    
//第四步：返回变量
return { tabShow,banref }

//第五步：判断什么时候显示
bs.on('scroll', (position) => {
    // console.log(position.y);
    //banref.value.offsetHeight偏移量
    if(-position.y>banref.value.offsetHeight){
        tabShow.value = true
    }else{
        tabShow.value = false
    }
});

//第六步：删除margin-top
.banner img {
    width: 100%;
    height: auto;

}
```



#### （六）、回到顶部组件制作

*第一步：*在common—backTop—BackTop.vue创建,并更改样式

```vue
<template>
    <div class="backTop"></div>
</template>

<script>
    export default {
        name:'BackTop',
    }
</script>

<style scoped>
    .backTop{
        height: 30px;
        width: 30px;
        position: fixed;
        bottom: 80px;
        right: 30px;
        border: #D82008 2px solid;
        z-index: 20;
        border-radius: 50%;
        box-shadow: 3px 3px 3px #888;
        background: #fcfcfc url('~assets/images/up.png') no-repeat center center;
    }
</style>
```

*第二步：*  Home.vue导入组件并使用

```js
//第一步：引入组件并注册
import BackTop from "@/components/common/backTop/BackTop.vue";

//第二步：什么时候出现
	<back-top v-show="backShow"></back-top>
    //创建变量初始化为false
    let backShow = ref(false)
    if(-position.y>banref.value.offsetHeight){
    	backShow.value=tabShow.value = true
    }else{
        backShow.value=tabShow.value = false
    }
    
//第三步：添加点击事件
	//在子组件中
	<div class="backTop" @click="backT"></div>
    setup(props,{emit}) {
        return { 
            backT:()=>{
                emit('backT')
            }
         }
     }

	//父组件
	<back-top @backT="backT" v-show="backShow"></back-top>
	const backT = ()=>{
        bs.scrollTo(0,0,500)
    }
## 注意方法使用都需要return返回出去
```



#### （七）、原keep-alive

防止服务器更新频繁

```vue
<!-- <router-view/> -->
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
```



#### （八）、vant组件库的使用

https://vant4.ylhtest.com/#/zh-CN

*第一步：*下载vant并安装插件
	vue3安装:`npm i vant`
	插件:`npm i unplugin-vue-components -D`

```js
//在vue-cli中vue.config.js使用插件
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
};

```

*第二步：*使用轮播图要导入
在main.js中`import { Swipe, SwipeItem } from 'vant';`
`createApp(App).use(Swipe).use(SwipeItem)`

*第三步：*新建子组件HomeSwiper.vue

Home.vue父组件
```js
//第一步：引入注册后使用组件
<home-swiper :banner="banner"></home-swiper>

//第二步：使用banner
let banner = ref([])
getHomeAllData().then((res) => {
    //获取轮播图数据
    banner.value = res.slides
    console.log(res.slides)
}),
```

HomeSwiper.vue
```vue
<template>
    <van-swipe :v-if="banner.length" class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in banner" :key="index">
            <img :src="item.img_url">
        </van-swipe-item>
    </van-swipe>
</template>

<script>
export default {
    name:'HomeSwiper',
    props:{
        banner:{
            type:Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style scoped>
img{
    width: 100%;
    height: auto;
}
</style>
```



vant组件库中的懒加载和勋章
```js
//懒加载
import { Lazyload } from 'vant';
createApp(App).use(Lazyload,{
    loading:require('./assets/images/default.png')  //默认加载的图片
})
//所有图片的src都可换成v-lazy，不需要加冒号；

//勋章
import { Badge } from 'vant';
createApp(App).use(Badge)
//购物车
<router-link class="tab-bar-item" to="/shopcart">
  <van-badge :content="2" max="9" :offset="['4px','3px']">
    <div class="icon"><i class="iconfont icon-gouwuche"></i></div>
  </van-badge>
  <div>购物车</div>
</router-link>

```













