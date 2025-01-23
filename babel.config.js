module.exports = function (api) {
  api.cache(true);
  const plugins = [
    [
      'module-resolver',
      {
        alias: {
          '~': '.',
          '@': '.',
          '@components': './components'
        }
      }
    ]
  ];

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: ["native-wind/babel"]
  };
};