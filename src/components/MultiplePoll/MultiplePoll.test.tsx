import * as React from 'react'
import { MultiplePoll } from './MultiplePoll'
import * as utils from './utils'

import 'jest-enzyme'
import { shallow, configure, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('multiple poll specs', () => {
  let wrapper: ShallowWrapper
  let resData: any[]

  beforeEach(() => {
    resData = [
      { text: 'Answer 1', votes: 0 },
      { text: 'Answer 2', votes: 1, percentage: 33 },
      { text: 'Answer 3', votes: 2 }
    ]
    wrapper = shallow(<MultiplePoll question='question' results={resData} />)
  })

  it('counts right % value and adds percentage key if doesnt exist', () => {
    expect(resData[0].percentage).toBeUndefined()
    resData[0].votes++
    utils.countPercentage(resData)
    expect(resData[0].percentage).toEqual(25)
  })

  it('counts right % value and modifies data', () => {
    expect(resData[1].percentage).toEqual(33)
    resData[1].votes++
    utils.countPercentage(resData)
    expect(resData[1].percentage).toEqual(50)
  })

  it('renders question when prop is passed', () => {
    expect(wrapper.find('h1').text()).toEqual('question')
  })
})
