import App from '../App.vue';

export default {
  title: 'App'
};

export const toStorybook = () => ({
  components: { App },
  template: '<App />'
});

toStorybook.story = {
  name: 'app'
};
