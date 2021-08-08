<template>
  <div class="el">
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
import DmTable from './dynamic-multilevel-table';

const Mapping = [{ name: 'DmTable' }];

export default {
  name: 'el',
  components: { DmTable },
  data() {
    return { Mapping, activeName: Mapping[0].name };
  }
};
</script>

<style lang="scss" scoped>
.el {
}
</style>
