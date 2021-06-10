import React from 'react'
import styles from './OrderPoll.module.css'
import type { Result } from '../../types/result'
import type { Theme } from '../../types/theme'

interface OrderPollProps {
  question?: string
  results: Result[]
  theme?: Theme
  onVote?(item: Result, results: Result[]): void
}

const OrderPoll = ({ question }: OrderPollProps) => {
  return <article className={styles.container}>{question}</article>
}

export { OrderPoll, OrderPollProps }
