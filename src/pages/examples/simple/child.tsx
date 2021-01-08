import React from 'react'
import ChildPage from '@/components/examples/simple/children'
import Nav from '@/projectContainers/nav'

const child = (): JSX.Element => {
  return (
    <>
      <Nav />
      <ChildPage name='Artem' age={23}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus, qui omnis odit deleniti
        quo officiis dolor tempore illum obcaecati debitis repellat eaque dolores maxime aliquam.
        Facilis atque amet debitis iure mollitia qui in alias consequuntur cupiditate molestias
        totam eum maiores ipsum expedita enim aspernatur dolorum modi est obcaecati tempora,
        incidunt perferendis. Harum, ut fugiat, voluptatibus fuga culpa obcaecati adipisci natus
        sunt error dolorum, quam iusto! Consequatur modi officiis quod doloribus repudiandae
        quisquam assumenda eius quidem ex aspernatur perspiciatis laborum voluptate sapiente sed,
        labore maiores unde aperiam vitae recusandae dicta dolorem! Voluptates facilis ut mollitia
        quidem harum, a natus id suscipit.
      </ChildPage>
    </>
  )
}

export default child
