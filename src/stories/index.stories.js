import { storiesOf } from '@storybook/vue';

import ConfigResultView from '../views/ConfigResultView.vue';
import StyleChange from '../components/StyleChange.vue';
import UploadExcel from '../views/upload-excel.vue';
import BasicInfoView from '../components/BasicInfo/index.vue';
import CommonTable from '../views/common-table';

storiesOf('index', module)
  .add('config result', () => ({
    components: { ConfigResultView },
    template: '<config-result-view />'
  }))
  .add('style change', () => ({
    components: { StyleChange },
    template: '<style-change></style-change>'
  }))
  .add('upload-excel', () => ({
    components: { UploadExcel },
    template: '<upload-excel/>'
  }))
  .add('basic info', () => ({
    components: { BasicInfoView },
    template: '<basic-info-view/>'
  }))
  .add('通用表格', () => ({
    render: h => h(CommonTable)
  }));
