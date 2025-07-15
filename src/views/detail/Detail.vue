<template>
    <div class="detail">
        <nav-bar>
            <template #default>图书详情:{{ id }}</template>
       </nav-bar> 
       <van-image width="100%" :src="goods.cover_url"/>
       <div class="content">
            <van-card style="text-align: left;"
            :num="goods.stock"
            :price="goods.price"
            :desc="goods.description"
            :title="goods.title"
            >
            <template #tags>
                <van-tag plain type="danger">新书</van-tag>
                <van-tag plain type="danger">推荐</van-tag>
            </template>
            <template #footer>
                <van-button style="border-radius: 3px;" square type="warning">加入购物车</van-button>
                <van-button style="border-radius: 3px;" square type="danger">立即购买</van-button>
            </template>
            </van-card>
       </div>

       <van-tabs v-model:active="active">
        <van-tab title="概述">
            <div class="good-content" v-html="goods.details"></div>
        </van-tab>
        <van-tab title="热评">{{ goods.comments }}</van-tab>
        <van-tab title="相关图书">
            <goods-list :goods="showGoods"></goods-list>
        </van-tab>
       </van-tabs>
       
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    //引入路由
    import { useRoute } from "vue-router";
    import { onMounted, ref,reactive,toRefs,computed } from 'vue'
    //获取数据
    import { getDetailData } from "@/network/detail";

    export default {
        name:'Detail',
        components:{   //添加组件
            NavBar
        },
        setup() {
            const route = useRoute();
            let id = ref(0);
            id.value = route.query.id
            //数据模型
            let goodDetail = reactive({
                goods:{},
                like_goods:{}
            })
            onMounted(()=>{
                getDetailData(id.value).then(res=>{
                    goodDetail.goods = res.goods
                    goodDetail.like_goods = res.like_goods
                })
            })

            //计算属性,相关商品
            const showGoods = computed(() => {
                return goodDetail.like_goods
            })

            console.log('good_detail:',goodDetail)
            return {
                id,...toRefs(goodDetail),showGoods
            }
        }
    }
</script>

<style scoped>

</style>