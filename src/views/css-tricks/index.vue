<template>
  <div class="css-tricks">
    <el-tabs v-model="activeName">
      <el-tab-pane label="opera">
        <roma-opera></roma-opera>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import RomaOpera from './roma-opera';
export default {
  name: 'css-tricks',
  components: { RomaOpera },
  data() {
    return { activeName: '' };
  }
};
</script>

<style lang="scss" scoped>
.css-tricks {
}
</style>
