import React, { useEffect, useState, useCallback } from 'react'
import { Form, Input, InputNumber, Select, Switch, Checkbox, TreeSelect, Button } from 'antd'
import axios from 'axios'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import script from 'scriptjs'
import RcSteps from 'rc-steps'
import classNames from 'classnames'

window.React = React
window.PropTypes = PropTypes
window.ReactDOM = ReactDOM
window.RcSteps = RcSteps
window.Form = Form
window.Input = Input
window.InputNumber = InputNumber
window.Select = Select
window.Switch = Switch
window.Checkbox = Checkbox
window.axios = axios
window.TreeSelect = TreeSelect
window.Button = Button
window.classNames = classNames
const LoadUmd = props => {
  const { url, name } = props
  const [state, setState] = useState({ Component: null, error: null })
  const loaderScript = useCallback((url, name) => {
    script(url, () => {
      const target = window[name]
      if (target) {
        // loaded OK
        setState({
          error: null,
          Component: target.default ? target.default : target
        })
      } else {
        // loaded fail
        setState({
          error: `Cannot load component ${name} at ${url}`,
          Component: null
        })
      }
    })
  }, [])

  useEffect(() => {
    loaderScript(url, name)
  }, [loaderScript, name, url])

  if (state.Component) {
    return <state.Component {...(props.props || {})} />
  }
  if (state.error) {
    return <div>{state.error}</div>
  }
  return props.children
}

export default LoadUmd
