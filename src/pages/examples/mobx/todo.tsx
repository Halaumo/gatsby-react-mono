import React from 'react'
import Nav from '@/hocs/nav'
import { makeObservable, observable, action } from 'mobx'
import { observer } from 'mobx-react-lite'
import axios, { AxiosResponse } from 'axios'

type TodoItem = { id: number; title: string; completed: boolean }

class TodoState {
  todos: TodoItem[] = [
    { id: 1, title: 'Сходи в магазин', completed: false },
    { id: 2, title: 'Посмотри телевизор', completed: false },
    { id: 3, title: 'Поставь лайк тому видео', completed: false },
  ]

  todoId: number = 4
  isFetching: boolean = false

  constructor() {
    makeObservable(this, {
      todos: observable,
      addTodo: action,
      removeTodo: action,
      completeTodo: action,
      fetchTodos: action,
    })

    // deep: true если есть глубокая вложенность объектов
  }

  addTodo(todo: TodoItem): void {
    this.todos.push(todo)
  }

  removeTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id)
  }

  completeTodo(id: number): void {
    const todo = this.todos.find((todo) => todo.id === id)
    todo!.completed = !todo!.completed

    // immutable version
    // this.todos = this.todos.map((todo) => {
    //   return todo.id === id ? { ...todo, completed: !todo.completed } : todo
    // }) as TodoItem[]
  }

  async fetchTodos(): Promise<void> {
    if (this.isFetching) return
    this.isFetching = true
    const data: AxiosResponse<TodoItem> = await axios.get(`https://jsonplaceholder.typicode.com/todos/${this.todoId}`)
    const todo = { id: data.data.id, title: data.data.title, completed: data.data.completed }
    console.log(todo)
    this.todos.push(todo)
    this.todoId++
    this.isFetching = false
  }
}

const state = new TodoState()

const Todo = (): JSX.Element => {
  return (
    <>
      <Nav />
      <div style={{ margin: '15px' }}>
        <button onClick={() => state.fetchTodos()}>Fetch todos</button>
        {state.todos.map((todo) => (
          <div key={todo.id}>
            <input
              type='checkbox'
              checked={todo.completed}
              onChange={() => state.completeTodo(todo.id)}
            />
            <span>{todo.title}</span>
            <button onClick={() => state.removeTodo(todo.id)}>X</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default observer(Todo)
