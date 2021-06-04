import React, { useState, useRef, RefObject } from 'react'
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

function manageVote(
  results: Result[],
  item: Result,
  index: number,
  refs: RefObject<HTMLDivElement>[]
): void {
  item.votes++
  countPercentage(results)
  animateAnswers(index, results, refs)
}

function animateAnswers(
  index: number,
  results: Result[],
  refs: RefObject<HTMLDivElement>[]
): void {
  const answer: HTMLElement | null = refs[index].current

  // get not clicked answer element
  const oppositeIndex: number = index === 0 ? 1 : 0
  const anotherAnswer: HTMLElement | null = refs[oppositeIndex].current

  const percentage: number | undefined = results[index].percentage

  if (answer && anotherAnswer && percentage) {
    // animate background width
    answer.animate(
      [
        { width: '50%', easing: 'ease-out' },
        { width: `${percentage}%`, easing: 'ease-out' }
      ],
      500
    )
    anotherAnswer.animate(
      [
        { width: '50%', easing: 'ease-out' },
        { width: `${100 - percentage}%`, easing: 'ease-out' }
      ],
      500
    )
    answer.style.width = `${percentage}%`
    anotherAnswer.style.width = `${100 - percentage}%`

    // animate background color
    answer.animate(
      [{ backgroundColor: 'white' }, { backgroundColor: '#efefef' }],
      200
    )
    answer.style.backgroundColor = '#EFEFEF'

    // set height to the same value before and after the vote
    const height: number = answer.offsetHeight
    answer.style.padding = '0'
    anotherAnswer.style.padding = '0'

    const inner: HTMLElement | null = refs[0].current
    if (inner) inner.style.height = `${height}px`
  }
}

function countPercentage(results: Result[]): void {
  const sum: number = results[0].votes + results[1].votes

  results[0].percentage = Math.round((results[0].votes / sum) * 100)
  results[1].percentage = Math.round((results[1].votes / sum) * 100)
}

const BinaryPoll = ({ question, results, theme, onVote }: BinaryPollProps) => {
  const [voted, setVoted] = useState<boolean>(false)
  const answersContainer = useRef<HTMLDivElement>(null)
  const answer0 = useRef<HTMLDivElement>(null)
  const answer1 = useRef<HTMLDivElement>(null)
  const allRefs: RefObject<HTMLDivElement>[] = [
    answer0,
    answer1,
    answersContainer
  ]

  return (
    <article
      className={styles.container}
      style={{ alignItems: theme?.alignment }}
    >
      {question && <h1 style={{ color: theme?.textColor }}>{question}</h1>}

      <div
        ref={answersContainer}
        className={styles.inner}
        style={{ backgroundColor: theme?.backgroundColor }}
      >
        <div
          ref={answer0}
          className={styles.answer}
          onClick={() => {
            if (!voted) {
              setVoted(true)
              manageVote(results, results[0], 0, allRefs)
              onVote && onVote(results[0])
            }
          }}
        >
          <div className={styles.answerContainer}>
            <p style={{ color: theme?.leftColor }}>{results[0].text}</p>
            {voted && (
              <span style={{ color: theme?.textColor }}>
                {results[0].percentage}%
              </span>
            )}
          </div>
        </div>
        <div
          ref={answer1}
          className={styles.answer}
          onClick={() => {
            if (!voted) {
              setVoted(true)
              manageVote(results, results[1], 1, allRefs)
              onVote && onVote(results[1])
            }
          }}
        >
          <div className={styles.answerContainer}>
            <p style={{ color: theme?.rightColor }}>{results[1].text}</p>
            {voted && (
              <span style={{ color: theme?.textColor }}>
                {results[1].percentage}%
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export { BinaryPoll, BinaryPollProps }
