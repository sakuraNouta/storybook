import Vue from 'vue';
import App from './App.vue';
import { routes, routerHook } from './router';
import store from './store';

import ElementUI from 'element-ui';
const process = process || {};
import(
  `@/assets/styles/themes/${process.env?.VUE_APP_THEME || 'default'}.scss`
);

import PortalVue from 'portal-vue';

import dialog from './components/Dialog';
import VueRouter from 'vue-router';
import './public-path';
import '@/assets/styles/index.scss';
import { digitalFlop } from '@jiaminghi/data-view';
import Directives from '@/directives';

Vue.prototype.$dialog = dialog;

Vue.use(digitalFlop);
Vue.use(ElementUI);
Vue.use(PortalVue);
Vue.use(Directives);

let router = null;
let instance = null;

function render() {
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/app1' : '/',
    mode: 'hash',
    routes
  });
  routerHook(router);

  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('vue app bootstraped');
}

export async function mount(props) {
  console.log('props from main app', props);
  render();
}

export async function unmount() {
  instance.$destroy();
  instance = null;
  router = null;
}
