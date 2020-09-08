import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import replace from '@rollup/plugin-replace'
import postcss from 'rollup-plugin-postcss'
import image from '@rollup/plugin-image'
import json from 'rollup-plugin-json'
import * as react from 'react'
import * as reactDom from 'react-dom'
import * as reactIs from 'react-is'
import * as propTypes from 'prop-types'
import nodeGlobals from 'rollup-plugin-node-globals'
import builtins from 'rollup-plugin-node-builtins'

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
  'monaco-editor': 'monacoEditor',
  echarts: 'echarts',
  fengmap: 'fengmap',
  '@antv/l7': 'L7'
}

const external = Object.keys(globals)

const plugins = [
  resolve({
    mainFields: ['module', 'main', 'browser'],
    browser: true,
    customResolveOptions: {
      moduleDirectory: 'node_modules' // 仅处理node_modules内的库
    }
  }),
  commonjs({
    include: /node_modules/,
    namedExports: {
      react: Object.keys(react),
      'react-dom': Object.keys(reactDom),
      'react-is': Object.keys(reactIs),
      'node_modules/react-is/index.js': ['isFragment'],
      'node_modules/react/index.js': [
        'Fragment',
        'cloneElement',
        'isValidElement',
        'Children',
        'createContext',
        'Component',
        'useRef',
        'useImperativeHandle',
        'forwardRef',
        'useState',
        'useEffect',
        'useMemo'
      ],
      'node_modules/react-dom/index.js': ['render', 'unmountComponentAtNode', 'findDOMNode'],
      'prop-types': Object.keys(propTypes),
      'node_modules/react-responsive-carousel/lib/es/index.js': ['Carousel'],
      'node_modules/ansi-colors/index.js': ['styles'],
      'node_modules/eventemitter3/index.js': ['EventEmitter'],
      'node_modules/umi-plugin-react/locale/index.js': ['getLocale'],
      'node_modules/raf/index.js': ['default'],
      'node_modules/@antv/l7-map/node_modules/eventemitter3/index.js': ['EventEmitter'],
      'node_modules/video-react/lib/index.js': [
        'Player',
        'ControlBar',
        'PlayToggle',
        'ReplayControl',
        'ForwardControl',
        'VolumeMenuButton'
      ]
    },
    esmExternals: true,
    requireReturnsDefault: true
  }),
  json(),
  image(),
  postcss({
    modules: true, // 增加 css-module 功能
    extensions: ['.less', '.css'],
    use: [
      [
        'less',
        {
          javascriptEnabled: true
        }
      ]
    ]
  }),
  babel({
    exclude: /node_modules/,
    runtimeHelpers: true
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  nodeGlobals(),
  builtins()
  // uglify()
]

// const inputAndOutputList = buildUmd();

const buildName = 'MeetingBtnBlue'
const inputPath = `Meeting/${buildName}`
const outUmdFolderName = 'umd-dist'

const inputAndOutputList = [
  {
    input: `./src/index.js`,
    output: {
      name: `${buildName}Config`
    }
  }
]

const configList = inputAndOutputList.map(v => {
  const { input, output } = v
  const newOutput = {
    ...output,
    format: 'cjs',
    globals
  }
  return {
    input,
    output: newOutput,
    plugins,
    external
  }
})

export default configList
