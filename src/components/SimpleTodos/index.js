import {Component} from 'react'
import TodoItem from '../TodoItem'

import './index.css'

const initialTodosList = [
  {id: 1, title: 'Book the ticket for today evening', isCompleted: false},
  {id: 2, title: 'Rent the movie for tomorrow movie night', isCompleted: false},
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    isCompleted: false,
  },
  {id: 4, title: 'Drop the parcel at Bloomingdale', isCompleted: false},
  {id: 5, title: 'Order fruits on Big Basket', isCompleted: false},
  {id: 6, title: 'Fix the production issue', isCompleted: false},
  {id: 7, title: 'Confirm my slot for Saturday Night', isCompleted: false},
  {id: 8, title: 'Get essentials for Sunday car wash', isCompleted: false},
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList,
    todoInput: '',
  }

  onChangeInput = event => {
    this.setState({todoInput: event.target.value})
  }

  addTodo = () => {
    const {todoInput, todosList} = this.state

    if (todoInput.trim() === '') return

    const parts = todoInput.trim().split(' ')
    const count = parseInt(parts[parts.length - 1])

    if (!Number.isNaN(count)) {
      const title = parts.slice(0, -1).join(' ')

      const newTodos = Array.from({length: count}, (_, index) => ({
        id: Date.now() + index,
        title,
        isCompleted: false,
      }))

      this.setState({
        todosList: [...todosList, ...newTodos],
        todoInput: '',
      })
    } else {
      const newTodo = {
        id: Date.now(),
        title: todoInput,
        isCompleted: false,
      }

      this.setState({
        todosList: [...todosList, newTodo],
        todoInput: '',
      })
    }
  }

  deleteTodo = id => {
    const {todosList} = this.state

    this.setState({
      todosList: todosList.filter(each => each.id !== id),
    })
  }

  updateTodo = (id, updatedTitle) => {
    const {todosList} = this.state

    this.setState({
      todosList: todosList.map(each =>
        each.id === id ? {...each, title: updatedTitle} : each,
      ),
    })
  }

  toggleComplete = id => {
    const {todosList} = this.state

    this.setState({
      todosList: todosList.map(each =>
        each.id === id ? {...each, isCompleted: !each.isCompleted} : each,
      ),
    })
  }

  render() {
    const {todosList, todoInput} = this.state

    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="heading">Simple Todos</h1>

          <div className="add-container">
            <input
              type="text"
              value={todoInput}
              onChange={this.onChangeInput}
              placeholder="Enter Todo"
            />
            <button type="button" onClick={this.addTodo}>
              Add
            </button>
          </div>

          <ul className="todos-list">
            {todosList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                deleteTodo={this.deleteTodo}
                updateTodo={this.updateTodo}
                toggleComplete={this.toggleComplete}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
