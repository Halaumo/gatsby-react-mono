import { RootStoreMobx, PersonMobx } from '@/store/randomPerson/interfaces'

class Person  implements PersonMobx {
  data: string
  rs: RootStoreMobx
  api: { [key: string]: Function }

  constructor (rs: RootStoreMobx) {
    this.rs = rs
    this.api = rs.api.person!
  }

}

export default Person
