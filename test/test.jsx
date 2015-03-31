/** @jsx phrase.createElement */
/* eslint-env mocha */

import * as phrase from '..'
import {expect} from 'chai'
import inherits from 'inherits'
import {version} from '../package'

describe('lacona-phrase', () => {
  it('provides shorthand constructors', () => {
    ;['choice', 'content', 'literal', 'separator', 'sequence'].forEach(Con => {
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

  it('createPhrase maps to a class', () => {
    class Test1 extends phrase.Phrase {
      create() {this.test = 0}
      someMethod() {return 1}
      static get translations() {return 2}
      static get extensions() {return 3}
      static get defaultProps() {return 4}
      static get sources() {return 5}
    }

    class Test2 extends phrase.Phrase {
      create() {this.test = 0}
      someMethod() {return 1}
    }
    Test2.translations = 2
    Test2.extensions = 3
    Test2.defaultProps = 4
    Test2.sources = 5

    const Test3 = phrase.createPhrase({
      create() {this.test = 0},
      someMethod() {return 1},
      translations: 2,
      extensions: 3,
      defaultProps: 4,
      sources: 5
    })

    ;[Test1, Test2, Test3].forEach(Phrase => {
      const newPhrase = new Phrase()
      newPhrase.create()
      expect(newPhrase).to.be.an.instanceof(phrase.Phrase)
      expect(newPhrase.test).to.equal(0)
      expect(newPhrase.someMethod()).to.equal(1)
      expect(Phrase.translations).to.equal(2)
      expect(Phrase.extensions).to.equal(3)
      expect(Phrase.defaultProps).to.equal(4)
      expect(Phrase.sources).to.equal(5)
    })
  })
})
