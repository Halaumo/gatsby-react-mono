export interface PersonMobx {
  data: string
  rs: RootStoreMobx
  api: { [key: string]: Function }
}

export interface RootStoreMobx {
  api: { [key: string]: { [key: string]: Function } }
  person: PersonMobx
}
