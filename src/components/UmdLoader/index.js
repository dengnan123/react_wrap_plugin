import React, { useEffect, useState, useCallback } from 'react'
import script from 'scriptjs'

const LoadUmd = (props) => {
  const { url, name } = props
  const [state, setState] = useState({ Component: null, error: null })
  const loaderScript = useCallback((url, name) => {
    script(url, () => {
      const target = window[name]
      console.log('target.....', target)
      if (target) {
        // loaded OK
        setState({
          error: null,
          Component: target.default ? target.default : target,
        })
      } else {
        // loaded fail
        setState({
          error: `Cannot load component ${name} at ${url}`,
          Component: null,
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
