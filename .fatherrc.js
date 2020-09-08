import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
const options = {
  entry: 'src/index.js',
  extraRollupPlugins: [commonjs({}), resolve()],
  runtimeHelpers: true,
  esm: 'babel',
  cjs: 'babel',
  autoprefixer: {
    browsers: ['ie>9', 'Safari >= 6']
  }
}

export default options
