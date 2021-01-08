import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  myTable: {
    margin: '15px 0 0 15px',
    border: '1px solid black',
    borderCollapse: 'collapse',
    '& th, td': {
      padding: '4px 8px',
      border: '1px solid black',
    },
    '& tr:nth-child(even)': {
      backgroudColor: '#8e8e8e',
    },
    '& caption': {
      padding: 4,
      borderRight: '1px solid black',
      borderTop: '1px solid black',
      borderLeft: '1px solid black',
      fontSize: 18,
    },
  },
})

const Table = () => {
  const styles = useStyles()

  const TrRender: React.FC<{ data: (string | number)[] }> = ({ data }): JSX.Element => {
    return (
      <tr>
        {data.map((el, i) => {
          return <td key={`el${i}`}>{el}</td>
        })}
      </tr>
    )
  }

  return (
    <>
      <table className={styles.myTable}>
        <caption>Таблица</caption>
        <thead>
          <tr>
            <th rowSpan={2}>Ученик</th>
            <th colSpan={3}>Период обучения</th>
          </tr>

          <tr>
            <th>1 триместр</th>
            <th>2 триместр</th>
            <th>3 триместр</th>
          </tr>
        </thead>

        <tbody>
          {new Array(30).fill(['ФИО', 1, 2, 3]).map((el: (string | number)[], i) => {
            return <TrRender key={i} data={el} />
          })}
        </tbody>

        <tfoot>
          <tr>
            <td>Средняя</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
        </tfoot>
      </table>
    </>
  )
}

export default Table
