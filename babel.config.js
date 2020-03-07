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
]

module.exports = {
  presets,
  plugins,
  sourceType: 'unambiguous',
}
