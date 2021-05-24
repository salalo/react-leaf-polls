import * as React from 'react'
import styles from './MultiplePoll.module.css'

import type { Result } from '../types/result'
import type { Theme } from '../types/theme'

interface MultiplePollProps {
  question?: string
  results: Result[]
  theme?: Theme
  onVote?(item: Result): void
}

function manageVote(results: Result[], item: Result, index: number): void {
  item.votes++
  countPercentage(results)
  console.log(index, results)
  // animate
  // change state and reveal data
}

function countPercentage(results: Result[]): void {
  const votes: number[] = []
  let sum: number = 0

  results.map((result) => {
    votes.push(result.votes)
    sum += result.votes
  })

  for (const i in votes) {
    results[i].percentage = Math.floor((votes[i] / sum) * 100)
  }
}

const MultiplePoll = ({
  question,
  results,
  theme,
  onVote
}: MultiplePollProps) => {
  return (
    <article
      className={styles.container}
      style={{ alignItems: theme?.alignment }}
    >
      {question && <h1 style={{ color: theme?.textColor }}>{question}</h1>}

      {results.map((result, index) => (
        <div
          key={index}
          className={styles.answer}
          style={{ backgroundColor: theme?.backgroundColor }}
          onClick={() => {
            manageVote(results, result, index)
            onVote && onVote(result)
          }}
        >
          <p style={{ color: theme?.textColor }}>{result.text}</p>
        </div>
      ))}
    </article>
  )
}

export { MultiplePoll, MultiplePollProps }
