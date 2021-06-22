import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Layout from '@/layout';

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
        path: '/css-tricks',
        name: 'css-tricks',
        component: () => import('../views/css-tricks/index.vue'),
        meta: { title: 'css-tricks' }
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: { title: 'about' }
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
      {
        path: '/liquidfill',
        component: () => import('../views/liquidfill-demo.vue'),
        meta: { title: 'liquidfill' }
      },
      {
        path: '/rc',
        component: () => import('../views/compile-render.vue'),
        meta: { title: 'rc' }
      },
      {
        path: '/test',
        component: () => import('../views/test.vue'),
        meta: { title: 'test' }
      },
      {
        path: '/zebra',
        component: () => import('../views/zebra-line'),
        meta: { title: 'zebra' }
      },
      {
        path: '/ddd',
        component: () => import('../views/ddd/pieddd.vue'),
        meta: { title: 'ddd' }
      },
      {
        path: '/portal-vue-demo',
        component: () => import('../views/portal-vue-demo.vue'),
        meta: { title: 'portal-vue-demo' }
      },
      {
        path: '/pie3d',
        component: () => import('../views/echart-pie3d.vue'),
        meta: { title: 'pie3d' }
      },
      {
        path: 'treeTable',
        component: () => import('../views/tree-data/el-table-tree.vue'),
        meta: { title: 'treeTable' }
      },
      {
        path: 'vbtreeTable',
        component: () => import('../views/tree-data/vbt-table.vue'),
        meta: { title: 'vbtreeTable' }
      },
      {
        path: 'roughviz',
        component: () => import('../views/rough-viz'),
        meta: { title: 'roughviz' }
      },
      {
        path: 'aceEditor',
        component: () => import('../views/editor/ace-editor-demo.vue'),
        meta: { title: 'ace-editor' }
      },
      {
        path: 'monaco',
        component: () => import('../views/editor/monaco-editor-demo.vue'),
        meta: { title: 'monaco' }
      },
      {
        path: 'monaco-raw',
        component: () => import('../views/editor/monaco-raw.vue'),
        meta: { title: 'monaco-raw' }
      },
      {
        path: 'gantt-chart',
        component: () => import('../views/charts/gantt-chart.vue'),
        meta: { title: 'gantt-chart' }
      },
      {
        path: 'tree-map',
        component: () => import('../views/charts/tree-map.vue'),
        meta: { title: 'tree-map' }
      },
      {
        path: 'excel-like-table',
        component: () => import('../views/ExcelLikeTable.vue'),
        meta: { title: 'excel-like-table' }
      },
      {
        path: 'carousel',
        component: () => import('../views/carousel/element-component.vue'),
        meta: { title: 'carousel' }
      },
      {
        path: 'data-view/digital',
        component: () => import('../views/data-view/digital.vue'),
        meta: { title: 'digital' }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
