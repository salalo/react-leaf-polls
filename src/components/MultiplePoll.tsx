import * as React from 'react'
import styles from './MultiplePoll.module.css'

import type { Result } from '../types/result'
import type { Theme } from '../types/theme'

interface PollProps {
  question?: string
  results: Result[]
  theme?: Theme
}

const MultiplePoll = ({ question, results, theme }: PollProps) => {
  return (
    <article className={styles.container}>
      {question && (
        <h1 className={styles.question} style={{ color: theme?.textColor }}>
          {question}
        </h1>
      )}

      {results.map((result, index) => (
        <p key={index}>{result.text}</p>
      ))}
    </article>
  )
}

export { MultiplePoll, Result, PollProps }
