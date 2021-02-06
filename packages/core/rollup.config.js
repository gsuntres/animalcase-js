import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'lib/index.js',
  output: [{
    file: 'dist/bundle-cjs.js',
    format: 'cjs'
  }, {
    file: 'dist/bundle-es.js',
    format: 'es'
  }],
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    commonjs()
  ]
}
