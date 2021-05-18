import * as React from 'react'
import styles from './BinaryPoll.module.css'

interface Props {
  text: string
}

export const BinaryPoll = ({ text }: Props) => {
  return <div className={styles.test}>{text}</div>
}
