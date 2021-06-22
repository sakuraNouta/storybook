<template>
  <div class="tree-table">
    <el-button @click="show = !show">show</el-button>
    <el-table
      v-if="show"
      :data="data"
      default-expand-all
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        v-for="item in tableHeader"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import data from './data';

export default {
  name: 'tree-table',
  data() {
    return {
      show: false,
      data,
      tableHeader: [
        {
          prop: 'title',
          class: 'tree-table__title-row',
          label: 'tree',
          width: 300
        },
        {
          prop: 'arguments',
          label: 'arguments',
          width: 150,
          attr: {
            showOverflowTooltip: true
          }
        },
        {
          prop: 'begin',
          label: 'begin',
          width: 100,
          attr: {
            showOverflowTooltip: true
          }
        },
        {
          prop: 'gap',
          label: 'gap',
          width: 100
        },
        {
          prop: 'elapsedTime',
          label: 'elapsedTime',
          width: 100
        },
        {
          prop: 'elapsedTimePercent',
          label: 'elapsedTimePercent',
          width: 150
        },
        {
          prop: 'executionMilliseconds',
          label: 'executionMilliseconds',
          width: 140
        },
        {
          prop: 'simpleClassName',
          label: 'simpleClassName',
          width: 120,
          attr: {
            showOverflowTooltip: true
          }
        },
        {
          prop: 'apiType',
          label: 'apiType',
          width: 160,
          attr: {
            showOverflowTooltip: true
          }
        },
        {
          prop: 'agent',
          label: 'agent',
          width: 200,
          attr: {
            showOverflowTooltip: true
          }
        },
        {
          prop: 'applicationName',
          label: 'applicationName',
          width: 200,
          attr: {
            showOverflowTooltip: true
          }
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.tree-table {
  height: 100%;
  ::v-deep {
    .el-table {
      height: 100%;
      &__body-wrapper {
        height: calc(100% - 50px);
        overflow-y: auto;
      }
    }
  }
}
</style>
