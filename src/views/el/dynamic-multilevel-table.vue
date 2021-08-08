<template>
  <div class="dm-table">
    <el-table
      :data="data"
      :span-method="spanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        v-for="item in TableConfig"
        :key="item.prop || item.label"
        :label="item.label"
        align="center"
      >
        <el-table-column
          v-for="it in item.children"
          :key="it.prop"
          :prop="it.prop"
          :label="it.label"
          align="center"
        ></el-table-column>
      </el-table-column>
      <el-table-column prop="operation" label="操作" align="center">
        <template v-slot="{ row }">
          <i class="el-icon-delete" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const TableConfig = [
  {
    label: '基本信息',
    children: [
      {
        prop: 'id',
        label: 'ID'
      },
      {
        prop: 'grade',
        label: '年级',
        merge: true
      },
      {
        prop: 'class',
        label: '班级',
        merge: true
      },
      {
        prop: 'name',
        label: '姓名',
        merge: true
      }
    ]
  },
  {
    label: '收支',
    children: [
      { prop: 'amount1', label: '数值1(元)' },
      { prop: 'amount2', label: '数值1(元)' },
      { prop: 'amount3', label: '数值1(元)' }
    ]
  }
];

/**
 * 获取跨度
 * @param {array} data 数据集
 * @param {string} field 目标字段
 */
function getSpan(data, field) {
  /**
   * 遍历收集跨度映射数据
   */
  function travel(index, collector = []) {
    collector[index] = 1;
    const cur = data[index][field];
    let nextIndex = index;
    while (++nextIndex < data.length) {
      if (data[nextIndex]?.[field] !== cur) {
        travel(nextIndex, collector);
        break;
      }
      // nextIndex对应值与目标值相同
      // 目标值跨度+1, 当前值为0
      collector[index] += 1;
      collector[nextIndex] = 0;
    }
    return collector;
  }
  return travel(0);
}

export default {
  name: 'dm-table',
  data() {
    return {
      TableConfig,
      data: Array.from({ length: 15 }, (v, i) => ({
        id: `id${i + 1}`,
        grade: `grade${Math.floor((i + 1) / 5)}`,
        class: `class${Math.floor((i + 1) / 3)}`,
        name: `name${Math.floor((i + 1) / 2)}`,
        amount1: `1${i + 1}`,
        amount2: `2${i + 1}`,
        amount3: `3${i + 1}`
      }))
    };
  },
  computed: {
    /**
     * 数据下标对应数据row跨度映射
     * eg: { 集群: [3, 0, 0], set: [2, 0, 1] }
     * 即为集群1对应3行数据, set1对应2行数据, set2对应1行数据
     */
    spanMapping() {
      const { data } = this;
      const fields = TableConfig[0].children
        .filter(e => e.merge)
        .map(e => e.prop);

      return fields.reduce((res, field, index) => {
        if (index === 0) {
          res[field] = getSpan(data, field);
          return res;
        }
        res[field] = res[fields[index - 1]].reduce((acc, offset, index) => {
          if (!offset) return acc;
          return acc.concat(getSpan(data.slice(index, index + offset), field));
        }, []);
        return res;
      }, {});
    }
  },
  methods: {
    spanMethod({ column, rowIndex }) {
      const { property } = column;
      return [this.spanMapping[property]?.[rowIndex] ?? 1, 1];
    }
  }
};
</script>

<style lang="scss" scoped>
.dm-table {
}
</style>
