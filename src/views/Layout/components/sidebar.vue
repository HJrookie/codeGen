<template>
  <div class="sidebar" :class="{ collapsed: collapsed }">
    <div class="title">default title</div>

    <el-menu default-active="codeGen" router class="el-menu-vertical-demo" :collapse="collapsed" @open="handleOpen" @close="handleClose">
      <el-menu-item index="codeGen">
        <el-icon><svg-icon name="code"></svg-icon></el-icon>
        <template #title>codeGen</template>
      </el-menu-item>
      <el-menu-item index="exams">
        <el-icon><svg-icon name="example"> </svg-icon></el-icon>

        <template #title>exams</template>
      </el-menu-item>
      <el-menu-item index="editable">
        <el-icon><setting /></el-icon>
        <template #title>editable</template>
      </el-menu-item>

      <el-menu-item index="test">
        <el-icon><svg-icon name="bug"> </svg-icon></el-icon>
        <template #title>test-code-gen</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Document, Menu as IconMenu, Location, Setting } from "@element-plus/icons-vue";
import useAppStore from "@/store/app";
import { storeToRefs } from "pinia";
const store = useAppStore();
const { collapsed } = storeToRefs(store);
// const isCollapse = ref(true);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const dddddddd = () => {
  console.log(4444444);
};
</script>
<style lang="scss" scoped>
.sidebar {
  //background: gray;
  position: fixed;
  border-right: 1px solid #dfd7d7;
  height: 100%;
  width: 240px;
  transition: all linear 0.5s;
  .title {
    height: 60px;
    text-align: center;
    line-height: 60px;
  }
  &.collapsed {
    width: 64px;
    .title {
      opacity: 0;
    }
  }
}
</style>
