import React, { useState, useContext, useEffect } from 'react'
import Nav from '@/hocs/nav'
import { observer } from 'mobx-react-lite'
import storeContext from '@/store/sharedStore/store'

const AddPost = (): JSX.Element => {
  const store = useContext(storeContext)
  const [data, setData] = useState('')

  const textAreaCB = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
     setData(e.target.value)
  }
  const buttonCB = () => {
    store.addPost(data)
    setData('')
  }
  return (
    <>
      <Nav visible={false}/>

      <div style={{ margin: '20px' }}>
        <div >
          <textarea style={{ border: '2px solid black' }} onChange={textAreaCB} value={data}></textarea>
        </div>

        <div>
          <button
            onClick={buttonCB}>
            Add post
          </button>
        </div>
      </div>
    </>
  )
}

export default observer(AddPost)
