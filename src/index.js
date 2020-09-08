/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import UmdLoader from './components/UmdLoader'

function warpPlugin(Comp) {
  return React.forwardRef((props, ref) => {
    const { plugins = [] } = props
    const pluginRef = useRef(null)
    const [pagePlugins] = useState(plugins)
    const pluginRefHash = useRef({})

    // useEffect(() => {
    //   // 获取模块地对应的插件列表
    //   const doFetch = async () => {
    //     const plugins = await API.get('')
    //   }
    // }, [modalId])
    // const {local} =  props
    const {
      location: { pathname }
    } = props

    useEffect(() => {
      pagePlugins
        .filter(v => v.routerPath === pathname)
        .map(v => {
          const { mountDivs } = v
          for (const v of mountDivs) {
            const { pluginName, pluginSrc, mountDivId } = v
            const ele = document.getElementById(mountDivId)
            if (pluginRefHash.current[pluginName]) {
              if (ele) {
                ReactDOM.render(pluginRefHash.current[pluginName], ele)
              }
              return ''
            }
            let cmp = (
              <UmdLoader url={pluginSrc} name={pluginName} props={{ ...props, data: [], ref: pluginRef }}>
                <p>Loading remote component...</p>
              </UmdLoader>
            )
            pluginRefHash.current[pluginName] = cmp
            if (ele) {
              ReactDOM.render(cmp, ele)
            }
          }
          return ''
        })
    }, [pagePlugins, pathname, props])

    return <Comp {...props} pluginRef={pluginRef} />
  })
}

export default warpPlugin
