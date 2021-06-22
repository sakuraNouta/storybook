<template>
  <div class="excel-like-table">
    <el-table
      :data="data"
      align="center"
      :cell-class-name="getCellClassName"
      :header-cell-class-name="getHeaderCellClassName"
      @row-click="handleRowClick"
      @header-click="handleHeaderClick"
    >
      <el-table-column
        v-for="column in columns"
        :prop="column"
        :label="column"
        :key="column"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
function resolveSelected(str) {
  const rReg = /(?<=r)\d+/;
  const cReg = /(?<=c)\d+/;
  const r = str.match(rReg);
  const c = str.match(cReg);
  return { r: r ? +r[0] : undefined, c: c ? +c[0] : undefined };
}

function resolveCellClassName(selected, rowIndex, columnIndex) {
  const { r, c } = resolveSelected(selected);
  let isSelected;
  r && (isSelected = rowIndex + 1 === r);
  c && (isSelected = columnIndex + 1 === c);
  r && c && (isSelected = rowIndex + 1 === r && columnIndex + 1 === c);
  return isSelected ? 'is-selected' : '';
}

function resolveHeaderCellClassName(selected, rowIndex, columnIndex) {
  const { c } = resolveSelected(selected);
  return c && columnIndex + 1 === c ? 'is-selected' : '';
}

export default {
  name: 'excel-like-table',
  data() {
    return {
      data: Array.from({ length: 10 }, (v, i) => ({
        a1: i,
        b1: i,
        c1: i
      })),
      columns: ['a1', 'b1', 'c1'],
      selected: ''
    };
  },
  methods: {
    getCellClassName({ rowIndex, columnIndex }) {
      const { selected } = this;
      return resolveCellClassName(selected, rowIndex, columnIndex);
    },
    getHeaderCellClassName({ rowIndex, columnIndex }) {
      const { selected } = this;
      return resolveHeaderCellClassName(selected, rowIndex, columnIndex);
    },
    handleRowClick(row) {
      const { a1 } = row;
      this.selected = `r${this.data.findIndex(e => e.a1 === a1) + 1}`;
    },
    handleHeaderClick(column) {
      const { property } = column;
      this.selected = `c${this.columns.indexOf(property) + 1}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.excel-like-table {
  padding: 10px;

  ::v-deep {
    th.is-selected {
      background-color: #a9b2ca;
    }
    .el-table__row {
      td.is-selected {
        background-color: #a9b2ca;
      }
    }
  }
}
</style>
