import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import dialog from './components/Dialog';
Vue.prototype.$dialog = dialog;

Vue.use(ElementUI);
console.log(Vue.prototype);

let vm = new Vue({
  router,
  store,
  render: h => h(App)
});
console.log(vm);

const handler = {
  get: function(target, key) {
    if (typeof target[key] === 'function') {
      return function(...args) {
        console.log(args);
        return target[key](...args);
      };
    }
    return target[key];
  }
};

const _vm = new Proxy(vm, handler);
console.log(_vm);
_vm.$mount('#app');
