<template>
  <div class="monaco-editor-demo">
    <monaco-editor
      class="editor"
      v-model="code"
      language="javascript"
    ></monaco-editor>
  </div>
</template>

<script>
import MonacoEditor from 'vue-monaco';

export default {
  name: 'monaco-editor-demo',
  components: { MonacoEditor },
  data() {
    return {
      code: 'const noop = () => {}'
    };
  }
};
</script>

<style lang="scss" scoped>
.editor {
  width: 600px;
  height: 800px;
}
</style>
