<template>
  <div class="quill-editor">
    <div id="editor">
      <h1>Quill</h1>
      <p>
        Quill is a modern rich text editor built for compatibility and
        extensibility.
      </p>
    </div>
  </div>
</template>

<script>
import Quill from 'quill';

export default {
  name: 'quill-editor',
  mounted() {
    new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: [
          // 默认的
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'link'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean'],
          // 图片
          ['image']
        ],
        history: {
          delay: 2000, // 2s记录一次操作历史
          maxStack: 200 // 最大记录200次操作历史
        }
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import '~quill/dist/quill.snow.css';
// @import '~quill/dist/quill.bubble.css';

.quill-editor {
}
</style>
