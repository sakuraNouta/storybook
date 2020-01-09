import ConfigResultView from '../views/ConfigResultView.vue';

export default {
  title: 'ConfigResultView'
};

export const toStorybook = () => ({
  components: { ConfigResultView },
  template: '<ConfigResultView />'
});

toStorybook.story = {
  name: 'ConfigResultView'
};
