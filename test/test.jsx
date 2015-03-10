/** @jsx phrase.createElement */
/* eslint-env mocha */

import * as phrase from '..'
import {expect} from 'chai'
import inherits from 'inherits'
import {version} from '../package'

describe('lacona-phrase', () => {
  it('provides shorthand constructors', () => {
    ;['choice', 'content', 'literal', 'repeat', 'separator', 'sequence'].forEach(Con => {
      const result = {Constructor: Con, props: {prop: 'test', id: 'mine'}, children: ['child'], version: version}

      expect(phrase.createFactory(Con)({prop: 'test', id: 'mine'}, 'child')).to.eql(result)
      expect(phrase.createElement(Con, {prop: 'test', id: 'mine'}, 'child')).to.eql(result)
      expect(<Con prop='test' id='mine'>child</Con>).to.eql(result)
      expect(phrase[Con]({prop: 'test', id: 'mine'}, 'child')).to.eql(result)
    })
  })

  it('sets the version of the data structure', () => {
    expect(phrase.createElement('literal').version).to.equal(version)
  })

  it('allows for custom constructors', () => {
    class Con extends phrase.Phrase {}
    const result = {Constructor: Con, props: {prop: 'test', id: 'mine'}, children: ['child'], version: version}

    expect(phrase.createFactory(Con)({prop: 'test', id: 'mine'}, 'child')).to.eql(result)
    expect(phrase.createElement(Con, {prop: 'test', id: 'mine'}, 'child')).to.eql(result)
    expect(<Con prop='test' id='mine'>child</Con>).to.eql(result)
  })

  it('provides a default id if none is provided', () => {
    class Con extends phrase.Phrase {}
    const result = {Constructor: Con, props: {prop: 'test', id: 'mine'}, children: ['child']}

    expect(phrase.createFactory(Con)({prop: 'test'}, 'child').props.id).to.not.be.undefined
    expect(phrase.createElement(Con, {prop: 'test'}, 'child').props.id).to.not.be.undefined
    expect(phrase.createElement(Con, null, 'child').props.id).to.not.be.undefined
    expect(phrase.createElement(Con, null).props.id).to.not.be.undefined
    expect((<Con prop='test'>child</Con>).props.id).to.not.be.undefined
    expect((<Con />).props.id).to.not.be.undefined
  })

  it('createPhrase maps to a class', () => {
    class Test1 extends phrase.Phrase {
      constructor() {this.test = 0}
      someMethod() {return 1}
      static get translations() {return 2}
      static get supplements() {return 3}
      static get overrides() {return 4}
      static get defaultProps() {return 5}
      static get initialAdditions() {return 6}
    }

    class Test2 extends phrase.Phrase {
      constructor() {this.test = 0}
      someMethod() {return 1}
    }
    Test2.translations = 2
    Test2.supplements = 3
    Test2.overrides = 4
    Test2.defaultProps = 5
    Test2.initialAdditions = 6

    const Test3 = phrase.createPhrase({
      onCreate: function () {this.test = 0},
      someMethod: function () {return 1},
      translations: 2,
      supplements: 3,
      overrides: 4,
      defaultProps: 5,
      initialAdditions: 6
    })

    ;[Test1, Test2, Test3].forEach(Phrase => {
      expect(new Phrase()).to.be.an.instanceof(phrase.Phrase)
      expect((new Phrase()).test).to.equal(0)
      expect((new Phrase()).someMethod()).to.equal(1)
      expect(Phrase.translations).to.equal(2)
      expect(Phrase.supplements).to.equal(3)
      expect(Phrase.overrides).to.equal(4)
      expect(Phrase.defaultProps).to.equal(5)
      expect(Phrase.initialAdditions).to.equal(6)
    })
  })
})
