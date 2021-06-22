<template>
  <div class="roma-opera">
    <div class="roma-opera__header">Opera</div>
    <div class="roma-opera__row" v-for="(item, index) in data" :key="index">
      <div
        v-for="it in item"
        :key="it.key"
        class="roma-opera__wrapper"
        :style="it.wrapperStyle"
      >
        <div class="roma-opera__item" :style="it.itemStyle"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'roma-opera',
  data() {
    return {
      data: [
        Array.from({ length: 20 }, (v, i) => ({
          key: i,
          wrapperStyle: {
            perspective: `${50 + Math.abs(i - 9) * 12}px`,
            perspectiveOrigin: i < 10 ? `right bottom` : `left bottom`
          },
          itemStyle: {
            transform: `rotateY(${1.2 * (9 - i)}deg)`,
            marginTop: `${-0.4 * Math.pow(i - 9, 2)}px`
          }
        })),
        Array.from({ length: 20 }, (v, i) => ({
          key: i,
          wrapperStyle: {
            perspective: `${100 + Math.abs(i - 9) * 10}px`,
            perspectiveOrigin: i < 10 ? `right bottom` : `left bottom`
          },
          itemStyle: {
            transform: `rotateY(${1 * (9 - i)}deg)`,
            marginTop: `${-0.3 * Math.pow(i - 9, 2)}px`
          }
        })),
        Array.from({ length: 20 }, (v, i) => ({
          key: i,
          wrapperStyle: {
            perspective: `${100 + Math.abs(i - 9) * 10}px`,
            perspectiveOrigin: i < 10 ? `right bottom` : `left bottom`
          },
          itemStyle: {
            transform: `rotateY(${0.8 * (9 - i)}deg)`,
            marginTop: `${-0.2 * Math.pow(i - 9, 2)}px`
          }
        }))
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.roma-opera {
  height: 500px;
  &__header {
    padding: 10px 0 50px;
    text-align: center;
  }
  &__row {
    display: flex;
    padding-top: 1px;
  }
  &__item {
    width: 55px;
    height: 60px;
    border: 1px solid #0597bc;
    margin: 0 5px;
  }
}
</style>
