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
  animateAnswers(index, results)
}

function animateAnswers(index: number, results: Result[]): void {
  const answer: HTMLElement | null = document.getElementById(
    'mul-answer' + index
  )

  console.log(results)
  if (answer) {
    answer.animate(
      [
        { width: 0, easing: 'ease-out', backgroundColor: 'white' },
        {
          width: `${results[index].percentage}%`,
          easing: 'ease-out',
          backgroundColor: '#00B87B'
        }
      ],
      500
    )
    answer.style.width = `${results[index].percentage}%`
    answer.style.backgroundColor = '#00B87B'
  }
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
          <div id={'mul-answer' + index} className={styles.answerInner}>
            <p style={{ color: theme?.textColor }}>{result.text}</p>
          </div>
        </div>
      ))}
    </article>
  )
}

export { MultiplePoll, MultiplePollProps }
