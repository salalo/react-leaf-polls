import React from 'react'
import { LeafPoll, Result } from 'react-leaf-polls'
import 'react-leaf-polls/dist/index.css'

const resData = [
  { id: 0, text: 'YES', votes: 3 },
  { id: 1, text: 'NO', votes: 10 }
]

const resData2 = [
  { id: 0, text: 'React', votes: 9 },
  { id: 1, text: 'Vue', votes: 7 },
  { id: 2, text: 'Angular', votes: 2 }
]

const themeData = {
  textColor: '#19181f',
  mainColor: '#00B87B',
  backgroundColor: 'white',
  alignment: 'center',
  leftColor: '#00B87B',
  rightColor: '#FF2E00'
}

function vote(item: Result, results: Result[]) {
  console.log('voted', item, results)
}

const App = () => {
  return (
    <div
      style={{
        margin: '300px auto',
        width: '500px'
      }}
    >
      <LeafPoll
        type='binary'
        question='Do you like Angular?'
        results={resData}
        theme={themeData}
        onVote={vote}
        isVoted={true}
      />
      <LeafPoll
        type='multiple'
        question='Pick your favourite framework.'
        results={resData2}
        theme={themeData}
        onVote={vote}
      />
    </div>
  )
}

export default App
