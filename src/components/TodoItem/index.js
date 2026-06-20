// Write your code here

import {useState} from 'react'
import './index.css'

const TodoItem = props => {
  const {todoDetails, deleteTodo, updateTodo, toggleComplete} = props

  const {id, title, isCompleted} = todoDetails

  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(title)

  const onDelete = () => {
    deleteTodo(id)
  }

  const onSave = () => {
    updateTodo(id, editText)
    setIsEditing(false)
  }

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => toggleComplete(id)}
      />

      {isEditing ? (
        <input value={editText} onChange={e => setEditText(e.target.value)} />
      ) : (
        <p className={isCompleted ? 'completed title' : 'title'}>{title}</p>
      )}

      {isEditing ? (
        <button type="button" onClick={onSave}>
          Save
        </button>
      ) : (
        <button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      )}

      <button className="delete-button" type="button" onClick={onDelete}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem
