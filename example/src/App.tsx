import React from 'react'
import { LeafPoll, Result } from 'react-leaf-polls'
import 'react-leaf-polls/dist/index.css'

const resData = [
  { text: 'YES', votes: 3 },
  { text: 'NO', votes: 100 }
]

const resData2 = [
  { text: 'React', votes: 9 },
  { text: 'Vue', votes: 7 },
  { text: 'Angular', votes: 2 }
]

const resData3 = [
  { text: 'React', votes: [2, 1, 0] },
  { text: 'Vue', votes: [4, 5, 2] },
  { text: 'Angular', votes: [0, 3, 1] }
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
      />
      <LeafPoll
        type='multiple'
        question='Pick your favorite framework.'
        results={resData2}
        theme={themeData}
        onVote={vote}
      />
      <LeafPoll
        type='order'
        question='The question'
        results={resData3}
        theme={themeData}
        onVote={vote}
      />
    </div>
  )
}

export default App
