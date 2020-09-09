import { useState, useEffect, useCallback, useRef } from 'react'
import { isObject } from 'lodash'
import mitt from 'mitt'

export const useDealwithEmitter = () => {
  const [pluginData, setPluginData] = useState({}) // 存储插件发送过来的数据 然后传给父亲组件
  const [propsData, setPropsData] = useState({}) // 存储父亲组件 发送的数据 传给插件
  const eventBusRef = useRef()
  useEffect(() => {
    const emitter = mitt()
    eventBusRef.current = emitter
    return () => {
      // 页面卸载清理全部信息
      console.log('clear all message')
      emitter.all.clear()
    }
  }, [])
  useEffect(() => {
    const eventBus = eventBusRef.current
    if (!eventBus) {
      return
    }
    eventBus.on('toPlugin', v => {
      setPropsData(pre => {
        return {
          ...pre,
          ...v
        }
      })
    })
    eventBus.on('toParent', v => {
      setPluginData(pre => {
        return {
          ...pre,
          ...v
        }
      })
    })
  }, [setPluginData, setPropsData])

  const sendDataToPlugin = useCallback(data => {
    const eventBus = eventBusRef.current

    if (!eventBus) {
      return
    }

    if (!isObject(data)) {
      throw new Error(' emitter.emit data must object')
    }
    eventBus.emit('toPlugin', data)
  }, [])

  const sendDataToParent = useCallback(data => {
    const eventBus = eventBusRef.current
    if (!eventBus) {
      return
    }
    if (!isObject(data)) {
      throw new Error(' emitter.emit data must object')
    }
    eventBus.emit('toParent', data)
  }, [])

  return { pluginData, propsData, sendDataToPlugin, sendDataToParent }
}
