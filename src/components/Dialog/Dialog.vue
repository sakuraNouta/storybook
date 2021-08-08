<template>
  <el-dialog title="dialog" :visible="visible" @close="close">
    <h1>{{ msg }}</h1>
  </el-dialog>
</template>

<script>
let seed = 0;

function getUuid() {
  return 'alert_' + seed++;
}

export default {
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      notices: []
    };
  },
  methods: {
    close() {
      this.reject && this.reject();
    },
    add(notice) {
      const name = getUuid();

      let _notice = Object.assign(
        {
          name: name
        },
        notice
      );

      this.notices.push(_notice);

      // 定时移除，单位：秒
      const duration = notice.duration;
      setTimeout(() => {
        this.remove(name);
      }, duration * 1000);
    },
    remove(name) {
      const notices = this.notices;

      for (let i = 0; i < notices.length; i++) {
        if (notices[i].name === name) {
          this.notices.splice(i, 1);
          break;
        }
      }
    }
  }
};
</script>
