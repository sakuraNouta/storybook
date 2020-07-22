module.exports = path => ({
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'component name'
    }
  ],
  actions: [
    {
      type: 'add',
      path: `${path}/src/components/{{pascalCase name}}/index.vue`,
      templateFile: './src/views/common-table/template/index.hbs'
    }
  ]
});
