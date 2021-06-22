<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-button type="primary" @click="openDialog">dialog</el-button>
    <el-button @click="request">request</el-button>
    <about></about>
  </div>
</template>

<script>
import About from './About';
import axios from 'axios';
import qs from 'qs';

function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  });
}

export default {
  name: 'home',
  components: { About },
  async created() {
    console.log('home create');
    await sleep(5 * 1000);
    console.log('home created');
  },
  methods: {
    openDialog() {
      this.$dialog.info({ content: '消息提示', duration: 2 });
    },
    request() {
      window.qs = qs;
      axios({
        method: 'get',
        url: '/login',
        params: {
          username: ['123', '345'],
          password: 'pwd'
        }
      });
    }
  }
};
</script>
