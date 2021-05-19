import * as React from 'react'
import { BinaryPoll, BinaryPollProps } from './components/BinaryPoll'
import { MultiplePoll, MultiplePollProps } from './components/MultiplePoll'

interface Props extends BinaryPollProps, MultiplePollProps {
  type: 'binary' | 'multiple'
}

const LeafPoll = ({ type, question, results, theme }: Props) => {
  return type === 'binary' ? (
    <BinaryPoll question={question} results={results} theme={theme} />
  ) : (
    <MultiplePoll question={question} results={results} theme={theme} />
  )
}

export { LeafPoll, Props }
