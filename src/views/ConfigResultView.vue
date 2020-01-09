<template>
  <div class="view-mian">
    <div class="view"><span>主要表单</span></div>
    <area-config-result
      :config="config"
      :template="template"
      @switchToNormal="handleSwitchToNormal"
    ></area-config-result>
  </div>
</template>

<script>
import AreaConfigResult from '../components/AreaConfigResult';

export default {
  components: {
    AreaConfigResult: AreaConfigResult
  },
  mounted() {},
  data() {
    return {
      axiosData: '',
      test: '',
      val: '',
      key: 'interval',
      config: {
        basicInfo: {
          interval: 110,
          instance_name: '111'
        },
        cpu: {
          percpu: true,
          totalcpu: true
        },
        disk: {
          mount_points: ['/', '/index']
        }
      },
      template: `# Read metrics about cpu usage
[[inputs.cpu]]
  ## Whether to report per-cpu stats or not
  percpu = {{percpu}} 
  ## Whether to report total system cpu stats or not
  totalcpu = {{totalcpu}}
  interval = {{interval}}


# Read metrics about disk usage by mount point
[[inputs.disk]]
  ## By default stats will be gathered for all mount points.
  ## Set mount_points will restrict the stats to only the specified mount points.
  mount_points = {{mount_points}}
  interval = {{interval}}
`
    };
  },
  methods: {
    handleSwitchToNormal(val) {
      // 返回解析数据
      console.log(val);
    }
  }
};
</script>

<style>
.view-mian {
  padding: 0 20px;
}
.view {
  /* height: 400px; */
}
</style>
