import * as React from 'react'
import styles from './BinaryPoll.module.css'

import type { Result } from '../types/result'
import type { Theme } from '../types/theme'

// move to types if iit will be the same as MultiplePollProps
interface BinaryPollProps {
  question?: string
  results: Result[]
  theme?: Theme
}

const BinaryPoll = ({ question, results, theme }: BinaryPollProps) => {
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
        <div className={styles.answer}>
          <p style={{ color: theme?.leftColor }}>{results[0].text}</p>
        </div>
        <div className={styles.answer}>
          <p style={{ color: theme?.rightColor }}>{results[1].text}</p>
        </div>
      </div>
    </article>
  )
}

export { BinaryPoll, BinaryPollProps }
