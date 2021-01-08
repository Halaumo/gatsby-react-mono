import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  flip: {
    margin: '30px 0 0 200px',
    width: '400px',
    height: '300px',
    border: '1px solid #f1f1f1',
    // только perspective можно включать или выключать
    perspective: 1000,
    '&:hover $inner': {
      transform: 'rotateY(180deg)',
    },
  },
  inner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: 'transform 0.8s',
    transformStyle: 'preserve-3d',
  },
  front: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
  },
  back: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)',
  },
})

const Table = () => {
  const styles = useStyles()

  return (
    <>
      <div className={styles.flip}>
        <div className={styles.inner}>
          <div className={styles.front}>
            Не следует, однако забывать, что реализация намеченных плановых заданий позволяет
            оценить значение систем массового участия. Равным образом рамки и место обучения кадров
            обеспечивает широкому кругу (специалистов) участие в формировании направлений
            прогрессивного развития. С другой стороны консультация с широким активом требуют от нас
            анализа модели развития. Товарищи! постоянный количественный рост и сфера нашей
            активности требуют определения и уточнения позиций, занимаемых участниками в отношении
            поставленных задач. Таким образом реализация намеченных плановых заданий требуют от нас
            анализа соответствующий условий активизации.
          </div>
          <div className={styles.back}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec auctor risus. Donec
            maximus, ipsum nec pharetra semper, purus nisi lobortis eros, eu lacinia nunc odio in
            felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus
            mus. Pellentesque orci tellus, posuere at sapien in, ultricies fringilla ex. Ut nec
            posuere dolor. Mauris egestas nibh sagittis, ornare sem sed, ullamcorper lorem. Proin
            vehicula condimentum est, eget semper orci mollis lobortis. Suspendisse quis egestas
            felis, et semper lacus. Phasellus vel dui commodo, luctus urna eget, fermentum diam.
            Curabitur imperdiet nisi ultricies eros pulvinar, eget fermentum sem dignissim. Nunc
            lacinia lectus sed ipsum auctor aliquam. Nullam iaculis aliquam erat eu vestibulum.
            Curabitur vel dui egestas, mattis eros congue, bibendum justo. Nunc ullamcorper tellus
            quis turpis aliquam posuere. Etiam fermentum placerat tristique.
          </div>
        </div>
      </div>
    </>
  )
}

export default Table
