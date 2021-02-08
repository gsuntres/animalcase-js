import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'lib/index.js',
  output: [{
    file: 'dist/index.js',
    format: 'cjs'
  }, {
    file: 'dist/index.mjs',
    format: 'es'
  }],
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    commonjs()
  ]
}
