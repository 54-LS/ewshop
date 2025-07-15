<template>
    <div id="home">
        <nav-bar>
            <template #default>图书兄弟</template>
        </nav-bar>

        <tab-control v-show="tabShow" @tabClick="tabClick" :titles="['畅销', '新书', '精选']"></tab-control>

        <!-- 滚动位置 -->
        <div class="wrapper">
            <div class="content">
                <!-- 使用ref将上面两个高度包裹住 -->
                <div ref="banref">
                    <home-swiper :banner="banner"></home-swiper>
                    <!-- 用属性的方式将信息传给组件 -->
                    <recommend-view :recommends="recommends"></recommend-view>
                </div>
                
                <tab-control @tabClick="tabClick" :titles="['畅销', '新书', '精选']"></tab-control>
                <goods-list :goods="showGoods"></goods-list>
            </div>
        </div>
        <!-- 返回顶部 -->
        <back-top @backT="backT" v-show="backShow"></back-top>
    </div>

</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import RecommendView from "./ChildComps/RecommendView.vue";

import GoodsList from "@/components/content/goods/GoodsList.vue";
//获取请求的首页数据
import { getHomeAllData, getHomeGoods } from "@/network/home";
//导入生命周期函数
import { ref, onMounted, reactive, computed, watchEffect, nextTick } from "vue";

import TabControl from "@/components/content/tabControl/TabControl.vue";
//引入滚动组件
import BScroll from "better-scroll";
import { setTimeout } from "core-js";
//引入返回顶部组件
import BackTop from "@/components/common/backTop/BackTop.vue";
//vant轮播图组件
import HomeSwiper from "./ChildComps/HomeSwiper.vue";

export default {
    name: 'Home',
    setup() {
        //临时变量
        let temid = ref(0);


        const recommends = ref([]);
        //定义商品对象
        const goods = reactive({
            sales: { page: 0, list: [] },
            new: { page: 0, list: [] },
            recommend: { page: 0, list: [] }
        })

        //当前类型
        let currentType = ref('sales')
        //计算属性,展示的商品
        const showGoods = computed(() => {
            return goods[currentType.value].list
        })

        let bs;

        //导航栏初始为false
        let tabShow = ref(false)
        //声明ref变量
        let banref = ref(null)

        //初始化为false
        let backShow = ref(false)

        //轮播图
        let banner = ref([])

        onMounted(() => {
            getHomeAllData().then((res) => {
                console.log('res:',res)
                //将请求数据传给ref响应式数组
                recommends.value = res.goods.data

                //获取轮播图数据
                banner.value = res.slides
                // console.log(res.slides)
            }),

                //热销
                getHomeGoods('sales').then((res) => {
                    goods.sales.list = res.goods.data
                }),
                //推荐
                getHomeGoods('recommend').then((res) => {
                    goods.recommend.list = res.goods.data
                }),
                //新品
                getHomeGoods('new').then((res) => {
                    goods.new.list = res.goods.data
                })
            console.log('goods:',goods)
            // 使用 setTimeout 确保 DOM 更新完成后再初始化 BetterScroll
            setTimeout(() => {
                let wrapper = document.querySelector('.wrapper');
                bs = new BScroll(wrapper, {
                    probeType: 3,
                    click: true,
                    pullUpLoad: true
                });

                bs.on('scroll', (position) => {
                    // console.log(position.y);
                    //banref.value.offsetHeight偏移量
                    if(-position.y>banref.value.offsetHeight){
                        backShow.value=tabShow.value = true
                    }else{
                        backShow.value=tabShow.value = false
                    }
                });

                //使用ref所对应的元素
                // console.log(banref.value)

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
            },1000);

        })

        //子组件传来的方法对应的自定义方法
        const tabClick = (index) => {
            // temid.value = index,
            const typeList = ['sales', 'new', 'recommend'];
            currentType.value = typeList[index]
            nextTick(() => {
                bs && bs.refresh(); // 如果需要刷新滚动区域，可以调用 refresh 方法
            });
        }


        // 监听任何一个变量有变化
        watchEffect(() => {
            nextTick(() => {
                bs && bs.refresh(); // 如果需要刷新滚动区域，可以调用 refresh 方法
            });
        });

        const backT = ()=>{
            bs.scrollTo(0,0,500)
        }

        return {
             recommends, tabClick, temid, goods, 
             showGoods,tabShow,banref,backShow,backT, 
             banner
            }
    },
    components: {   //添加组件
        HomeSwiper,
        NavBar,
        RecommendView,
        TabControl,
        GoodsList,
        BackTop
    }
}
</script>

<style scoped>
.banner img {
    width: 100%;
    height: auto;

}

#home {
    height: 100vh;
    position: relative;
}

.wrapper {
    /* height: calc(100vh - 45px); */

    position: absolute;
    top: 45px;
    bottom: 50px;
    left: 0px;
    right: 0px;
    overflow: hidden;
}

.content {}
</style>