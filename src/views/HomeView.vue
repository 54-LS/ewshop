<template>
  <div class="home">
    {{banner}}
  </div>
</template>

<script>
import {onMounted,ref} from 'vue';
import { getHomeAllData } from 'network/home';

export default {
  name: 'HomeView',
  
  setup(){

    const banner = ref([])

    onMounted(()=>{
      getHomeAllData().then(res=>{
        
        banner.value = res.slides;

      }).catch((err)=>{

      })

    })

    return {
      banner
    }
  },

  components: {

  }
}
</script>

<style>
  .demo1{
    color: var(--color-high-text);
  }
</style>
