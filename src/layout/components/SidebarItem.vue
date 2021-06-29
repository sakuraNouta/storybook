<!--
 * @Author: chenbing
 * @Date: 2020-08-06 10:32:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-29 10:52:48
-->
<template>
  <div class="sidebar-item" @click="link">
    <el-menu-item class="sidebar-item__content" :index="route.path">
      <i class="sidebar-item__icon" :class="icon"></i>
      <span slot="title" class="sidebar-item__title">{{ title }}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: 'sidebar-item',
  props: {
    route: {
      type: Object,
      required: true
    }
  },
  computed: {
    icon() {
      return this.route?.meta?.icon ?? '';
    },
    title() {
      return this.route?.meta?.title ?? '';
    }
  },
  methods: {
    /**
     * 点击相同sidebar item时, 通过reload重定向页面以刷新
     */
    link() {
      const params = { path: this.route.redirect || this.route.path };
      if (
        (this.$route.matched || [])
          .map(item => item.path)
          .includes(this.route.path)
      ) {
        this.$router.push({ name: 'reload', query: params });
        return;
      }
      this.$router.push(params);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables';

.sidebar-item {
  &__content {
    display: flex;
    align-items: center;

    &.is-active {
      width: 100%;
      background-color: $activeColor !important;
    }
  }

  &__icon {
    width: 24px;
  }
}
</style>
