<template>
    <div class="goods">
        <GoodsListItem v-for="item in goods" :key="item" :product="item"></GoodsListItem>
    </div>
</template>

<script>
    import GoodsListItem from './GoodsListItem.vue';
    export default {
        name:'GoodsList',
        props:{
            goods:{
                type:Array,
                default() {
                    return [];
                }
            }
        },
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