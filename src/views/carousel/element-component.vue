<template>
  <div class="element-component">
    <ul v-for="item in schema" :key="item.k">
      <li>{{ item.v }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'element-component',
  data() {
    return {
      schema: Array.from({ length: 10 }, (v, i) => ({
        k: i + 1,
        v: i + 1
      }))
    };
  }
};
</script>

<style lang="scss" scoped>
.element-component {
}
</style>
