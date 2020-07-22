import { shallowMount, createLocalVue } from '@vue/test-utils';
import CommonTable from '@/views/common-table';

const localVue = createLocalVue();

describe('CommonTable', () => {
  it('Render', () => {
    const wrapper = shallowMount(CommonTable, {
      localVue
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
