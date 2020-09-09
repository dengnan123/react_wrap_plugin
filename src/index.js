import React, { useRef, useState, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import UmdLoader from './components/UmdLoader'
import { useDealwithEmitter } from './helpers/util'

export default function warpPlugin(pluginPropsExt = {}) {
  return function warpPluginHoc(Comp) {
    return React.forwardRef((props, ref) => {
      const { plugins = [] } = pluginPropsExt
      console.log('pluginspluginsplugins', plugins)
      const pluginRef = useRef(null)
      const [pagePlugins] = useState(plugins)
      const pluginRefHash = useRef({})
      const { pluginData, propsData, sendDataToPlugin, sendDataToParent } = useDealwithEmitter()
      const { pathname } = window.location

      const renderPlugin = useCallback(
        (props, v, propsData) => {
          const { pluginName, pluginSrc, mountDivId, pluginProps = {}, pluginKey, routerBase } = v
          const ele = document.getElementById(mountDivId)
          const geturl = () => {
            const { origin } = window.location
            // if (isProduction) {
            //   if (routerBase) {
            //     return `${origin}${routerBase}/static/${pluginKey}/lib.js`
            //   }
            //   return `${origin}/static/${pluginKey}/lib.js`
            // }
            return pluginSrc
          }
          const compProps = {
            pluginProps: {
              ...props,
              ...pluginPropsExt,
              ...pluginProps
            },
            ref: pluginRef,
            sendDataToParent,
            propsData
          }

          let cmp = (
            <UmdLoader url={geturl()} name={pluginName} props={compProps}>
              <p>Loading remote component...</p>
            </UmdLoader>
          )
          pluginRefHash.current[pluginName] = cmp
          if (ele) {
            ReactDOM.render(cmp, ele)
          }
        },
        [sendDataToParent]
      )

      useEffect(() => {
        pagePlugins
          .filter(v => v.routerPath === pathname)
          .map(v => {
            const { mountDivs } = v
            for (const v of mountDivs) {
              renderPlugin(props, v, propsData)
            }
            return ''
          })
      }, [pagePlugins, props, propsData, pathname, renderPlugin])

      const compProps = {
        ...props,
        pluginRef,
        sendDataToPlugin,
        pluginData
      }
      return <Comp {...compProps} />
    })
  }
}
