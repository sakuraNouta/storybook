# 动态表单
需求: 通过配置文件(DSL)生成表单页面, 满足input/select/checkbox等组件

## 方案
1. 以html的AST作为原型, 封装DSL
2. 解析DSL为vue的render函数, 通过vue渲染
3. 提供测试方案, 展示 DSL -> render(AST) -> 页面
