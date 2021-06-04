import * as React from 'react'
import { BinaryPoll, BinaryPollProps } from './components/BinaryPoll'
import { MultiplePoll, MultiplePollProps } from './components/MultiplePoll'
import { Result } from './types/result'

interface Props extends BinaryPollProps, MultiplePollProps {
  type: 'binary' | 'multiple'
}

const LeafPoll = ({ type, question, results, theme, onVote }: Props) => {
  return type === 'binary' ? (
    <BinaryPoll
      question={question}
      results={results}
      theme={theme}
      onVote={onVote}
    />
  ) : (
    <MultiplePoll
      question={question}
      results={results}
      theme={theme}
      onVote={onVote}
    />
  )
}

export { LeafPoll, Result }
