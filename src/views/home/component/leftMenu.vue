<template>
  <!-- 收起按钮 -->
  <div class="toggle-button" @click="LFETMENU_CHANGE" v-if="!leftMenu_isCollapse">
    <el-icon><ArrowLeftBold /></el-icon>收起
  </div>
  <!-- 展开按钮 -->
  <div class="toggle-button" @click="LFETMENU_CHANGE" v-else>
    <el-icon><ArrowRightBold /></el-icon>展开
  </div>
  <!-- 侧边栏 -->
  <el-menu
    active-text-color="#fff"
    class="el-menu-vertical-demo"
    default-active="/charts"
    text-color="#A6ADB4"
    :collapse="leftMenu_isCollapse"
    router
  >
    <el-menu-item index="/charts">
        <el-icon><TrendCharts /></el-icon>
        <span>可视化界面</span>
    </el-menu-item>
    <el-menu-item index="/productlist">
      <el-icon><Iphone /></el-icon>
      <span>产品列表</span>
    </el-menu-item>
    <el-menu-item index="/userlist">
      <el-icon><UserFilled /></el-icon>
      <span>用户列表</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { router } from "vue-router";

import {
  TrendCharts,
  Iphone,
  ArrowRightBold,
  ArrowLeftBold,
  UserFilled
} from "@element-plus/icons-vue";
// 菜单折叠控制
let leftMenu_isCollapse = ref(true);
const LFETMENU_CHANGE = () => {
  leftMenu_isCollapse.value = !leftMenu_isCollapse.value;
};
</script>

<style lang="scss">
.toggle-button {
  text-align: center;
  background-color: #001529;
  line-height: 60px;
  color: #a6adb4;
  font-size: 14px;
  cursor: pointer;
}
.toggle-button:hover {
  background-color: #ecf5ff;
}
</style>
