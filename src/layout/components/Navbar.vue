<template>
  <div class="navbar">
    <div class="navbar__prefix">
      <div class="navbar__hamburger" @click="toggleSideBar">
        <i v-show="!isCollapse" class="el-icon el-icon-s-fold"></i>
        <i v-show="isCollapse" class="el-icon el-icon-s-unfold"></i>
      </div>
      <slot name="prefix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            class="navbar__breadcrumb-item"
            v-for="item in breadcrumn"
            :key="item.name"
          >
            <span
              :class="{ clickable: !lastOfUs(item) }"
              @click="handleLink(item)"
            >
              {{ item.meta.breadcrumb || item.meta.title }}
            </span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </slot>
    </div>
    <slot name="suffix"></slot>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      isCollapse: false
    };
  },
  computed: {
    breadcrumn() {
      console.log('breadcrumn -> this.$route.matched', this.$route.matched);
      return this.$route.matched.filter(
        route => route.meta && (route.meta.breadcrumb || route.meta.title)
      );
    }
  },
  methods: {
    toggleSideBar() {
      this.isCollapse = !this.isCollapse;
      console.log('toggleSideBar -> isCollapse', this.isCollapse);
      this.$store.dispatch('toggleSideBar');
    },
    lastOfUs(item) {
      return this.breadcrumn.indexOf(item) === this.breadcrumn.length - 1;
    },
    handleLink(item) {
      if (this.lastOfUs(item)) return;
      const { path } = item;
      this.$router.push(path);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables';

.navbar {
  height: $navbar-height;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $navbar-padding;
  border: $navbar-border;

  &__prefix {
    display: flex;
    align-items: center;
  }

  &__hamburger {
    padding: 0 10px;
  }

  &__breadcrumb-item {
    ::v-deep .el-breadcrumb__inner.is-link {
      font-weight: normal;
    }
  }

  .clickable {
    cursor: pointer;
  }
}
</style>
