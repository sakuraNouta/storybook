export default {
  name: 'BasicInfo',

  functional: true,

  props: {
    size: {
      type: Number,
      default: () => 3,
    },
    data: {
      type: Array,
      default: () => [],
    },
  },

  render(h, { props: { data, size } }) {
    const genItems = (item) => {
      return h(
        'div',
        {
          style: {
            display: 'inline-flex',
            width: `${Math.floor(100 / size)}%`,
            padding: '10px 20px',
          },
        },
        [
          h('div', { style: 'width: 25%; padding-right: 10px;' }, item.label),
          h('div', { style: 'width: 75%;' }, item.value),
        ]
      );
    };

    let length = Math.ceil(data.length / size);
    let rows = Array.from({ length }, (_, i) => {
      return h(
        'div',
        {
          style: 'display: flex; padding-left: 10px;',
        },
        data.slice(i * size, (i + 1) * size).map(genItems)
      );
    });

    return h('div', { style: 'padding: 10px; border: 1px solid grey;' }, rows);
  },
};
