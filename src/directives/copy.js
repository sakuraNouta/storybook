import { Message } from 'element-ui';

const copy = {
  bind(el, binding) {
    const value = binding.value;
    el.$value = value;
    el.addEventListener('click', () => {
      const textarea = document.createElement('textarea');
      textarea.readOnly = 'readOnly';
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      textarea.value = 'copy success';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      Message.success('copy success');
    });
  },
  componentUpdated(el, { value }) {
    el.$value = value;
  },
  unbind(el) {
    console.log('unbind -> el', el);
    el.removeEventListener('click', el.handler);
  }
};

export default copy;
