<template>
  <div class="digital">
    <dv-digital-flop
      :config="config"
      style="width: 200px; height: 50px;"
    ></dv-digital-flop>
    <el-button @click="handleClick">click</el-button>
  </div>
</template>

<script>
export default {
  name: 'digital',
  data() {
    return {
      config: {
        number: [100],
        content: '{nt}个'
      }
    };
  },
  methods: {
    handleClick() {
      this.config = {
        number: [Math.round(Math.random() * 1000)],
        content: '{nt}个'
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.digital {
}
</style>
