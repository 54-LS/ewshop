<template>
    <div>
        <nav-bar>
            <template #default>商品分类</template>
       </nav-bar>
       <div id="mainbox">
            <div class="ordertab">
                <van-tabs v-model:active="activeTab" @click-tab="onClickTab">
                    <van-tab title="销量排序"></van-tab>
                    <van-tab title="价格排序"></van-tab>
                    <van-tab title="评论排序"></van-tab>
                </van-tabs>
            </div>

            <van-sidebar class="leftmenu" v-model="active" @change="leftClickTab">
                <van-collapse v-model="activeName" accordion>
                    <van-collapse-item v-for="item in categories.slice(0,5)" :key="item.id"
                    :title="item.name" :name="item.name">
                        <van-sidebar-item v-for="son in item.children" :key="son.id" :title="son.name" />
                    </van-collapse-item>
                </van-collapse>
            </van-sidebar>


            <div class="goodslist">
                <div class="content">
                    <van-swipe-cell  v-for="item in showGoods" :key="item.id">
                        <van-card class="one"
                            @click="clickitem(item.id)"
                            :num="item.sales"
                            :price="item.price"
                            :title="item.title"
                            :thumb="item.cover_url"
                        />
                    </van-swipe-cell> 
                </div>
            </div>
            <back-top @backT="backT" v-show="backShow"></back-top>
       </div>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import { ref,reactive, onMounted, computed, watchEffect, nextTick } from 'vue'
    import { getCategoryData,getCategoryDataGoods } from "@/network/category";
    //引入滚动组件
    import BScroll from "better-scroll";
import BackTop from "@/components/common/backTop/BackTop.vue";
    import { useRouter } from "vue-router";

    export default {
        name:'Category',
        setup(){
            //手风琴折叠面板
            const activeName = ref('1');
            let categories = ref([])  //商品分类
            //侧边栏
            const active = ref(0);
            const activeTab = ref(2);
            let currentOrder = ref('comments_count')//排序索引
            let currentId = ref(0) //侧边导航索引

            //返回顶部
            let backShow = ref(false)

            //数据模型
            const goods = reactive({  //存储数据
                sales:{page:1,list:[]},
                price:{page:1,list:[]},
                comments_count:{page:1,list:[]}
            })
            //初始化
            let init = ()=>{
                getCategoryDataGoods('sales',currentId.value).then(res=>{
                    goods.sales.list = res.goods.data
                })
                getCategoryDataGoods('price',currentId.value).then(res=>{
                    goods.price.list = res.goods.data
                })
                getCategoryDataGoods('comments_count',currentId.value).then(res=>{
                    goods.comments_count.list = res.goods.data
                })
            }

            let bs;
            
            onMounted(()=>{
                getCategoryData().then(res=>{
                    categories.value = res.categories
                })
                init();
                //滚动
                
                    let goodslist = document.querySelector('.goodslist');
                    bs = new BScroll(goodslist, {
                        probeType: 3,
                        click: true,
                        pullUpLoad: true
                    });

                    bs.on('scroll', (position) => {
                        const one = document.querySelector('.one')
                        if(-position.y>(one.offsetHeight)*4-90){
                            backShow.value = true
                        }else{
                            backShow.value = false
                        }
                    });

                    bs.on('pullingUp',()=>{
                        const page = goods[currentOrder.value].page+1;

                        //分页数据
                        getCategoryDataGoods(goods[currentOrder.value],currentId.value,page).then(res=>{
                            goods[currentOrder.value].list.push(...res.goods.data)
                            goods[currentOrder.value].page+=1
                        })
                        
                        //完成上拉，等数据请求完成，新数据展示
                        bs.finishPullUp();
                        //重新计算高度
                        bs.refresh()
                        console.log('当前类型'+currentOrder.value+'页数'+page)
                        console.log(document.querySelector('.content').clientHeight)
                        
                    })
                
            })
            
            //排序选项卡
            const onClickTab = (index)=>{
                const orders = ['sales','price','comments_count']
                currentOrder.value = orders[index.name]

                getCategoryDataGoods(currentOrder.value,currentId.value).then(res=>{
                    goods[currentOrder.value].list = res.goods.data
                    nextTick(() => {
                        bs && bs.refresh(); // 如果需要刷新滚动区域，可以调用 refresh 方法
                    });
                })
                // //测试
                // console.log('排序类型：'+currentOrder.value)
                // console.log('分类序号：'+currentId.value)
            }
            //侧边栏选项卡
            const leftClickTab = (cid)=>{
                currentId.value = cid;
                init();
                nextTick(() => {
                    bs && bs.refresh(); // 如果需要刷新滚动区域，可以调用 refresh 方法
                });
                // //测试
                // console.log('排序类型：'+currentOrder.value)
                // console.log('分类序号：'+currentId.value)
            }
            //计算属性
            const showGoods = computed(()=>{
                return goods[currentOrder.value].list
            })
            // console.log('currentorder',currentOrder.value)
            // console.log(goods[currentOrder.value])

            // 监听任何一个变量有变化
            watchEffect(() => {
                nextTick(() => {
                    bs && bs.refresh(); // 如果需要刷新滚动区域，可以调用 refresh 方法
                });
            });
            const backT = ()=>{
                bs.scrollTo(0,0,500)
            }
            //使用路由器
            const router = useRouter()

            return { activeName,categories,activeTab,goods,
                active,onClickTab,currentOrder,leftClickTab,currentId,
                showGoods,init,backT,backShow,
                clickitem:(id)=>{
                    router.push({path:'/detail',query:{id}})
                }
            }
        },
        components:{   //添加组件
            NavBar,
            BackTop
        }
    }
</script>

<style scoped lang="scss">
#mainbox{
    display:flex;
    position: relative;
    .ordertab{
        position: absolute;
        height: 50px;
        top: 45px;
        left: 130px;
        right: 0;
        z-index: 9;
    }
    .leftmenu{
        width: 130px;
        position: absolute;
        top: 95px;
        left: 0;
    }
    .goodslist{
        flex: 1;
        position: absolute;
        top: 100px;
        left: 130px;
        right: 0;

        height: 100vh;
    }
}
</style>