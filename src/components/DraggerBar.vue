<!--
 * @Descripttion: 视口拖拽组件, 需要注意的是父类布局需要非static或添加 transform: translate(0, 0);
 * @Author: chenbing
 * @Date: 2020-09-24 12:29:36
-->
<template>
  <div class="dragger-bar">
    <div class="dragger-bar__dragger-wrap" :style="draggerStyle">
      <div
        class="dragger-bar__dragger"
        id="dragger-bar-dragger"
        @mousedown="handleMousedown($event)"
      >
        <!-- <svg-icon class="dragger-bar__dragger-icon" font-class="aiops_push" /> -->
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

/**
 * 默认top值
 * @param {number} expect 期望top值
 * @param {number} [minHeight=200] 当前组件最小高度
 */
function getDefaultTop(expect, minHeight = 200) {
  if (document.documentElement.clientHeight - expect < minHeight) {
    return document.documentElement.clientHeight - minHeight;
  }
  return expect;
}

export default {
  name: 'dragger-bar',
  props: {
    /**
     * 初始top值
     */
    defaultTop: {
      type: Number,
      default: 500
    },
    minTop: {
      type: Number,
      default: 0
    },
    maxTop: {
      type: Number,
      default: () => document.documentElement.clientHeight - 100
    }
  },
  data() {
    return {
      draggerTop: getDefaultTop(this.defaultTop)
    };
  },
  created() {
    const debounceResize = _.debounce(() => {
      this.draggerTop = getDefaultTop(this.defaultTop);
    }, 100);
    window.addEventListener('resize', debounceResize);
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', debounceResize);
    });
  },
  computed: {
    draggerStyle() {
      const top = this.draggerTop + 'px';
      return { top, height: `calc(100% - ${top})` };
    }
  },
  methods: {
    handleMousedown(event) {
      let memo;
      const handleMousemove = e => {
        const oriY = memo || event.clientY;
        const offset = e.clientY - oriY;
        const draggerTop = this.draggerTop + offset;

        if (draggerTop < this.minTop || draggerTop > this.maxTop) {
          return;
        }

        this.draggerTop = draggerTop;
        memo = e.clientY;
      };

      const throttleHandleMousemove = _.throttle(handleMousemove, 30, {
        trailing: false
      });

      const handleMouseup = e => {
        console.log('handleMouseup -> e', e);
        window.removeEventListener('mousemove', throttleHandleMousemove);
        window.removeEventListener('mouseup', handleMouseup);
      };

      console.log('handleMousedown -> event', event);

      window.addEventListener('mouseup', handleMouseup);
      window.addEventListener('mousemove', throttleHandleMousemove);
    }
  }
};
</script>

<style lang="scss" scoped>
.dragger-bar {
  &__dragger-wrap {
    position: fixed;
    right: 0;
    width: 100%;
    z-index: 2000;
  }

  &__dragger {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 12px;
    border: 1px solid #ebecf1;
    background-color: #ebecf1;
    cursor: pointer;
  }

  &__dragger-icon {
    height: 7px;
    color: #abacb2;
  }
}
</style>
