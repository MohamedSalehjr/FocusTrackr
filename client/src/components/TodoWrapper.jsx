import React from 'react'
import TodoForm from "./TodoForm"
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Todo from './Todo'


uuidv4();

const TodoWrapper = () => {

  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos')
    return storedTodos ? JSON.parse(storedTodos) : [];
  })


  const addTodo = todo => {
    setTodos([...todos, { id: uuidv4(), task: todo, completed: false, }])
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])


  return (
    <div className="TodoWrapper mt-10">
      <TodoForm addTodo={addTodo} />
      {todos.map((todo, index) => (
        <Todo task={todo} key={index}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  )
}


export default TodoWrapper
