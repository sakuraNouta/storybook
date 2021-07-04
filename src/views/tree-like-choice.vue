<template>
  <div class="tree-like-choice">
    <i class="tree-like-choice__icon el-icon-back" @click="goBack" />
    <div v-if="showInfo">
      {{ current.info }}
    </div>
    <div
      v-else
      class="tree-like-choice__item"
      v-for="item in current"
      :key="item.id"
      @click="changeCurrent(item)"
    >
      <div>{{ item.label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tree-like-choice',
  data() {
    return {
      data: Array.from({ length: 9 }, (v, i) => {
        return {
          id: i + 1,
          label: i + 1,
          children: Array.from({ length: 9 }, (_v, _i) => {
            return {
              id: `${i + 1}${_i + 1}`,
              label: `${i + 1}${_i + 1}`,
              children: { id: `${i + 1}${_i + 1}1`, info: '详细信息' }
            };
          })
        };
      }),
      current: []
    };
  },
  computed: {
    showInfo() {
      return !Array.isArray(this.current);
    }
  },
  created() {
    this.current = this.data;
  },
  methods: {
    changeCurrent(item) {
      this.current = item.children || item.info;
    },
    goBack() {
      function findParent(data, current, parent) {
        if (!Array.isArray(data)) {
          if (data.id !== current.id) return;
          return parent;
        }

        const target = data.find(item => item.id === current.id);
        if (target) {
          return parent;
        } else {
          for (let item of data) {
            parent = data;
            const result = findParent(item.children, current, parent);
            if (result) return result;
          }
        }
      }
      const { data, current } = this;
      const _current = Array.isArray(current) ? current[0] : current;
      this.current = findParent(data, _current);
    }
  }
};
</script>

<style lang="scss" scoped>
.tree-like-choice {
  display: flex;
  flex-wrap: wrap;
  width: 500px;
  margin-top: 50px;
  &__item {
    width: 33.33%;
    height: 50px;
    line-height: 50px;
    border: 1px solid #eee;
    text-align: center;
    cursor: pointer;
  }
  &__icon {
    position: absolute;
    padding: 10px;
    margin-top: -50px;
    cursor: pointer;
  }
}
</style>
