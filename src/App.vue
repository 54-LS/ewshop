<template>
  
  <!-- <router-view/> -->
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>



  <div id="nav">
    <router-link class="tab-bar-item" to="/">
      <div class="icon"><i class="iconfont icon-shouye"></i></div>
      <div>首页</div>
    </router-link> 
    <router-link class="tab-bar-item" to="/category">
      <div class="icon"><i class="iconfont icon-sort"></i></div>
      <div>分类</div>
    </router-link>
    <router-link class="tab-bar-item" to="/shopcart">
      <van-badge :content="2" max="9" :offset="['4px','3px']">
        <div class="icon"><i class="iconfont icon-gouwuche"></i></div>
      </van-badge>
      <div>购物车</div>
    </router-link>
    <router-link class="tab-bar-item" to="/profile">
      <div class="icon"><i class="iconfont icon-touxiang"></i></div>
      <div>我的</div>
    </router-link>
  </div>
</template>

<style lang="scss">
  @import "assets/css/base.css";
  // 引入图标
  @import "assets/css/iconfont.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  --font-color:#666;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  --color-tint:#42b983;
}

#nav {
  background-color: #f6f6f6;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -2px 1px rgba(100,100,100,0.2);

  a {
    color: var(--font-color);

    &.router-link-exact-active {
      color: var(--color-tint);
    }
  }

  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 50px;
    font-size: 16px;
  }
  .tab-bar-item .icon{
    height: 24px;
    width: 24px;
    margin-top: 5px;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
