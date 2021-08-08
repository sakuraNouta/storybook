<template>
  <div class="ddd">
    <el-tabs v-model="activeName">
      <el-tab-pane
        v-for="item in Mapping"
        :key="item.name"
        :name="item.name"
        :label="item.name"
      >
        <component :is="item.name"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Pie from './pieddd.vue';
import Test from './test.vue';
import Topo from './topo.vue';

const Mapping = [{ name: 'pie' }, { name: 'test' }, { name: 'topo' }];

export default {
  name: 'ddd',
  components: { Pie, Test, Topo },
  data() {
    return { Mapping, activeName: Mapping[0].name };
  }
};
</script>

<style lang="scss" scoped>
.ddd {
}
</style>
