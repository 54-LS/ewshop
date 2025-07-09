<template>
    <div>
        <nav-bar>
            <template #default>商品分类</template>
       </nav-bar>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    export default {
        name:'Category',
        components:{   //添加组件
            NavBar
        }
    }
</script>

<style scoped>

</style>