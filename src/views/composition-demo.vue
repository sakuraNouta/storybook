<template>
  <div class="composition-demo">
    <div>{{ name }}: {{ age }}</div>
    <button @click="handleClick">++</button>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from '@vue/composition-api';

export default {
  name: 'composition-demo',
  props: {
    msg: String
  },
  setup() {
    window.v = {
      ref,
      reactive,
      toRefs
    };
    const obj = reactive({
      name: 'jack',
      age: 20
    });
    const handleClick = () => {
      obj.age++;
    };
    return {
      ...toRefs(obj),
      handleClick
    };
  }
};
</script>

<style lang="scss" scoped>
.composition-demo {
}
</style>
