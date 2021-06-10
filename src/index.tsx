import * as React from 'react'
import { BinaryPoll, BinaryPollProps } from './components/BinaryPoll/BinaryPoll'
import {
  MultiplePoll,
  MultiplePollProps
} from './components/MultiplePoll/MultiplePoll'
import { OrderPoll, OrderPollProps } from './components/OrderPoll/OrderPoll'
import { Result } from './types/result'

interface Props extends BinaryPollProps, MultiplePollProps, OrderPollProps {
  type: 'binary' | 'multiple' | 'order'
}

const LeafPoll = ({ type, question, results, theme, onVote }: Props) => {
  return type === 'binary' ? (
    <BinaryPoll
      question={question}
      results={results}
      theme={theme}
      onVote={onVote}
    />
  ) : type === 'multiple' ? (
    <MultiplePoll
      question={question}
      results={results}
      theme={theme}
      onVote={onVote}
    />
  ) : (
    <OrderPoll
      question={question}
      results={results}
      theme={theme}
      onVote={onVote}
    />
  )
}

export { LeafPoll, Result }
