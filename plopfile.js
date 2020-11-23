module.exports = plop => {
  const path = process.cwd();

  plop.setPartial('componentName', '{{pascalCase name}}');
  plop.setPartial('cssClassName', '{{kebabCase name}}');

  plop.setGenerator(
    'common-table',
    require('./src/views/common-table/template')(path)
  );
  plop.setGenerator(
    'common-form',
    require('./src/views/common-form/templates')(path)
  );
};
