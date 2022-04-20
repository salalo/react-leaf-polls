import React, { useState, useEffect, useRef, createRef, RefObject } from 'react'
import styles from './MultiplePoll.module.css'
import { manageVote, countPercentage, animateAnswers } from './utils'
import type { Result } from '../../types/result'
import type { Theme } from '../../types/theme'

interface MultiplePollProps {
  question?: string
  results: Result[]
  theme?: Theme
  isVoted?: boolean
  onVote?(item: Result, results: Result[]): void
}

const MultiplePoll = ({
  question,
  results,
  theme,
  onVote,
  isVoted = false
}: MultiplePollProps) => {
  const [voted, setVoted] = useState<boolean>(isVoted)
  const answerRefs = useRef<RefObject<HTMLDivElement>[]>(
    results.map(() => createRef<HTMLDivElement>())
  )

  useEffect(() => {
    if (isVoted) {
      countPercentage(results)
      animateAnswers(results, answerRefs)
    }
  }, [])

  return (
    <article
      className={styles.container}
      style={{ alignItems: theme?.alignment }}
    >
      {question && <h1 style={{ color: theme?.textColor }}>{question}</h1>}

      {results.map((result) => (
        <div
          key={result.id}
          role='button'
          id={'mulAnswer' + result.id}
          className={
            voted ? styles.answer : styles.answer_hover + ' ' + styles.answer
          }
          style={{
            backgroundColor: theme?.backgroundColor
          }}
          onClick={() => {
            if (!voted) {
              setVoted(true)
              manageVote(results, result, answerRefs, theme)
              onVote?.(result, results)
            }
          }}
        >
          <div
            ref={answerRefs.current[result.id]}
            className={styles.answerInner}
          >
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
