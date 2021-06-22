<template>
  <div class="ace-editor-demo">
    <ace-editor
      height="650"
      width="100%"
      ref="editor"
      :content="content"
      v-model="content"
      lang="javascript"
      theme="chrome"
      @init="editorInit"
    ></ace-editor>
  </div>
</template>

<script>
import AceEditor from 'vue2-ace-editor';

export default {
  name: 'ace-editor-demo',
  components: { AceEditor },
  data() {
    return {
      content: ''
    };
  },
  methods: {
    editorInit() {
      require('brace/ext/language_tools'); //language extension prerequsite...
      // require('brace/mode/html');
      require('brace/mode/javascript'); //language
      // require('brace/mode/less');
      // require('brace/mode/json');
      require('brace/theme/chrome');
      require('brace/snippets/javascript'); //snippet
      // require('brace/snippets/json');
    }
  }
};
</script>

<style lang="scss" scoped>
.ace-editor-demo {
}
</style>
