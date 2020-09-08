const plugins = [
  {
    routerPath: '/dp', // 页面路由
    mountDivs: [
      {
        mountDivId: 'divTest',
        pluginName: 'TimeLib',
        pluginSrc: 'http://localhost:3033/static/Time/lib.js'
      },
      {
        mountDivId: 'divTest1',
        pluginName: 'test',
        pluginSrc: 'http://localhost:3033/static/bundle-a.js'
      }
    ]
  }
]

export default plugins
