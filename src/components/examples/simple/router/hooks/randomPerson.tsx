import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import axios from 'axios'

type props = RouteComponentProps<{
  results: string
}>

const DynamicComponent: React.FC<props> = ({ results = 0 }): JSX.Element => {
  const [person, setPerson] = useState<any>()
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`https://randomuser.me/api?results=${results}`)
      setPerson(data)
    }

    fetchData()
  }, [results])

  return (
    <div>
      <pre>{JSON.stringify(person, null, 4)}</pre>
    </div>
  )
}

export default DynamicComponent
