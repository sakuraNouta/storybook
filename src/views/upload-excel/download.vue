<template>
  <div class="download">
    <span @click="download">download</span>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'download',
  methods: {
    download() {
      axios.get('http://localhost/file', {
        onDownloadProgress(processEvent) {
          console.log(processEvent);
          console.log(
            parseInt((processEvent.loaded * 100) / processEvent.total) + '%'
          );
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.download {
}
</style>
