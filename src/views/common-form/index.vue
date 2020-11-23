<template>
  <div class="common-form">
    <el-form
      ref="form"
      label-position="left"
      :model="data"
      :rules="rules"
      label-width="10%"
      v-loading="loading"
    >
      <el-form-item label="拨测方式" prop="method">
        <el-select
          class="common-form__form-item-content"
          v-model="data.method"
          placeholder="请选择拨测方式"
        >
          <el-option
            v-for="method in DTP_METHODS"
            :key="method"
            :label="method"
            :value="method"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-for="item in dtpParam"
        :key="data.method + item.label"
        :label="item.label"
        :prop="item.key"
        v-show="!item.show || item.show(data)"
      >
        <div class="common-form__form-item">
          <el-select
            v-if="item.type === 'select'"
            class="common-form__form-item-content"
            v-model="data[item.key]"
          >
            <el-option
              v-for="{ value, label } in item.options"
              :key="value"
              :label="label"
              :value="value"
            ></el-option>
          </el-select>
          <el-input
            v-else-if="item.type === 'textarea'"
            type="textarea"
            class="common-form__form-item-content"
            placeholder="请输入脚本内容"
            rows="9"
            size="medium"
            v-model="data[item.key]"
          ></el-input>
          <el-input
            v-else
            class="common-form__form-item-content"
            v-model="data[item.key]"
          ></el-input>
          <span class="common-form__form-item-suffix">
            <extend-suffix
              :suffix="item.suffix"
              :unit="item.unit"
            ></extend-suffix>
          </span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ExtendSuffix from './ExtendSuffix';
import { DTP_METHODS, DYNAMIC_PARAM } from './form';

export default {
  name: 'common-form',
  components: { ExtendSuffix },
  data() {
    return {
      DTP_METHODS,
      data: {
        method: ''
      },
      rules: {},
      loading: false
    };
  },
  computed: {
    dtpParam() {
      return DYNAMIC_PARAM[this.data.method] || [];
    }
  }
};
</script>

<style lang="scss" scoped>
$min-width: 1366px;
$sidebar-width: 180px;
$footer-height: 48px;
$app-main-min-width: calc(#{$min-width} - #{$sidebar-width});
$font-color-desc: #999;
$--color-primary-light-2: #66b1ff;
$font-color-deep: #333;

.common-form {
  display: flex;
  flex-direction: column;

  &__scrollbar {
    height: calc(100% - #{$footer-height});
    overflow: auto;
  }

  &__main {
    width: 100%;
    min-width: $app-main-min-width;
    padding: 20px;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: $footer-height;
    padding: 0 20px;
  }

  &__keep-checkbox {
    padding-right: 10px;
  }

  &__form-item {
    display: flex;
    width: 90%;
    &-content {
      width: 500px;
    }
    &-suffix {
      color: $font-color-desc;
      padding-left: 10px;

      & > * + * {
        padding-left: 10px;
      }
    }
    &-desc {
      color: $font-color-desc;
    }
  }

  &__tip {
    color: $--color-primary-light-2;
    cursor: pointer;
  }
  &__timout-unit,
  &__form-item-unit {
    color: $font-color-deep;
  }
}
</style>
