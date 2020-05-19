<template>
  <dynamic-form :dsl.sync="dsl"></dynamic-form>
</template>

<script>
import dsl from './dsl/test';

import DynamicForm from './index';

export default {
  components: { DynamicForm },

  data() {
    return {
      dsl
    };
  }
};
</script>
