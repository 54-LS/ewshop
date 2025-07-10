<template>
    <div class="backTop" @click="backT"></div>
</template>

<script>
    export default {
        name:'BackTop',
        setup(props,{emit}) {
            
            return { 
                backT:()=>{
                    emit('backT')
                }
             }
        }
    }
</script>

<style scoped>
    .backTop{
        height: 30px;
        width: 30px;
        position: fixed;
        bottom: 80px;
        right: 30px;
        border: #D82008 2px solid;
        z-index: 20;
        border-radius: 50%;
        box-shadow: 3px 3px 3px #888;
        background: #fcfcfc url('~assets/images/up.png') no-repeat center center;
    }
</style>