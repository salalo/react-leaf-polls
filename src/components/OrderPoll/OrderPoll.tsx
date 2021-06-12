import React, { useCallback, useState } from 'react'
import styles from './OrderPoll.module.css'

import type { Result } from '../../types/result'
import type { Theme } from '../../types/theme'
import { Answer } from './Answer'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'

interface OrderPollProps {
  question?: string
  results: Result[]
  theme?: Theme
  onVote?(item: Result, results: Result[]): void
}

const OrderPoll = ({ question, results, theme }: OrderPollProps) => {
  const [localResults, setResults] = useState(results)

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = localResults[dragIndex]
      setResults(
        update(localResults, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard]
          ]
        })
      )
    },
    [localResults]
  )
  return (
    <article
      className={styles.container}
      style={{ alignItems: theme?.alignment }}
    >
      {question && <h1 style={{ color: theme?.textColor }}>{question}</h1>}

      <DndProvider backend={HTML5Backend}>
          {localResults.map((result, index) => (
            <Answer
              key={result.id}
              id={result.id}
              index={index}
              theme={theme}
              result={result}
              moveCard={moveCard}
            />
          ))}
      </DndProvider>
    </article>
  )
}

export { OrderPoll, OrderPollProps }
