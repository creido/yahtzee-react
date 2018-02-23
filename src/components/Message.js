import React from 'react'
import {connect} from 'react-redux'

const Message = ({message}) => (
  message
  ? <div className='message'>{message}</div>
  : null
)

// export default Message
export default connect(
  state => ({message: state.message})
)(Message)

