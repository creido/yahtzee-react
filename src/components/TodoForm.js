import React, {Component} from 'react'
import {connect} from 'react-redux'

import {updateCurrent, saveTodo} from '../reducers/todo'

class TodoForm extends Component {
  handleInputChange = (event) => {
    const val = event.target.value

    this.props.updateCurrent(val)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.saveTodo(this.props.currentTodo)
  }

  render() {
    const {currentTodo} = this.props

    return (
      <form onSubmit={this.handleSubmit} className="Todo-Form">
        <input type="text"
          onChange={this.handleInputChange}
          value={currentTodo}/>
      </form>
    )
  }
}

export default connect(
  state => ({currentTodo: state.todo.currentTodo}),
  {updateCurrent, saveTodo}
)(TodoForm)
