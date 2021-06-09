import React, { useState, useRef, createRef, RefObject } from 'react'
import styles from './MultiplePoll.module.css'
import { manageVote } from './utils'
import type { Result } from '../../types/result'
import type { Theme } from '../../types/theme'

interface MultiplePollProps {
  question?: string
  results: Result[]
  theme?: Theme
  onVote?(item: Result, results: Result[]): void
}

const MultiplePoll = ({
  question,
  results,
  theme,
  onVote
}: MultiplePollProps) => {
  const [voted, setVoted] = useState<boolean>(false)
  const answerRefs = useRef<RefObject<HTMLDivElement>[]>(
    results.map(() => createRef<HTMLDivElement>())
  )

  return (
    <article
      className={styles.container}
      style={{ alignItems: theme?.alignment }}
    >
      {question && <h1 style={{ color: theme?.textColor }}>{question}</h1>}

      {results.map((result, index) => (
        <div
          key={index}
          role='button'
          className={
            voted ? styles.answer : styles.answer_hover + ' ' + styles.answer
          }
          style={{
            backgroundColor: theme?.backgroundColor
          }}
          onClick={() => {
            if (!voted) {
              setVoted(true)
              manageVote(results, result, index, answerRefs, theme)
              onVote?.(result, results)
            }
          }}
        >
          <div ref={answerRefs.current[index]} className={styles.answerInner}>
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
