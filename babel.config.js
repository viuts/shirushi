const presets = [
  '@babel/preset-env',
  '@babel/preset-react',
]

const plugins = [
  '@babel/plugin-transform-runtime',
  [
    '@babel/plugin-proposal-decorators',
    { legacy: true },
  ],
  [
    '@babel/plugin-proposal-class-properties',
    { loose: true },
  ],
  'lodash',
]

module.exports = {
  presets,
  plugins,
  // https://github.com/storybookjs/storybook/issues/3346#issuecomment-554270012
  sourceType: 'unambiguous',
}
