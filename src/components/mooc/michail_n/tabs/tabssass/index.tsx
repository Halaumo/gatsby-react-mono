import React, { useState } from 'react'
import css from './index.module.sass'
import classNames from 'classnames'

const createArray = (
  count: number,
  value: any,
  uniqueValue: any,
  uniqueIndex: number
) => {
  const arr = new Array(count)
    .fill(value)
    .fill(uniqueValue, uniqueIndex, uniqueIndex + 1)

  return arr
}

const Index = () => {
  const [tabsHead, setTabsHead] = useState(
    createArray(
      5,
      classNames(css.tabs_head__item),
      classNames(css.tabs_head__item, css.tabs_head__item___active),
      0
    )
  )

  const handler = (e: any, index: number) => {
    if (!tabsHead[index].includes(css.tabs_head__item___active)) {
      const newTabsHead = createArray(
        5,
        classNames(css.tabs_head__item),
        classNames(css.tabs_head__item, css.tabs_head__item___active),
        index
      )
      setTabsHead(newTabsHead)

      const newTabsContent = createArray(
        5,
        classNames(css.tabs_content__item),
        classNames(css.tabs_content__item, css.tabs_content__item___active),
        index
      )

      setTabsContent(newTabsContent)
    }
  }

  const [tabsContent, setTabsContent] = useState(createArray(
    5,
    classNames(css.tabs_content__item),
    classNames(css.tabs_content__item, css.tabs_content__item___active),
    0
  ))

  return (
    <>
      <div className={css.tabs}>
        <div className={css.tabs_head}>
          {tabsHead.map((el, index) => {
            return (
              <div
                key={index}
                className={tabsHead[index]}
                onClick={(e) => handler(e, index)}>
                {index}
              </div>
            )
          })}
        </div>

        <div className={css.tabs_content}>
          {tabsContent.map((el, index) => {
            return (
              <div key={index} className={tabsContent[index]}>
                {`content ${index}`}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Index
