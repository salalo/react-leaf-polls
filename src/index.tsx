import * as React from 'react'
import { BinaryPoll } from './components/BinaryPoll'
import { MultiplePoll } from './components/MultiplePoll'

interface Props {
  type: string
}

export const LeafPoll = ({ type }: Props) => {
  return type === 'binary' ? (
    <BinaryPoll text='bin' />
  ) : (
    <MultiplePoll text='mul' />
  )
}
