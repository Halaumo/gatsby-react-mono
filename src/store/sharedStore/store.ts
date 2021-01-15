import { makeObservable, observable, action } from 'mobx'
import { createContext } from 'react'

type post = { id: number, data: string }

class Store {
  posts: post[] = []

  constructor() {
    makeObservable(this, {
      posts: observable,
      addPost: action.bound,
    })
  }

  addPost(data: string): void {
    const post = { id: this.posts.length, data }
    this.posts.push(post)
  }
}
const storeContext = createContext(new Store())
export default storeContext
