<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-button type="primary" @click="openDialog">dialog</el-button>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    openDialog() {
      this.$dialog.info({ content: '消息提示', duration: 2 });
    }
  }
};
</script>
