<template>
  <div class="monaco-raw">
    <div id="container"></div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor';

export default {
  name: 'monaco-raw',
  async created() {
    await this.$nextTick();
    monaco.editor.create(document.getElementById('container'), {
      value: `{
        "a": 1,
        "b": 2
      }`,
      language: 'json'
    });
  }
};
</script>

<style lang="scss" scoped>
#container {
  height: 100%;
}
.monaco-raw {
  height: 100%;
}
</style>
