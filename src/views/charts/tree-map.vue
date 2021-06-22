<template>
  <div class="tree-map">
    <v-chart class="tree-map__chart" :options="options"></v-chart>
  </div>
</template>

<script>
import VChart from 'vue-echarts';
import 'echarts/lib/chart/treemap';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

// import diskData from './diskData';

const data = Array.from({ length: 10 }, (v, i) => ({
  value: i + 1 * 10,
  name: `name${i + 1}`,
  state: Math.random() > 0.7 ? '0SX' : '0SA'
}));
console.log('data -> data', data);

export default {
  name: 'tree-map',
  components: { VChart },
  data() {
    return {
      options: {}
    };
  },
  created() {
    this.options = {
      tooltip: {},
      series: [
        {
          type: 'treemap',
          visibleMin: 300,
          breadcrumb: { show: false },
          label: {
            show: true,
            formatter: '{b}'
          },
          itemStyle: {
            borderColor: '#b6ea8e',
            gapWidth: 1
          },
          data: data.map(item => {
            const { name, value, state } = item;
            return {
              name,
              value,
              itemStyle: { color: state === '0SA' ? '#9acf6c' : '#f15f5f' }
            };
          })
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.tree-map {
  &__chart {
    margin: auto;
    perspective: 120;
    perspective-origin: 65% center;
    :first-child {
      transform: rotateX(11deg);
    }
  }
}
</style>
