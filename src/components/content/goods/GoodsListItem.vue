<template>
    <div class="goods-item">
        <img :src="product.cover_url">
        <span class="bookname">{{ product.title }}</span>
        <div>
            <span class="price"><small>￥</small>{{ product.price }}</span>
            <span class="collect">{{ product.collects_count }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name:'GoodsListItem',
        props:{
            product:{
                type:Object,
                default() {
                    return {};
                }
            }
        }
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