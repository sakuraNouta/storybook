import { shallowMount, createLocalVue } from '@vue/test-utils';
import CommonTable from '@/views/common-table';
import ElementUI from 'element-ui';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('CommonTable', () => {
  it('Render', () => {
    const wrapper = shallowMount(CommonTable, {
      localVue
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
