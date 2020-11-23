/**
 * ExtendSuffix
 * 后缀扩展, 若配置为function则使用渲染函数
 */
export default {
  functional: true,
  props: { suffix: [String, Function], unit: String },
  render: (h, { props }) => {
    const suffix = props?.suffix;
    // 自定义渲染
    if (typeof suffix === 'function') return suffix(h);

    const unit = props?.unit;
    const unitRender = h(
      'span',
      { class: 'task-detail__form-item-unit' },
      unit
    );
    // 单位(unit)和描述(suffix)存在其一
    if (unit && !suffix) return unitRender;
    if (!unit && suffix) return h('span', suffix);

    return h('div', [unitRender, h('span', suffix)]);
  }
};
