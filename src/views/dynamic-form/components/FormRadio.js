export default {
  name: 'FormRadio',

  functional: true,

  props: {
    value: String,
    label: String,
    options: Array
  },

  render(h, { props: { label, options }, data }) {
    const genOptions = function (_options) {
      return _options.map(option => {
        const { value, label } = option;
        return h('el-radio', { props: { label: value } }, label);
      });
    };

    return h('div', { class: 'form-radio' }, [
      h('span', { class: 'form-radio__label' }, label),
      h(
        'el-radio-group',
        { class: 'form_radio__main', ...data },
        genOptions(options)
      )
    ]);
  }
};
