import React from 'react'
import { LeafPoll } from 'react-leaf-polls'
import 'react-leaf-polls/dist/index.css'

// const resData = [
//   { text: 'YES', votes: 4 },
//   { text: 'NO', votes: 7 }
// ]

const resData2 = [
  { text: 'React', votes: 9 },
  { text: 'Vue', votes: 7 },
  { text: 'Angular', votes: 2 }
]

const themeData = {
  // textColor: '',
  mainColor: '#00B87B',
  backgroundColor: 'white',
  alignment: 'center',
  leftColor: '#00B87B',
  rightColor: '#FF2E00'
}

function vote(item?: any) {
  console.log('voted', item)
}

const App = () => {
  return (
    <div
      style={{
        margin: '300px auto',
        width: '500px'
      }}
    >
      {/* <LeafPoll type='binary'
        question='Do you like Angular?'
        results={resData}
        theme={themeData}
        onVote={vote}
      /> */}
      <LeafPoll
        type='multiple'
        question='Pick your favorite framework.'
        results={resData2}
        theme={themeData}
        onVote={vote}
      />
    </div>
  )
}

export default App
