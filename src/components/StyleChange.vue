<template>
  <div :data-theme="theme">
    <div class="style-test"></div>
    <span class="style-test__font">字体大小</span>
    <br />
    <button @click="change">change</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curTheme: 'red'
    };
  },
  computed: {
    theme() {
      return `${this.curTheme}-theme`;
    }
  },
  methods: {
    change() {
      console.log('=========> change style');
      this.curTheme = this.curTheme === 'red' ? 'default' : 'red';
    }
  }
};
</script>

<style lang="scss">
@import '~@/styles/index';

.style-test {
  width: 100px;
  height: 100px;
  @include base-background();

  &__font {
    @include base-font();
  }
}
</style>
