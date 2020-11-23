<template>
  <div class="test">
    <span>Hello World {{ count }}</span>
    <el-button @click="add">++</el-button>
  </div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      a: 1,
      b: 2,
      c: 3
    };
  },
  computed: {
    count: {
      get() {
        const { a, b, c } = this;
        return { a, b, c };
      },
      set: {
        handler(count) {
          console.log(count);
        },
        deep: true
      }
    }
  },
  methods: {
    add() {
      this.a += 1;
      // this.count = this.count;
      this.count.a = this.a;
    }
  }
};
</script>
