<template>
  <div class="portal-vue-demo">
    <div class="header">
      <div>标题:</div>
      <portal-target name="title" multiple></portal-target>
    </div>
    <div class="main">
      <div class="content">main:</div>
      <div v-for="(title, name, index) in titles" :key="title.value">
        <portal to="title" :disabled="!title.enable" :order="index + 1">
          {{ title.value }}
        </portal>
        <el-button @click="title.enable = !title.enable">
          {{ title.value }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const titles = Array.from({ length: 3 }, (v, i) => ({
      [`title${i + 1}`]: {
        value: `title${i + 1}`,
        enable: true
      }
    })).reduce((acc, item) => ({ ...acc, ...item }), {});
    return {
      titles
    };
  }
};
</script>

<style>
.portal-vue-demo {
  height: 100%;
}
.header {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main {
  height: calc(100% - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
