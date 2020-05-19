import Vue from 'vue';

import Dialog from './Dialog.vue';

Dialog.newInstance = properties => {
  const props = properties || {};
  const Instance = new Vue({
    data: props,
    render(h) {
      return h(Dialog, {
        props: props
      });
    }
  });
  const component = Instance.$mount();
  document.body.appendChild(component.$el);
  const dialog = Instance.$children[0];
  return {
    add(noticeProps) {
      dialog.add(noticeProps);
    },
    remove(name) {
      dialog.remove(name);
    }
  };
};

let messageInstance;
function getMessageInstance() {
  messageInstance = messageInstance || Dialog.newInstance();
  return messageInstance;
}
function notice({ duration = 1.5, content = '' }) {
  // 等待接口调用的时候再实例化组件，避免进入页面就直接挂载到body上
  let instance = getMessageInstance();
  instance.add({
    content: content,
    duration: duration
  });
}

// 对外暴露的方法
export default {
  info(options) {
    return notice(options);
  }
};
