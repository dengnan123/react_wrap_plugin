import React from 'react'

export default class ErrorWrap extends React.Component {
  state = {
    hasError: false,
    errorMsg: '',
  }
  componentDidMount() {
    window.onerror = (error) => {
      console.log('window.onerror........', error)
      console.log('window.onerror........', error.message)
      this.setState({
        hasError: true,
        errorMsg: error.message,
      })
    }
  }
  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    console.log('componentDidCatch', error, errorInfo)
    console.log('componentDidCatch---error-msg', error.message)
    this.setState({
      hasError: true,
      errorMsg: error.message,
    })
  }
  render() {
    const { hasError, errorMsg } = this.state
    if (hasError) {
      return (
        <div>
          组件渲染报错
          {JSON.stringify(errorMsg)}
        </div>
      )
    }
    return this.props.children
  }
}
