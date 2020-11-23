module.exports = path => {
  return {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name'
      }
    ],
    actions: [
      {
        type: 'addMany',
        base: `./src/views/common-form/templates`,
        destination: `${path}/src/components/{{pascalCase name}}`,
        templateFiles: './src/views/common-form/templates/*.hbs'
      }
    ]
  };
};
