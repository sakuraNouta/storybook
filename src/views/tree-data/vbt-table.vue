<template>
  <div class="wrap">
    <vbt-table
      border
      stripe
      row-key="id"
      size="mini"
      isBigData
      isTreeTable
      show-summary
      highlight-hover-row
      max-height="600"
      :data="data"
      default-expand-all
    >
      <vbt-table-column
        v-for="item in tableHeader"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        show-overflow-tooltip
        expanded
      ></vbt-table-column>
    </vbt-table>
  </div>
</template>

<script>
import { vbtTable, vbtTableColumn } from 'vbt-table';
import data from './data';

export default {
  components: { vbtTable, vbtTableColumn },

  data() {
    return {
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
