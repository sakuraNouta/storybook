<template>
  <div class="poll-scatter">
    poll-scatter
    <v-chart
      id="chart1"
      ref="vChart"
      :options="options"
      @brushEnd="handleBrushEnd"
      @brushSelected="handleBrushSelected"
    ></v-chart>
    <v-chart
      id="chart2"
      ref="vChart2"
      :options="options2"
      @brushEnd="handleBrushEnd"
      @brushSelected="handleBrushSelected"
    ></v-chart>
  </div>
</template>

<script>
import moment from 'moment';
// import echarts from 'echarts';
import Echarts from 'vue-echarts';
import _ from 'lodash';

import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/heatmap';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/effectScatter';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/brush';
import 'echarts/lib/component/markArea';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/legendScroll';
import 'echarts/lib/component/title';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/singleAxis';
import 'echarts/lib/component/tooltip';

async function pollExecute(target, fetchData) {
  const from = moment().subtract(500, 'h').unix();
  let to = moment().unix();
  while (from < to) {
    // 迭代请求, 必须串行
    // eslint-disable-next-line no-await-in-loop
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
    show: true
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
    this.$nextTick(() => {
      this.poll();

      const vChart = this.$refs.vChart2;
      vChart.chart.on('brushEnd', params => {
        console.log('brushEnd -> params', params);
        vChart.dispatchAction({
          type: 'brush',
          areas: []
        });
        // refresh();
      });
    });
  },
  watch: {
    options: function () {
      // console.log(' this.$refs.vChart', this.$refs.vChart);
      // this.$nextTick(() => {
      //   this.$refs.vChart.dispatchAction({
      //     type: 'takeGlobalCursor',
      //     key: 'brush',
      //     brushOption: {
      //       brushType: 'rect',
      //       brushMode: 'single'
      //     }
      //   });
      // });
    }
  },
  methods: {
    handleBrushSelected(params) {
      console.log('handleBrushSelected -> params', params);
    },
    handleBrushEnd(params) {
      console.log('handleBrushEnd -> params', params);
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

        // setOption(option, notMerge) notMerge = true即不合并
        // 在两次setOption间进行框选的话, 前一次的框将会无法消失
        // this.options = {
        //   ...this.options,
        //   series: this.options.series.map(item => ({
        //     ...item,
        //     data: [
        //       ...(item.data || []),
        //       ...data.find(e => e.name === item.name).data
        //     ]
        //   }))
        // };

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
  #poll-scatter {
    width: 800px;
    height: 600px;
    padding: 20px;
  }
  #chart2 {
    margin-top: -400px;
  }
}
</style>
