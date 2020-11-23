import FormInput from './components/FormInput';
import FormSelect from './components/FormSelect';
import FormRadio from './components/FormRadio';

const renderProxy = f => {
  const collector = [];
  return function (createElement) {
    const h = function (...args) {
      collector.push({ tag: args[0], data: args[1], children: args[2] });

      if (args[1].class === 'dynamic-form') {
        let root = collector.pop();
        let len = root.children.length;
        root.children = [];
        while (len--) {
          root.children.push(collector.pop());
        }
        console.log(JSON.stringify(root));
      }

      return createElement(...args);
    };
    return f.call(this, h);
  };
};

const instance = {
  name: 'dynamic-form',

  props: {
    dsl: Object
  },

  computed: {
    _dsl: {
      get() {
        return {
          ...this.dsl,
          children: this.dsl.children.map(item => ({ value: '', ...item }))
        };
      },
      set(v) {
        this.$emit('update:dsl', v);
      }
    }
  },

  render(h) {
    const _tag = type => `form-${type}`;

    const _data = data => {
      const { value, label, options } = data;

      const sync = v => {
        data.value = v;
        this._dsl = this._dsl;
      };

      return {
        props: { value, label, options },
        on: {
          change: sync,
          input: sync
        }
      };
    };

    const parse = function (item) {
      return h(_tag(item.type), _data(item));
    };

    return h('div', { class: 'dynamic-form' }, this._dsl.children.map(parse));
  },

  components: { FormInput, FormSelect, FormRadio }
};

instance.render = renderProxy(instance.render);
export default instance;
