import * as personApi from '@/api/person/person'
import Person from '@/store/randomPerson/person'
import { PersonMobx, RootStoreMobx } from '@/store/randomPerson/interfaces'
import { createContext } from 'react'

class RootStore implements RootStoreMobx {
  api: { [key: string]: { [key: string]: Function } }
  person: PersonMobx

  constructor () {
    this.api = { person: personApi }
    this.person = new Person(this)
  }
}

const RootStoreContext = createContext(new RootStore())

export default new RootStore()
