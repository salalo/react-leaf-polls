import * as React from 'react'
import { BinaryPoll } from './BinaryPoll'
import * as utils from './utils'

import 'jest-enzyme'
import { shallow, configure, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('binary poll specs', () => {
  let wrapper: ShallowWrapper
  let resData: any[]

  beforeEach(() => {
    resData = [
      { text: 'YES', votes: 1, percentage: 33 },
      { text: 'NO', votes: 2 }
    ]
    wrapper = shallow(<BinaryPoll question='question' results={resData} />)
  })

  it('counts right % value and adds percentage key if doesnt exist', () => {
    expect(resData[1].percentage).toBeUndefined()
    resData[0].votes++
    utils.countPercentage(resData)
    expect(resData[1].percentage).toEqual(50)
  })

  it('counts right % value and modifies data', () => {
    expect(resData[0].percentage).toEqual(33)
    // it's equal to click logic for this function
    resData[0].votes++
    utils.countPercentage(resData)
    expect(resData[0].percentage).toEqual(50)
  })

  it('simulates the click on the answer', () => {
    const spy = jest.spyOn(utils, 'manageVote')
    wrapper.find('#binAnswer0').simulate('click')
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('renders question when prop is passed', () => {
    expect(wrapper.find('h1').text()).toEqual('question')
  })
})
