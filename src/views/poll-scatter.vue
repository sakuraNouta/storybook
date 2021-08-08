<template>
  <div class="poll-scatter">
    poll-scatter
    <div id="chart1">
      <v-chart ref="vChart" :option="options"></v-chart>
    </div>
    <div id="chart2">
      <v-chart
        ref="vChart2"
        :option="options2"
        @brushEnd="handleBrushEnd"
        @brushSelected="handleBrushSelected"
      ></v-chart>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import _ from 'lodash';
import Echarts from 'vue-echarts';
import { use } from 'echarts/core';

import { CanvasRenderer } from 'echarts/renderers';
import { ScatterChart, EffectScatterChart } from 'echarts/charts';
import {
  DataZoomComponent,
  BrushComponent,
  MarkAreaComponent,
  MarkPointComponent,
  MarkLineComponent,
  LegendComponent,
  LegendScrollComponent,
  TitleComponent,
  VisualMapComponent,
  SingleAxisComponent,
  TooltipComponent,
  ToolboxComponent
} from 'echarts/components';

use([
  CanvasRenderer,
  ScatterChart,
  EffectScatterChart,
  DataZoomComponent,
  BrushComponent,
  MarkAreaComponent,
  MarkPointComponent,
  MarkLineComponent,
  LegendComponent,
  LegendScrollComponent,
  TitleComponent,
  VisualMapComponent,
  SingleAxisComponent,
  TooltipComponent,
  ToolboxComponent
]);

async function pollExecute(target, fetchData) {
  const from = moment().subtract(500, 'h').unix();
  let to = moment().unix();
  while (from < to) {
    const { data, to: _to } = await fetchData(to);
    target(data);
    to = _to;
  }
}

function pollDataSource(to) {
  const mock = () =>
    Array.from({ length: 2400 }, (v, i) => ({
      t: moment.unix(to).subtract(i, 'm').unix(),
      v: Math.floor(Math.random() * 80)
    }))
      .reverse()
      .reduce((acc, item) => {
        acc.push([item.t, item.v]);
        return acc;
      }, []);

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        to: moment.unix(to).subtract(40, 'h').unix(),
        data: [
          { name: '成功', data: mock() },
          { name: '错误', data: mock() }
        ]
      });
    }, 1000);
  });
}

const options = {
  title: {
    top: 10,
    textStyle: {
      fontSize: 15,
      fontWeight: 700,
      fontFamily: 'PingFangSC-Bold'
    }
  },
  grid: {
    left: 0,
    right: 20,
    bottom: 10,
    containLabel: true,
    show: true,
    borderColor: '#F0F0F0'
  },
  tooltip: {
    show: true,
    showContent: false,
    axisPointer: {
      type: 'cross',
      label: {
        formatter: params => {
          if (params.axisDimension === 'x') {
            return moment.unix(params.value).format('HH:mm');
          }
          if (params.axisDimension === 'y') {
            return _.round(params.value, 2);
          }
          return params.value;
        },
        backgroundColor: '#333'
      }
    }
  },
  xAxis: {
    type: 'time',
    min: moment().subtract(500, 'h').unix(),
    max: moment().unix(),
    axisTick: { show: false },
    boundaryGap: true,
    axisLabel: {
      color: 'black',
      formatter: v => moment.unix(v).format('MM:DD HH:mm')
    },
    axisLine: {
      onZero: false,
      lineStyle: {
        color: '#F0F0F0'
      }
    }
  },
  yAxis: {
    type: 'value',
    nameTextStyle: {
      color: '#abacb2'
    },
    nameGap: 10,
    axisLine: {
      lineStyle: {
        color: '#F0F0F0'
      }
    },
    axisTick: {
      show: false
    },
    min: 0,
    max: 120,
    splitNumber: 4,
    splitLine: {
      show: true,
      lineStyle: {
        type: 'solid',
        color: '#F0F0F0'
      }
    },
    axisLabel: {
      color: '#ABACB2'
    }
  },
  brush: {
    xAxisIndex: 'all',
    brushLink: 'all',
    throttleType: 'debounce',
    throttleDelay: 1000,
    outOfBrush: {
      colorAlpha: 0.1
    }
  },
  toolbox: {
    show: false
  },
  series: [
    {
      type: 'scatter',
      symbolSize: 3,
      name: '成功',
      progressive: 0,
      large: true,
      silent: true
    },
    {
      type: 'scatter',
      symbolSize: 3,
      name: '错误',
      progressive: 0,
      large: true,
      silent: true
    }
  ]
};

export default {
  name: 'poll-scatter',
  components: { 'v-chart': Echarts },
  data() {
    return {
      chart: undefined,
      options,
      options2: _.merge({}, options, {
        backgroundColor: 'transparent',
        grid: { show: false },
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        }
      })
    };
  },
  mounted() {
    this.poll();
  },
  watch: {
    options: function () {}
  },
  methods: {
    handleBrushSelected(params) {
      console.log('handleBrushSelected -> params', params);
    },
    handleBrushEnd(params) {
      console.log('handleBrushEnd -> params', params);
      const vChart = this.$refs.vChart2;

      vChart.dispatchAction({
        type: 'brush',
        areas: []
      });
    },
    poll() {
      pollExecute(data => {
        this.options.series = Object.freeze(
          this.options.series.map(item => ({
            ...item,
            data: [
              ...(item.data || []),
              ...data.find(e => e.name === item.name).data
            ]
          }))
        );

        this.$refs.vChart2.dispatchAction({
          type: 'takeGlobalCursor',
          key: 'brush',
          brushOption: {
            brushType: 'rect',
            brushMode: 'single'
          }
        });
      }, pollDataSource);
    }
  }
};
</script>

<style lang="scss" scoped>
.poll-scatter {
  width: 800px;
  height: 600px;
  padding: 20px;

  #chart1 {
    width: 600px;
    height: 400px;
  }
  #chart2 {
    width: 600px;
    height: 400px;
    margin-top: -400px;
  }
}
</style>
