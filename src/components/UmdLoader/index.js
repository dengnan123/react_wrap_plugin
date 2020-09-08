import React, { Component } from 'react'
import PropTypes from 'prop-types'
import script from 'scriptjs'
class LoadUmd extends Component {
  state = {
    Component: null,
    error: null
  }
  static propTypes = {
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    props: PropTypes.object,
    children: PropTypes.array
  }
  componentDidMount() {
    window.React = React
    window.PropTypes = PropTypes
    // async load of remote UMD component
    console.log('12312312312312', this.props)
    script(this.props.url, () => {
      const target = window[this.props.name]

      if (target) {
        // loaded OK
        this.setState({
          error: null,
          Component: target
        })
      } else {
        // loaded fail
        this.setState({
          error: `Cannot load component ${this.props.name} at ${this.props.url}`,
          Component: null
        })
      }
    })
  }
  render() {
    if (this.state.Component) {
      return <this.state.Component {...(this.props.props || {})} />
    } else if (this.state.error) {
      return <div>{this.state.error}</div>
    } else {
      return this.props.children
    }
  }
}

export default LoadUmd
