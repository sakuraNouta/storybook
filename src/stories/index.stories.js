/*
 * @Descripttion:
 * @Author: chenbing
 * @Date: 2019-12-26 20:12:24
 */
import { storiesOf } from '@storybook/vue';

import ConfigResultView from '../views/ConfigResultView.vue';
import StyleChange from '../components/StyleChange.vue';
import UploadExcel from '../views/upload-excel';
import BasicInfoView from '../components/BasicInfo/index.vue';
import CommonTable from '../views/common-table';
import CommonForm from '../views/common-form';
import DraggerBar from '../components/DraggerBar';

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
  }))
  .add('元数据驱动表单', () => ({
    render: h => h(CommonForm)
  }))
  .add('视口拖拽', () => ({
    render: h => (
      <div style="height: 100vh; width: 100vw">
        <DraggerBar defaultTop={500}>
          <div style="height: 200px; width: 100vw; background-color: green"></div>
        </DraggerBar>
      </div>
    )
  }));
