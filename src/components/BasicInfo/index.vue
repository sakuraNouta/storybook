<template>
  <div>
    <basic-info :size="size" :data="basicInfo"></basic-info>
    <input v-model="size" />
  </div>
</template>

<script>
import BasicInfo from './components/index.js';
export default {
  components: { BasicInfo },
  data() {
    return {
      size: 3,
      basicInfo: [
        { key: 'name', label: '采集资源名称', value: 'name' },
        { key: 'classKey', label: '采集资源类型', value: 'classKey' },
        { key: 'agentName', label: '采集代理', value: 'agentName' },
        { key: 'interval', label: '任务执行周期', value: 'interval' },
        {
          key: 'lastUpdateTime',
          label: '上次更新时间',
          value: 'lastUpdateTime'
        },
        { key: 'createTime', label: '创建时间', value: 'createTime' }
      ]
    };
  }
};
</script>

<style>
</style>