import * as React from 'react'
import { BinaryPoll } from './components/BinaryPoll'
import { MultiplePoll, PollProps } from './components/MultiplePoll'

interface Props extends PollProps {
  type: 'binary' | 'multiple'
}

const LeafPoll = ({ type, question, results, theme }: Props) => {
  return type === 'binary' ? (
    <BinaryPoll text='bin' />
  ) : (
    <MultiplePoll question={question} results={results} theme={theme} />
  )
}

export { LeafPoll, Props }
