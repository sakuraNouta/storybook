<template>
  <div class="area-decode">
    <div v-for="(value, name) in field" class="area-decode__col" :key="name">
      <div class="area-decode__row area-decode__title">
        {{ name }}
      </div>
      <div class="area-decode__row">
        <div v-for="(v, n) in value" class="area-decode__col" :key="n">
          <div class="area-decode__row area-decode__title">
            {{ n }}
          </div>
          <div class="area-decode__col area-decode__item">
            {{ v }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
/**
 * 高级模式-智能分解
 */

/**
 * 获取搜索范围
 * reg: /key\]\][\s\S]*\[/i
 * eg: key]] ... [[
 */
const findScope = function (resultText, key) {
  let keyLen = key.length + 2;
  // 非贪婪模式
  let pattern = new RegExp(`${key}\\]\\][\\s\\S]*?\\[\\[`, 'i');
  let scope = resultText.match(pattern);
  if (scope) {
    return scope[0].slice(keyLen, -2);
  } else {
    // 未命中则匹配至结束, 贪婪模式
    pattern = new RegExp(`${key}\\]\\][\\s\\S]*`, 'i');
    scope = resultText.match(pattern);
    return scope ? scope[0].slice(keyLen) : '';
  }
};

const findInScope = function (scope, field) {
  let pattern = new RegExp(`${field}\\s?=.*`, 'i');
  let target = scope.match(pattern);
  if (target) {
    let targetStr = target[0];
    let indexE = targetStr.indexOf('=') + 1;
    return targetStr.slice(indexE).trim();
  } else {
    return '';
  }
};
/**
 * 将生成出的结果, 通过正则表达式分解为字段
 */
const decode = function (resultText, config) {
  let result = {};
  _.forOwn(config, (fieldList, key) => {
    let item = {};
    let scope = findScope(resultText, key);
    console.log('scope: ', scope);
    for (let field of fieldList) {
      item[field] = findInScope(scope, field);
    }
    result[key] = item;
  });
  // console.log("result: ", result);
  return result;
};

export default {
  name: 'AreaDecode',
  props: {
    resultText: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    field: function () {
      return decode(this.resultText, this.config);
    }
  }
};
</script>

<style lang="scss" scoped>
.area-decode {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  &__row,
  &__col {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  &__row {
    justify-content: center;
  }
  &__col {
    flex-direction: column;
    align-items: center;
    flex-shrink: 1;
  }
  &__title,
  &__item {
    border: 1px solid #d7d7d7;
    color: #333;
    width: 100%;
  }
  &__title {
    height: 50px;
    background-color: #f2f2f2;
  }
  &__item {
    height: 100px;
  }
}
</style>
