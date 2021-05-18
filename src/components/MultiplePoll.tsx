import * as React from 'react'
import styles from './MultiplePoll.module.css'

interface Props {
  text: string
}

export const MultiplePoll = ({ text }: Props) => {
  return <div className={styles.test}>Example Component: {text}</div>
}
