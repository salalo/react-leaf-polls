<!-- # react-leaf-polls -->

# ![](logo.svg)

<b>react-leaf-polls</b> is a set of multiple reusable and customizable poll types.

[![NPM Version](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/react-leaf-polls)
[![NPM Downloads](https://img.shields.io/npm/dw/npm.svg)](https://www.npmjs.com/package/react-leaf-polls)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/WojciechSala/react-leaf-polls/blob/master/LICENSE)

# ![](binPoll.gif) ![](mulPoll.gif)

## Install

### NPM

```bash
npm i --save react-leaf-polls
```

### Yarn

```bash
yarn add react-leaf-polls
```

## Usage

```tsx
import { LeafPoll } from 'react-leaf-polls'

// Persistent data array (typically fetched from the server)
const resData = [
  { text: 'Answer 1', votes: 0 },
  { text: 'Answer 2', votes: 0 },
  { text: 'Answer 3', votes: 0 }
]

const customTheme = {
  textColor: 'black',
  mainColor: '#00B87B',
  backgroundColor: 'rgb(255,255,255)',
  alignment: 'center'
}

const App = () => {
  return (
    <LeafPoll
      type='multiple'
      question='What you wanna ask?'
      results={resData}
      theme={customTheme}
    />
  )
}
```

## Component Props

| Prop     |                  Type/Options                  | Required |         Default         | Description                                                                                                                                                                                                                                                    |
| -------- | :--------------------------------------------: | :------: | :---------------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type     |             "multiple" or "binary"             |    ✔     |         binary          | Determines rendered poll type. Binary is recommended for yes-no questions where multiple is "one from many".                                                                                                                                                   |
| question |                     String                     |    ✖     |                         | Question visible on top of the poll. Invisible if not set.                                                                                                                                                                                                     |
| results  | Array of objects with keys "text" and "votes". |    ✔     |                         | Results data is visible to the user after the vote. <br> Should be stored permanently! Usually red and wrote to the persistent storage source. <br> Array is modified every time user votes by incrementing the "votes" value and adding "percentage" element. |
| theme    |       Object <br>More in the table below       |    ✖     | More in the table below | Theme allows you to customize the look and feel of given poll. Depending on poll type there are different options.                                                                                                                                             |
| onVote   |                    function                    |    ✖     |                         | Callback function running when user picks the answer. Returns the clicked item's object as an argument.                                                                                                                                                        |

### Theme options

Theme is an object where no value is mandatory. Colors can get any type of color notations.

| Option          | Default | Poll type | Description                                                                                |
| --------------- | :-----: | :-------: | ------------------------------------------------------------------------------------------ |
| mainColor       | #00B87B | multiple  | Marks the picked answer after the vote.                                                    |
| textColor       | #19181f |   both    | Color of question's and answer's text.                                                     |
| leftColor       |         |  binary   | Color of left cell's text in the binary poll.                                              |
| rightColor      |         |  binary   | Color of right cell's text in the binary poll.                                             |
| backgroundColor | #ffffff |   both    | Background of answer's pane.                                                               |
| alignment       | center  |   both    | Changes container's align-items property. <br> "start", "center" or "end" is only allowed. |

## License

MIT © [WojciechSala](https://github.com/WojciechSala)
