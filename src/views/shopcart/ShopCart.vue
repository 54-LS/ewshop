<template>
    <div>
        <nav-bar>
            <template #default>购物车</template>
       </nav-bar>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    export default {
        name:'ShopCart',
        components:{   //添加组件
            NavBar
        }
    }
</script>

<style scoped>

</style>