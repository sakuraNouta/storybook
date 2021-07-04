import copy from './copy';

const directives = {
  copy
};

const install = function (Vue) {
  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key]);
  });
};

export default install;
