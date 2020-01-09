<template>
  <div class="area-config-result">
    <!-- 普通模式 -->
    <div>
      <span class="basic-form-label" style="vertical-align: top">
        <span class="star-class not-required">*</span>
        <span class="form-label-name-class">
          {{ lan == 'Cn' ? '结果预览' : 'Result' }}
        </span>
      </span>
      <el-input
        v-if="!keepAdvanced"
        class="form-item-content"
        autocomplete="new-password"
        type="textarea"
        resize="vertical"
        v-model="viewText"
        readonly
        :rows="20"
      ></el-input>
      <el-input
        v-if="keepAdvanced"
        class="form-item-content"
        autocomplete="new-password"
        type="textarea"
        resize="vertical"
        v-model="advViewText"
        readonly
        :rows="20"
      ></el-input>
      <div>
        <span class="interaction-style form-btn" @click="edit">编辑</span>
      </div>
    </div>
    <el-dialog
      title="配置文件"
      :modal="false"
      top="0"
      custom-class="config-result-dialog"
      :close-on-click-modal="false"
      :visible.sync="isAdvanced"
    >
      <div class="area-config-result__header">
        <div class="area-config-result__main">
          <div class="result-area">
            <el-input
              type="textarea"
              v-if="isAdvanced"
              v-model="editText"
              :rows="20"
            ></el-input>
          </div>
          <area-decode
            ref="areaDecodeRef"
            v-show="showDecodeArea"
            :resultText="editText"
            :config="configField"
          ></area-decode>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="opertion">
          <div class="left">
            <a class="opertion-font" href="javascript:void(0)">检验</a>
          </div>
          <div class="right">
            <a
              class="opertion-font"
              href="javascript:void(0)"
              @click="showDecodeArea = true"
            >
              智能分解
            </a>
          </div>
        </div>
        <el-button size="small" @click="close(false)">取消</el-button>
        <el-button size="small" type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash';

import AreaDecode from './AreaDecode';

/**
 * 生成预览结果
 * 暂时认为没有重复的字段, 若匹配到多个key, 则是全局参数, eg: interval
 * todo. 可能有字段名称重复, 可以通过classKey匹配范围
 * @template 待替换模板文件
 * @config 替换键值对
 */
const genResult = function(template, config) {
  let result = _.cloneDeep(template);
  _.forOwn(config, classValue => {
    _.forOwn(classValue, (v, k) => {
      // replace key, eg: #{ipAddress}
      result = _.replace(result, new RegExp(`{{${k}}}`, 'g'), toViewStr(v));
    });
  });
  return result;
};
/**
 * 数组转换为字符串
 * eg: [1,2,3] => ["1", "2", "3"]
 * 每项加上"", 以,分隔, 前后加上[]
 * @param value 待转换的数组
 */
const toViewStr = function(value) {
  if (_.isArray(value)) {
    let arr = value.map(i => `"${i}"`);
    return `[${_.join(arr, ',')}]`;
  }
  return value;
};

let string2View = function(result) {
  let isArrayStr = str => /\[.*\]/.test(str);
  let str2Arr = str =>
    str
      .slice(1, -1)
      .split(',')
      .map(e => e.slice(1, -1));
  _.forOwn(result, (value, key) => {
    result[key] = _.mapValues(value, v => {
      return isArrayStr(v) ? str2Arr(v) : v;
    });
  });
  return result;
};

let resultView = function(result, basicInfo) {
  // 返回值处理
  // 全局变量处理
  result = _.mapValues(result, v => {
    return _.omit(v, _.keys(basicInfo));
  });
  result.basicInfo = basicInfo;
  // string数据转换
  return string2View(result);
};

export default {
  name: 'AreaConfigResult',
  props: {
    config: {
      tyep: Object,
      default: () => {}
    },
    template: String,
    lan: {
      type: String,
      required: false,
      default: 'En'
    }
  },
  components: {
    AreaDecode: AreaDecode
  },
  data() {
    return {
      isAdvanced: false,
      editText: _.cloneDeep(genResult(this.template, this.config)),
      showDecodeArea: false,
      advViewText: ''
    };
  },
  computed: {
    configField: function() {
      return _.mapValues(_.omit(this.config, 'basicInfo'), e =>
        _.concat(_.keys(e), _.keys(this.config.basicInfo))
      );
    },
    viewText: function() {
      return genResult(this.template, this.config);
    },
    keepAdvanced: function() {
      // return this.$store.state.config.isAdvanced;
      return '';
    }
  },
  methods: {
    edit: function() {
      // 切换至高级模式时, 赋值editText
      this.editText = this.keepAdvanced
        ? this.editText
        : _.cloneDeep(genResult(this.template, this.config));
      this.isAdvanced = true;
    },
    close: function(isSave) {
      this.isAdvanced = false;
      if (isSave) {
        this.advViewText = this.editText;
        this.$emit('switchToNormal', this.editText);
      } else {
        this.editText = this.advViewText;
      }
    },
    save() {
      // 切换至普通模式时, 返回事件
      let result = _.cloneDeep(this.$refs.areaDecodeRef.field);
      // 智能分解
      resultView(result, this.config.basicInfo);
      // 返回编辑后的配置字符串
      if (this.keepAdvanced) {
        this.close(true);
        return;
      }
      this.$confirm(
        '此次编辑内容不会同步到参数配置模块，且编辑内容保存后，参数配置模块将不再开放使用。',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }
      )
        .then(() => {
          this.$emit('updateStatus', 'isAdvanced', true);
          this.close(true);
        })
        .catch(() => {});
    },
    // 高级回填后的表单非空校验
    formValidate: function() {
      let flag = this.editText != null && this.editText !== '';
      let msg = flag ? '模板不能为空！' : '';
      return { flag, msg };
    },
    // 向后台保存时获取模板字符串
    getResTemplate: function() {
      return this.keepAdvanced ? this.advViewText : this.viewText;
    },
    setResTemplate: function(str) {
      this.advViewText = str;
      this.editText = str;
    }
  },
  watch: {
    // 切换模式
    isAdvanced: function(newVal) {
      this.$emit('updateStatus', 'isEditing', newVal);
    }
  }
};
</script>

<style lang="scss" scoped>
.area-config-result {
  &__header {
    .common-left,
    .advance-left {
      float: left;
      padding: 5px 0;
    }
  }
  .form-item-content {
    width: 60%;
    vertical-align: middle;
  }
  .form-btn {
    margin-left: 105px;
  }
  .refresh_btn {
    display: inline-block;
    vertical-align: top;
    line-height: 32px;
  }
  .config-result-dialog {
    position: absolute;
    right: 0;
    top: 0;
    margin-top: 0;
  }
}
</style>
<style lang="scss">
.area-config-result {
  .opertion {
    float: left;
    .left,
    .right {
      padding-left: 5px;
    }
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    .opertion-font {
      color: #409eff;
      text-decoration: none;
    }
  }
  .config-result-dialog {
    position: absolute;
    right: 0;
    top: 0;
  }
  .form-item-content {
    margin-left: -5px;
    margin-right: -5px;
    padding-left: 5px;
    padding-right: 5px;
  }
}
</style>
