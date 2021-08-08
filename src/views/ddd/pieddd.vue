<template>
  <div class="pieddd">
    <div id="pieddd"></div>
  </div>
</template>

<script>
import pie from './render';

export default {
  name: 'pieddd',
  async created() {
    await this.$nextTick();
    pie('#pieddd');
  }
};
</script>

<style lang="scss" scoped>
.pieddd {
}
</style>
