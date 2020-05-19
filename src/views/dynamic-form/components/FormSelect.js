export default {
  name: 'FormSelect',

  functional: true,

  props: {
    value: String,
    label: String,
    options: Array
  },

  render(h, { props: { label, options = [] }, data }) {
    const genOptions = function(_options) {
      return _options.map(({ value, label }) => {
        return h('el-option', {
          props: { key: value, label, value }
        });
      });
    };

    return h('div', { class: 'form-select' }, [
      h('span', { class: 'form-select__label' }, label),
      h(
        'el-select',
        { class: 'form_select__main', ...data },
        genOptions(options)
      )
    ]);
  }
};
