module.exports = {
  jsc: {
    parser: {
      syntax: 'typescript',
      tsx: true,
      decorators: true,
      dynamicImport: true,
      exportDefaultFrom: true,
      exportNamespaceFrom: true,
    },
    transform: {
      legacyDecorator: true,
      decoratorsBeforeExport: true,
      privateProperties: true,
      privateMethods: true,
      classProperties: true,
      react: {
        runtime: 'automatic',
      },
    },
  },
};
