/*
 * @Description: 创建通用命令式模态弹出框
 * @Author: chenbing
 * @Date: 2021-04-21 16:33:31
 */

import Vue from 'vue';
import DialogInstance from './Dialog';

/**
 * 创建模态弹出框
 * @param {*} component 弹出框组件
 */
export function createModalDialog(component) {
  const constructor = Vue.extend(component);
  return function (props) {
    let instance = null;

    instance = new constructor({
      propsData: props,
      data: {
        visible: true
      }
    });
    instance.$mount();
    document.body.appendChild(instance.$el);

    instance.close = () => {
      // 移除本身
      document.body.removeChild(instance.$el);
      // 释放自己所占资源
      instance.$destroy();
    };

    return new Promise(resolve => {
      instance.resolve = function (payload) {
        resolve(payload);
        instance && instance.close();
      };

      instance.reject = function () {
        instance && instance.close();
      };
    });
  };
}

export const Dialog = createModalDialog(DialogInstance);
