import React, { useState } from 'react'
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
  const answers: HTMLElement[] = []
  const restOfAnswersIndexes: number[] = []

  for (const i in results) {
    if (parseInt(i) !== index) restOfAnswersIndexes.push(parseInt(i))
    const answerBuffer: HTMLElement | null = document.getElementById(
      'mul-answer' + i
    )
    answerBuffer && answers.push(answerBuffer)
  }

  if (answers) {
    // animate clicked answer
    answers[index].animate(
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
    answers[index].style.width = `${results[index].percentage}%`
    answers[index].style.backgroundColor = '#00B87B'

    // animate rest of answers (not clicked)
    restOfAnswersIndexes.map((i) => {
      answers[i].animate(
        [
          { width: 0, easing: 'ease-out', backgroundColor: 'white' },
          {
            width: `${results[i].percentage}%`,
            easing: 'ease-out',
            backgroundColor: '#efefef'
          }
        ],
        500
      )
      answers[i].style.width = `${results[i].percentage}%`
      answers[i].style.backgroundColor = '#efefef'
    })
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
  const [voted, setVoted] = useState<Boolean>(false)

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
            if (!voted) {
              setVoted(true)
              manageVote(results, result, index)
              onVote && onVote(result)
            }
          }}
        >
          <div id={'mul-answer' + index} className={styles.answerInner}>
            <p style={{ color: theme?.textColor }}>{result.text}</p>
          </div>
          {voted && (
            <span style={{ color: theme?.textColor }}>
              {result.percentage}%
            </span>
          )}
        </div>
      ))}
    </article>
  )
}

export { MultiplePoll, MultiplePollProps }
