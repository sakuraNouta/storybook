const dsl = {
  children: [
    {
      type: 'input',
      label: '姓名',
      value: 'name'
    },
    {
      type: 'select',
      label: '性别',
      options: [
        {
          value: 0,
          label: '男'
        },
        {
          value: 1,
          label: '女'
        }
      ]
    },
    {
      type: 'radio',
      label: '是否结婚',
      value: 0,
      options: [
        {
          value: 1,
          label: '是'
        },
        {
          value: 0,
          label: '否'
        }
      ]
    }
  ]
};

export default dsl;
