<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-button type="primary" @click="openDialog">dialog</el-button>
    <el-button @click="changeTheme">changeTheme</el-button>
    <el-button v-copy="copyText">copy</el-button>
    <about></about>
  </div>
</template>

<script>
import { Random } from 'mockjs';
import About from './About.vue';

export default {
  components: { About },
  name: 'home',
  data() {
    return {
      copyText: 'copyText'
    };
  },
  methods: {
    changeTheme() {
      this.$store.dispatch('theme/changeTheme', { primary: Random.color() });
    },
    openDialog() {
      this.$dialog.info({ content: '消息提示', duration: 2 });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin: 10px 0;
  }
}
</style>
