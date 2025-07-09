<template>
    <div class="tab-control">
        <div v-for="(items,index) in titles" :key="index"
        @click="itemClick(index)"
        class="tab-control-item" :class="{active:index==currentIndex}">
            <span>{{ items }}</span>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue'
    export default {
        name:'TabControl',
        props:{
            titles:{
                type:Array,
                default(){
                    return [];
                }
            }
        },
        setup(props,{emit}){  //{emit}传给父组件
            let currentIndex = ref(0);

            const itemClick = (index)=>{
                currentIndex.value = index;
                emit('tabClick',index)  //传给父组件的方法tabClick
            }
            return {
                currentIndex,itemClick
            }
        }
    }
</script>

<style scoped lang="scss">
    .tab-control{
        display: flex;
        height: 40px;
        width: 100%;
        font-size: 14px;
        text-align: center;
        line-height: 40px;
        background-color: #fff;
        position: sticky;
        top: 44px;
        z-index: 6;
        .tab-control-item{
            flex: 1;
        }
        .active{
            color: var(--color-tint);
            span{
                border-bottom: 3px solid var(--color-tint);
            }  
        }
    }
</style>