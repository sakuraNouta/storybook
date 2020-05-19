<template>
  <div class="excel-upload">
    <input
      ref="excel-upload-input"
      class="excel-upload__input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleUpload"
    />
    <el-button
      :loading="loading"
      size="mini"
      type="primary"
      @click="handleClick"
    >
      Browse
    </el-button>
  </div>
</template>

<script>
import XLSX from 'xlsx';

export default {
  props: {
    beforeUpload: Function,
    onSuccess: Function
  },
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null
      }
    };
  },
  methods: {
    handleClick() {
      this.$refs['excel-upload-input'].click();
    },
    handleUpload(e) {
      const files = e.target.files;
      const rawFile = files[0];
      if (!rawFile) return;
      if (!this.isExcel(rawFile)) {
        this.$message.error(
          'Only supports upload .xlsx, .xls, .csv suffix files'
        );
        return false;
      }
      this.upload(rawFile);
    },
    upload(rawFile) {
      this.$refs['excel-upload-input'].value = null; // defense select the same excel
      if (!this.beforeUpload) {
        this.readerData(rawFile);
        return;
      }
      const before = this.beforeUpload(rawFile);
      if (before) {
        this.readerData(rawFile);
      }
    },
    readerData(rawFile) {
      this.loading = true;
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          console.log(workbook.Sheets);
          const worksheet = workbook.Sheets[firstSheetName];
          const header = this.getHeaderRow(worksheet);
          const results = XLSX.utils.sheet_to_json(worksheet);
          this.generateDate({ header, results });
          this.loading = false;
          resolve();
        };
        reader.readAsArrayBuffer(rawFile);
      });
    },
    getHeaderRow(sheet) {
      const headers = [];
      const range = XLSX.utils.decode_range(sheet['!ref']);
      let C;
      const R = range.s.r;
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C; // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
      return headers;
    },
    generateDate({ header, results }) {
      this.excelData.header = header;
      this.excelData.results = results;
      this.onSuccess && this.onSuccess(this.excelData);
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name);
    }
  }
};
</script>

<style lang="scss" scoped>
.excel-upload {
  &__input {
    display: none;
  }
}
</style>
