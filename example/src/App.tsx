import React from 'react'
import { LeafPoll } from 'react-leaf-polls'
import 'react-leaf-polls/dist/index.css'

const resData = [
  { text: 'Answer1', votes: 0 },
  { text: 'Answer2', votes: 0 },
  { text: 'Answer3', votes: 0 }
]

const themeData = {
  // textColor: 'white',
  // mainColor: 'red',
  // backgroundColor: 'white',
  // alignment: 'left',
  // fontSize: 12
}

const App = () => {
  return (
    <LeafPoll
      type='multiple'
      question='How long do you?'
      results={resData}
      theme={themeData}
    />
  )
}

export default App
