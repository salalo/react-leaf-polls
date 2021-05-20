import * as React from 'react'
import styles from './BinaryPoll.module.css'

import type { Result } from '../types/result'
import type { Theme } from '../types/theme'

// move to types if iit will be the same as MultiplePollProps
interface BinaryPollProps {
  question?: string
  results: Result[]
  theme?: Theme
  onVote?(item: Result): void
}

function manageVote(results: Result[], item: Result): void {
  item.votes++
  countPercentage(results)
  // animate
  // change state and reveal data
}

function countPercentage(results: Result[]): Array<number> {
  const sum: number = results[0].votes + results[1].votes
  const percentageValues: number[] = []

  percentageValues[0] = Math.floor((results[0].votes / sum) * 100)
  percentageValues[1] = Math.floor((results[1].votes / sum) * 100)

  console.log(percentageValues)
  return percentageValues
}

const BinaryPoll = ({ question, results, theme, onVote }: BinaryPollProps) => {
  return (
    <article
      className={styles.container}
      style={{ alignItems: theme?.alignment }}
    >
      {question && <h1 style={{ color: theme?.textColor }}>{question}</h1>}

      <div
        className={styles.inner}
        style={{ backgroundColor: theme?.backgroundColor }}
      >
        <div
          className={styles.answer}
          onClick={() => {
            manageVote(results, results[0])
            onVote && onVote(results[0])
          }}
        >
          <p style={{ color: theme?.leftColor }}>{results[0].text}</p>
        </div>
        <div
          className={styles.answer}
          onClick={() => {
            manageVote(results, results[1])
            onVote && onVote(results[1])
          }}
        >
          <p style={{ color: theme?.rightColor }}>{results[1].text}</p>
        </div>
      </div>
    </article>
  )
}

export { BinaryPoll, BinaryPollProps }
