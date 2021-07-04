<!--
 * @Author: chenbing
 * @Date: 2020-08-06 10:32:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-30 11:38:38
-->
<template>
  <div class="layout">
    <div class="sidebar-container" :class="{ 'is-collapse': isCollapse }">
      <div class="sidebar__title-container">
        <transition name="fade">
          <span v-show="!isCollapse" class="sidebar__title">Rapunzel</span>
        </transition>
      </div>
      <el-scrollbar wrap-class="sidebar__wrapper">
        <el-menu
          class="sidebar__menu"
          :default-active="currentRoute"
          :collapse="isCollapse"
          :collapse-transition="false"
          :background-color="variables.sidebarMenuBackgroundColor"
          :text-color="variables.sidebarMenuTextColor"
          :active-text-color="variables.sidebarMenuActiveTextColor"
        >
          <sidebar-item
            v-for="route in routes"
            :key="route.path"
            :route="route"
          ></sidebar-item>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="main-container">
      <component :is="navbar"></component>
      <div class="app-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import variables from '@/assets/styles/variables.scss';
import SidebarItem from './components/SidebarItem';
import Navbar from './components/Navbar';
import { routes } from '../router/index';

export default {
  name: 'Layout',
  props: {
    // 可传入定制navbar名称作为动态组件渲染navbar, 需要提前注册
    navbar: {
      type: String,
      default: () => 'Navbar'
    }
  },
  components: {
    SidebarItem,
    Navbar
  },
  computed: {
    variables() {
      return variables;
    },
    routes() {
      // return (this.$store.state.routes ?? []).filter(
      //   route => !(route?.meta?.hidden || route?.meta?.single)
      // );
      return routes[0].children.filter(item => item.meta?.title);
    },
    /**
     * 向上查找路由中有侧边栏信息的项
     */
    currentRoute() {
      console.log('currentRoute -> this.$route', this.$route);
      return [...this.$route.matched].reverse().find(item => item.meta?.title)
        ?.path;
    },
    isCollapse() {
      return this.$store.state.isCollapse;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables';

.layout {
  display: flex;
  height: 100vh;
  width: 100%;

  .sidebar-container {
    width: $sidebar-width;
    height: 100%;
    background-color: $color-sidebar;
    transition: width $layout-transition-duration;

    &.is-collapse {
      width: $sidebar-collapse-width;
    }
  }

  ::v-deep .el-scrollbar {
    height: calc(100% - #{$sidebar-title-height});
    &__wrap {
      overflow-x: hidden;
    }
  }

  .sidebar {
    &__title-container {
      height: $sidebar-title-height;
      line-height: $sidebar-title-height;
      padding-left: 20px;
    }
    &__title {
      color: white;
      font-size: 14px;
    }
    &__menu {
      width: 100%;
      transition: width $layout-transition-duration;
    }
  }

  .main-container {
    width: calc(100% - #{$sidebar-width});
    transition: width $layout-transition-duration;
  }

  .app-main {
    height: calc(100% - #{$navbar-height});
  }

  .is-collapse + .main-container {
    width: calc(100% - #{$sidebar-collapse-width});
  }
}
.sidebar-item {
  width: $sidebar-width;
}

/* fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
