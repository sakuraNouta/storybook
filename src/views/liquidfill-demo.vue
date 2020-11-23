<template>
  <div class="liquid">
    <div class="liquidfill-demo">
      <v-chart
        class="liquidfill-demo__chart"
        ref="vChart"
        :options="options"
      ></v-chart>
      <div class="liquidfill-demo__content">
        <span>Hello</span>
        <span>How Are You</span>
      </div>
    </div>
    <div class="liquid-css">
      <div class="liquid-css__content">
        <span>Hello</span>
        <span>How Are You</span>
      </div>
    </div>
  </div>
</template>

<script>
import VChart from 'vue-echarts';
import 'echarts-liquidfill';

export default {
  name: 'liquidfill-demo',
  components: { VChart },
  data() {
    return {
      options: {
        series: [
          {
            type: 'liquidFill',
            name: 'demo',
            backgroundStyle: {
              color: '#ffffff'
            },
            animationDuration: 0,
            shape: 'container',
            outline: { show: false },
            label: { show: false },
            period: 3000,
            amplitude: '15%',
            data: [
              {
                value: 0.95,
                itemStyle: {
                  color: '#f5f7fa',
                  shadowBlur: 0
                }
              },

              {
                value: 0.05,
                itemStyle: {
                  color: '#ffffff',
                  shadowBlur: 0
                }
              }
            ]
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@keyframes rotate {
  0% {
    transform: translate(-50%) rotate(0deg);
  }
  50% {
    transform: translate(50%) rotate(360deg);
  }
  100% {
    transform: translate(-50%) rotate(0deg);
  }
}

.liquidfill-demo {
  width: calc(100% - 20px);
  height: 100px;
  margin: 0 10px;
  overflow: hidden;

  &__chart {
    position: absolute;
    width: calc(100% - 20px);
    height: 100px;
  }
  &__content {
    position: relative;
    width: calc(100% - 2px);
    height: 98px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid black;
  }
}
.liquid-css {
  &__content {
    position: relative;
    width: calc(100% - 22px);
    height: 98px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid black;
    margin: 100px 10px 0;
    background-color: #f5f7fa;
    // background-color: blueviolet;
    overflow: hidden;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 1600px;
      height: 1600px;
      bottom: 90%;
      border-radius: 47%;
      background-color: rgba(255, 255, 255, 0.9);
      animation: rotate 12s linear infinite;
      z-index: 10;
    }
    &::after {
      top: 90%;
      left: 600px;
    }
  }
}
</style>
