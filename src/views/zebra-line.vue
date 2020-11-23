<template>
  <div class="zebra">
    <div class="zebra__background"></div>
  </div>
</template>

<script>
export default {
  name: 'zebra'
};
</script>

<style lang="scss" scoped>
.zebra {
  &__background {
    height: 400px;
    width: 400px;
    background: linear-gradient(
      135deg,
      #f56c6c 25%,
      #01b035 0,
      #01b035 50%,
      #f56c6c 0,
      #f56c6c 75%,
      #01b035 0
    );
    background-size: 20px 20px;
  }
}
</style>
