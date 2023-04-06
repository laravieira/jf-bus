module.exports = function(api) {
  api.cache(false);
  return {
    presets: [
      ['babel-preset-expo'],
      ['@babel/preset-env', { 'loose': true }]
    ],
    plugins: [
      ['module-resolver', {
        root: ['./src'],
        alias: {
          'components': './src/components',
          'pages': './src/pages'
        }
      }],
      ['transform-globals']
    ]
  };
};
