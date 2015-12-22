/** @jsx phrase.createElement */
/* eslint-env mocha */

import * as phrase from '..'
import {expect} from 'chai'
import inherits from 'inherits'
import {version} from '../package'

describe('lacona-phrase', () => {
  it('lowercase constructors are mapped to strings', () => {
    const result = {Constructor: 'con', props: {prop: 'test', id: 'mine'}, children: ['child'], version: version}

    expect(<con prop='test' id='mine'>child</con>).to.eql(result)
  })

  it('allows for custom constructors', () => {
    class Con extends phrase.Phrase {}
    const result = {Constructor: Con, props: {prop: 'test', id: 'mine'}, children: ['child'], version: version}

    expect(<Con prop='test' id='mine'>child</Con>).to.eql(result)
  })

  it('allows for custom constructors', () => {
    class Con extends phrase.Phrase { }

    const con = new Con({key: 'val'})

    expect(con.props).to.eql({key: 'val'})
  })
})
