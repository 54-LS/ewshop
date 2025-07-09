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
        flex: 1;
    }
</style>