<template>
    <div>
        <nav-bar>
            <template #default>个人中心</template>
       </nav-bar>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    export default {
        name:'Profile',
        components:{   //添加组件
            NavBar
        }
    }
</script>

<style scoped>

</style>