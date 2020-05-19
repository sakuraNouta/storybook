export default {
  name: 'FormInput',

  functional: true,

  props: {
    value: String,
    label: String
  },

  render(h, { props: { label }, data }) {
    return h('div', { class: 'form-input' }, [
      h('span', { class: 'form-input__label' }, label),
      h('el-input', { class: 'form_input__main', ...data })
    ]);
  }
};
