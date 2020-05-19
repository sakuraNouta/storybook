<template>
  <div>
    <h1>upload excel</h1>
    <upload-excel :on-success="handleSuccess"></upload-excel>
    <ol v-for="(result, i) in results" :key="i">
      <li v-for="(v, k) in result" :key="k">{{ k }} : {{ v }}</li>
    </ol>
  </div>
</template>

<script>
import UploadExcel from '../components/UploadExcel';

export default {
  components: { UploadExcel },
  data() {
    return {
      results: []
    };
  },
  methods: {
    handleSuccess({ header, results }) {
      console.log('header ======> ', header);
      console.log('results ======> ', results);
      this.results = results;
    }
  }
};
</script>
