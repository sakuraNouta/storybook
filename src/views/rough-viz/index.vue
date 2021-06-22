<template>
  <div class="demo">
    <!-- <rough-bar
      class="demo__item"
      :data="data"
      title="Regions"
      roughness="8"
      :colors="['red', 'orange', 'blue', 'skyblue']"
      stroke="black"
      stroke-width="3"
      fill-style="cross-hatch"
      fill-weight="3.5"
    ></rough-bar> -->
    <rough-bar
      class="demo__item"
      v-if="syncData.labels.length > 0"
      :data="syncData"
      title="BTC - 10 Days"
      roughness="3"
      color="#ccc"
      stroke="black"
      stroke-width="1"
      fill-style="zig-zag"
      fill-weight="2"
    ></rough-bar>
  </div>
</template>

<script>
import { RoughBar } from 'vue-roughviz';

export default {
  name: 'demo',
  components: { RoughBar },
  data() {
    return {
      data: {
        labels: ['North', 'South', 'East', 'West'],
        values: [10, 5, 8, 3]
      },
      syncData: {
        labels: [],
        values: []
      }
    };
  },
  async created() {
    await fetch(
      'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=10&interval=daily'
    )
      .then(res => res.json())
      .then(data => {
        console.log('created -> data', data);
        this.syncData = data.prices.reduce((acc, item) => {
          (acc.labels || (acc.labels = [])).push(
            new Date(item[0]).toDateString()
          );
          (acc.values || (acc.values = [])).push(item[1]);
          return acc;
        }, {});
      });
  }
};
</script>

<style lang="scss" scoped>
.demo {
  display: flex;
  &__item {
    width: 50%;
  }
}
</style>
