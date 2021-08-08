<template>
  <div class="test">
    <span>Hello World {{ count }}</span>
    <v-chart :options="options" style="color: red;">
      helllo 111111111111111111111
    </v-chart>
  </div>
</template>

<script>
import importHTML from 'import-html-entry';
import Echarts from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';

use([CanvasRenderer, LineChart]);

export default {
  name: 'test',
  components: { 'v-chart': Echarts },
  data() {
    return {
      count: 0,
      options: {
        grid: {
          top: 0,
          bottom: 5,
          left: 0,
          right: 0
        },
        xAxis: {
          type: 'category',
          show: false,
          data: ['36:00']
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: {
          type: 'line',
          symbol: 'circle',
          symbolSize: 2,
          smooth: true,
          lineStyle: {
            width: 1,
            color: 'red'
          },
          areaStyle: {
            color: 'red',
            opacity: 0.12
          },
          data: [0]
        }
      }
    };
  },
  created() {
    importHTML('http://localhost:8082/ptoBo.html').then(res => {
      console.log(res.template);
      res.execScripts().then(exports => {
        const mobx = exports;
        const { observable } = mobx;
        observable({
          name: 'kuitos'
        });
      });
    });
  }
};
</script>
