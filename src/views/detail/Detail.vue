<template>
    <div>
        <nav-bar>
            <template #default>图书详情:{{ id }}</template>
       </nav-bar> 
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    //引入路由
    import { useRoute } from "vue-router";
    import { ref } from 'vue'

    export default {
        name:'Detail',
        components:{   //添加组件
            NavBar
        },
        setup() {
            const route = useRoute();
            let id = ref(0);
            id.value = route.query.id

            return {
                id
            }
        }
    }
</script>

<style scoped>

</style>