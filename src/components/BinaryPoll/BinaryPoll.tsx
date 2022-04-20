import React, { useState, useEffect, useRef, RefObject } from 'react'
import styles from './BinaryPoll.module.css'
import { manageVote, countPercentage, animateAnswers } from './utils'
import type { Result } from '../../types/result'
import type { Theme } from '../../types/theme'

// move to types if iit will be the same as MultiplePollProps
interface BinaryPollProps {
  question?: string
  results: Result[]
  theme?: Theme
  isVoted?: boolean
  onVote?(item: Result, results: Result[]): void
}

const BinaryPoll = ({
  question,
  results,
  theme,
  onVote,
  isVoted = false
}: BinaryPollProps) => {
  const [voted, setVoted] = useState<boolean>(isVoted)
  const answersContainer = useRef<HTMLDivElement>(null)
  const answer0 = useRef<HTMLDivElement>(null)
  const answer1 = useRef<HTMLDivElement>(null)
  const allRefs: RefObject<HTMLDivElement>[] = [
    answer0,
    answer1,
    answersContainer
  ]

  useEffect(() => {
    if (isVoted) {
      countPercentage(results)
      animateAnswers(0, results, allRefs)
    }
  }, [isVoted])

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
          role='button'
          className={styles.answer_hover + ' ' + styles.answer}
          id='binAnswer0'
          onClick={() => {
            if (!voted) {
              setVoted(true)
              manageVote(results, results[0], 0, allRefs)
              onVote?.(results[0], results)
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
          role='button'
          className={styles.answer_hover + ' ' + styles.answer}
          id='binAnswer1'
          onClick={() => {
            if (!voted) {
              setVoted(true)
              manageVote(results, results[1], 1, allRefs)
              onVote?.(results[1], results)
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
