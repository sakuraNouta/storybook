import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Layout from '@/layout';
import store from '../store';

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
        meta: { title: 'Home' }
      },
      {
        path: '/reload',
        name: 'reload',
        component: {
          render() {},
          created() {
            const { path, name } = this.$route.query;
            this.$router.push(path || { name });
          }
        }
      },
      {
        path: 'd3',
        component: () => import('../views/ddd'),
        meta: { title: 'd3' }
      },
      {
        path: '/gantt-chart',
        component: () => import('../views/charts/gantt-chart.vue'),
        meta: { title: 'gantt-chart' }
      },
      {
        path: '/el',
        component: () => import('../views/el/index.vue'),
        meta: { title: 'el' }
      },
      {
        path: '/tree-map',
        component: () => import('../views/charts/tree-map.vue'),
        meta: { title: 'tree-map' }
      },
      {
        path: '/tree-like-choice',
        name: 'tree-like-choice',
        component: () => import('../views/tree-like-choice'),
        meta: { title: 'tree-like-choice' }
      },
      {
        path: '/css-tricks',
        name: 'css-tricks',
        component: () => import('../views/css-tricks/index.vue'),
        meta: { title: 'css-tricks' }
      },
      {
        path: '/aceEditor',
        component: () => import('../views/editor/ace-editor-demo.vue'),
        meta: { title: 'ace-editor' }
      },
      // {
      //   path: '/monaco',
      //   component: () => import('../views/editor/monaco-editor-demo.vue'),
      //   meta: { title: 'monaco' }
      // },
      {
        path: '/monaco-raw',
        component: () => import('../views/editor/monaco-raw.vue'),
        meta: { title: 'monaco-raw' }
      },
      {
        path: 'quill-editor',
        component: () => import('../views/editor/quill-editor.vue'),
        meta: { title: 'quill-editor' }
      },
      {
        path: '/excel',
        name: 'excel',
        component: () =>
          import(/* webpackChunkName: "excel" */ '../views/upload-excel'),
        meta: { title: 'excel' }
      },
      {
        path: '/form',
        component: () =>
          import(/* webpackChunkName: "form" */ '../views/dynamic-form/demo'),
        meta: { title: 'form' }
      },
      {
        path: '/scatter',
        component: () => import('../views/poll-scatter.vue'),
        meta: { title: 'scatter' }
      },
      // {
      //   path: '/liquidfill',
      //   component: () => import('../views/liquidfill-demo.vue'),
      //   meta: { title: 'liquidfill' }
      // },
      {
        path: '/rc',
        component: () => import('../views/compile-render.vue'),
        meta: { title: 'rc' }
      },
      {
        path: '/import-html-entry',
        component: () => import('../views/test.vue'),
        meta: { title: 'import-html-entry' }
      },
      {
        path: '/zebra',
        component: () => import('../views/zebra-line'),
        meta: { title: 'zebra' }
      },
      {
        path: '/ddd',
        component: () => import('../views/ddd/pieddd.vue'),
        meta: { title: '3d饼图' }
      },
      {
        path: '/portal-vue-demo',
        component: () => import('../views/portal-vue-demo.vue'),
        meta: { title: 'portal-vue-demo' }
      },
      {
        path: '/pie3d',
        component: () => import('../views/echart-pie3d.vue'),
        meta: { title: '3d饼图2' }
      },
      {
        path: '/treeTable',
        component: () => import('../views/tree-data/el-table-tree.vue'),
        meta: { title: 'treeTable' }
      },
      {
        path: '/vbtreeTable',
        component: () => import('../views/tree-data/vbt-table.vue'),
        meta: { title: 'vbtreeTable' }
      },
      {
        path: '/roughviz',
        component: () => import('../views/rough-viz'),
        meta: { title: 'roughviz' }
      },
      {
        path: '/excel-like-table',
        component: () => import('../views/ExcelLikeTable.vue'),
        meta: { title: 'excel-like-table' }
      },
      {
        path: '/carousel',
        component: () => import('../views/carousel/element-component.vue'),
        meta: { title: 'carousel' }
      },
      {
        path: '/data-view/digital',
        component: () => import('../views/data-view/digital.vue'),
        meta: { title: 'digital' }
      },
      {
        path: '/composition-demo',
        component: () => import('../views/composition-demo.vue'),
        meta: { title: 'composition-demo' }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export function routerHook(router) {
  const convertedPages = new Set();
  router.afterEach(to => {
    if (convertedPages.has(to.path)) return;
    convertedPages.add(to.path);
    store.dispatch('theme/changeTheme');
  });
}

export default router;
