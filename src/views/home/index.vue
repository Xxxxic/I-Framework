<template>
  <div class="home">
    <div class="common-layout">
    <el-container>
      <el-aside width="auto"><lm/></el-aside>
      <el-container>
        <el-header><tm/></el-header>
        <el-main>
            <div>
              <!-- 默认情况下app已经有路由出口 -->
              <!-- 二级路由的出口需要自己创建 -->
              <router-view></router-view>
            </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
  </div>
</template>

<script setup>
import lm from "./component/leftMenu.vue"
import tm from './component/topMenu.vue'
</script>

<style lang="scss">
.el-container,.common-layout,.home{ 
    // background-color:#fff;
    height: 100%;  
    } 
html,body,#app{
    //设置页面100%高
    height:100%;
    margin: 0px;
    padding: 0px;
    }
.el-header{
  background-color: #fff;
  color: #1e2a69;
  text-align: left;
  line-height: 60px;
  font-size: 14px;
}
.el-aside,
.el-menu{
  background-color: #001529;
  line-height: 10px;
}

.el-main {
  background-color: #F0F2F5;  
  text-align: center; 
  line-height: 160px;
}
</style>
