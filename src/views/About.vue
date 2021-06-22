<template>
  <div class="about">
    <h1>This is an about page</h1>
    <span>{{ dataObj && dataObj.text }}</span>
    <br />
    <button @click="onClick">click</button>
    <button @click="onClick2">click2</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataObj: {},
      $a: 1
    };
  },
  created() {
    console.log('about created');
  },
  methods: {
    onClick() {
      // this.$set(this.dataObj, 'text', 'a text');
      this.dataObj = { text: 'a text' };

      // 1. 直接赋值
      // this.foo.bar.a = 'change a';
      // this.foo.bar.b = 'bbbbbb';
      // this.foo.bar.c = 'cccc';

      // 2. 更新对象, Object.assign({}, this.foo, {}) 也是一样的
      // this.foo.bar = { ...this.foo.bar, b: 'bbbb', c: 'cccccccc' };
      // this.foo = {
      //   ...this.foo,
      //   bar: { b: 'bbbb', c: 'cccccccc' }
      // };
    },
    onClick2() {
      console.log(this.$a);
      this.dataObj.text = 'new Text' + +new Date();
    }
  }
};
</script>
