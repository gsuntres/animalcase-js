import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import path from 'path'

const input = 'src/index.ts'

const bundles = [
  {
    input,
    output: {
      file: 'dist/animalcase.core.esm.js',
      format: 'esm'
    }
  },
  {
    input,
    output: {
      file: 'dist/animalcase.core.mjs',
      format: 'esm'
    }
  },
  {
    input,
    output: {
      name: 'ANIMALCASE_CORE',
      file: 'dist/animalcase.core.js',
      format: 'umd',
      globals: {
        decamelize: 'decamelize',
        camelcase: 'camelCase'
      }
    }
  }
]

export default bundles.map(({ input, output }) => {

  return {
    input,
    output,
    external: [
      'camelcase',
      'decamelize'
    ],
    plugins: [
      commonjs(),
      nodeResolve({extensions: ['.js', '.json', '.ts']}),
      typescript({
        tsconfig: '../../tsconfig.json'
      }),
      replace({
        __DEV__:'process.env.NODE_ENV !== "production"',
        preventAssignment: true,
      })
    ]
  }
})
