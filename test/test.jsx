/** @jsx phrase.createElement */
/* eslint-env mocha */

import * as phrase from '..'
import {expect} from 'chai'
import inherits from 'inherits'

describe('lacona-phrase', () => {
  it('provides shorthand constructors', () => {
    ;['choice', 'content', 'literal', 'repeat', 'separator', 'sequence'].forEach(Con => {
      const result = {Constructor: Con, props: {prop: 'test'}, children: ['child']}

      expect(phrase.createFactory(Con)({prop: 'test'}, 'child')).to.eql(result)
      expect(phrase.createElement(Con, {prop: 'test'}, 'child')).to.eql(result)
      expect(<Con prop='test'>child</Con>).to.eql(result)
      expect(phrase[Con]({prop: 'test'}, 'child')).to.eql(result)
    })
  })

  it('allows for custom constructors', () => {
    class Con extends phrase.Phrase {}
    const result = {Constructor: Con, props: {prop: 'test'}, children: ['child']}

    expect(phrase.createFactory(Con)({prop: 'test'}, 'child')).to.eql(result)
    expect(phrase.createElement(Con, {prop: 'test'}, 'child')).to.eql(result)
    expect(<Con prop='test'>child</Con>).to.eql(result)
  })

  it('createPhrase maps to a class', () => {
    class Test1 extends phrase.Phrase {
      constructor() {this.test = 0}
      someMethod() {return 1}
      getTranslations() {return 2}
      getSupplements() {return 3}
      getOverrides() {return 4}
      getDefaultProps() {return 5}
      getInitialAdditions() {return 6}
    }

    class Test2 extends phrase.Phrase {
      constructor() {this.test = 0}
      someMethod() {return 1}
    }
    Test2.translations = 2
    Test2.supplements = 3
    Test2.overrides = 4
    Test2.defaultProps = 5
    Test2.additions = 6

    const Test3 = phrase.createPhrase({
      onCreate: function () {this.test = 0},
      someMethod: function () {return 1},
      translations: 2,
      supplements: 3,
      overrides: 4,
      defaultProps: 5,
      initialAdditions: 6
    })

    const Test4 = function () {this.test = 0}
    inherits(Test4, phrase.Phrase)
    Test4.prototype.someMethod = function() {return 1}
    Test4.prototype.getTranslations = function() {return 2}
    Test4.prototype.getSupplements = function() {return 3}
    Test4.prototype.getOverrides = function() {return 4}
    Test4.prototype.getDefaultProps = function() {return 5}
    Test4.prototype.getInitialAdditions = function() {return 6}

    expect(new Test1()).to.be.an.instanceof(phrase.Phrase)
    expect(new Test2()).to.be.an.instanceof(phrase.Phrase)
    expect(new Test3()).to.be.an.instanceof(phrase.Phrase)
    expect(new Test4()).to.be.an.instanceof(phrase.Phrase)

    expect((new Test1()).test).to.equal(0)
    expect((new Test2()).test).to.equal(0)
    expect((new Test3()).test).to.equal(0)
    expect((new Test4()).test).to.equal(0)

    expect((new Test1()).someMethod()).to.equal(1)
    expect((new Test2()).someMethod()).to.equal(1)
    expect((new Test3()).someMethod()).to.equal(1)
    expect((new Test4()).someMethod()).to.equal(1)

    expect(Test1.prototype.getTranslations()).to.equal(2)
    expect(Test2.translations).to.equal(2)
    expect(Test3.translations).to.equal(2)
    expect(Test4.prototype.getTranslations()).to.equal(2)

    expect(Test1.prototype.getSupplements()).to.equal(3)
    expect(Test2.supplements).to.equal(3)
    expect(Test3.supplements).to.equal(3)
    expect(Test4.prototype.getSupplements()).to.equal(3)

    expect(Test1.prototype.getOverrides()).to.equal(4)
    expect(Test2.overrides).to.equal(4)
    expect(Test3.overrides).to.equal(4)
    expect(Test4.prototype.getOverrides()).to.equal(4)

    expect(Test1.prototype.getDefaultProps()).to.equal(5)
    expect(Test2.defaultProps).to.equal(5)
    expect(Test3.defaultProps).to.equal(5)
    expect(Test4.prototype.getDefaultProps()).to.equal(5)

    expect(Test1.prototype.getInitialAdditions()).to.equal(6)
    expect(Test2.additions).to.equal(6)
    expect(Test3.additions).to.equal(6)
    expect(Test4.prototype.getInitialAdditions()).to.equal(6)
  })
})
