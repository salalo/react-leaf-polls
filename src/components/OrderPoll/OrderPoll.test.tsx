import * as React from 'react'
import { OrderPoll } from './OrderPoll'

import 'jest-enzyme'
import { shallow, configure, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('multiple poll specs', () => {
  let wrapper: ShallowWrapper
  let resData: any[]

  beforeEach(() => {
    resData = [
      { text: 'YES', votes: 1, percentage: 33 },
      { text: 'NO', votes: 2 }
    ]
    wrapper = shallow(<OrderPoll question='question' results={resData} />)
  })

  it('', () => {})
})
