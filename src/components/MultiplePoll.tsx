import * as React from 'react'
import styles from './MultiplePoll.module.css'

import type { Result } from '../types/result'
import type { Theme } from '../types/theme'

interface MultiplePollProps {
  question?: string
  results: Result[]
  theme?: Theme
}

const MultiplePoll = ({ question, results, theme }: MultiplePollProps) => {
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
        >
          <p style={{ color: theme?.textColor }}>{result.text}</p>
        </div>
      ))}
    </article>
  )
}

export { MultiplePoll, MultiplePollProps }
