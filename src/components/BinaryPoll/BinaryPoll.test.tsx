import * as React from 'react'
import { BinaryPoll } from './BinaryPoll'
import * as utils from './utils'

import 'jest-enzyme'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('binary poll specs', () => {
  // countPercentage()
  // % key exists in the object
  // % key stores the right value?
  // animateAnswers()
  // % value renders and is equal to the object value
  // background color of clicked answer changes
  // width is equal to % value
  // height does not change
  it('simulates the click on the answer', () => {
    const resData = [
      { text: 'YES', votes: 3 },
      { text: 'NO', votes: 100 }
    ]
    const wrapper = shallow(<BinaryPoll question='sdf' results={resData} />)
    const spy = jest.spyOn(utils, 'manageVote')
    wrapper.find('#binAnswer1').simulate('click')
    expect(spy).toHaveBeenCalledTimes(1)

    //const mockCb = jest.fn()
    //expect(manageVote).toHaveBeenCalledTimes(1)
    //console.log(binaryPoll.find('#binAnswer0').debug())
    //expect(mockCb.mock.calls.length).toEqual(1)
  })
  it('reners question when prop passed', () => {
    const resData = [
      { text: 'YES', votes: 3 },
      { text: 'NO', votes: 100 }
    ]
    const wrapper = shallow(
      <BinaryPoll question='question' results={resData} />
    )
    expect(wrapper.find('h1').text()).toEqual('question')
  })
})
