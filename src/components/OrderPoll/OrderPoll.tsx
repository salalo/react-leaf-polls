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

  const genBgColor = (index: number, hex: string = ''): string => {
    const alpha = Math.abs(index - localResults.length) / localResults.length
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)

    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
  }

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
            genBgColor={genBgColor(index, theme?.mainColor)}
          />
        ))}
      </DndProvider>
    </article>
  )
}

export { OrderPoll, OrderPollProps }
