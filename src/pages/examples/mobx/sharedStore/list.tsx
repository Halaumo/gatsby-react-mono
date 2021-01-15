import React, { useContext } from 'react'
import Nav from '@/hocs/nav'
import { observer } from 'mobx-react-lite'
import storeContext from '@/store/sharedStore/store'

const List = (): JSX.Element => {
  const store = useContext(storeContext)
  return (
    <>
      <Nav />

      <div style={{ margin: '20px' }}>
        {store.posts.map((el) => (
          <p style={{ border: '2px solid black', marginTop: '5px' }} key={el.id}>
            {el.data}
          </p>
        ))}
      </div>
    </>
  )
}

export default observer(List)
