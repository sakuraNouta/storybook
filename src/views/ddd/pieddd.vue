<template>
  <div class="test">
    <div id="test"></div>
  </div>
</template>

<script>
import pie from './render';

export default {
  name: 'test',
  async created() {
    await this.$nextTick();
    pie('#test');
  }
};
</script>

<style lang="scss" scoped>
.test {
}
</style>
