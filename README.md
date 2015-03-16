# lacona-phrase

This package is used to create `lacona` phrases. It works with [`lacona`](https://github.com/lacona/lacona) but is maintained separately to allow libraries to be versioned independently of the parser.

A `lacona` phrase is a Javascript descriptor of some natural language construct. The syntax is modeled after [React](http://facebook.github.io/react/), but rather than specifying HTML output, it specifies a language.

Like React, `lacona` phrases can be specified using [JSX](http://facebook.github.io/jsx/). This is recommended, but not required. While JSX is a much more succinct and readable way to express the phrase's structure, it does necessitate a transpilation step. `lacona` itself is built this way, using the excellent [babel](http://babeljs.io/) transpiler. In addition to transpiling JSX, it also transpiles ES6 functionality, which can result in very simple code. All examples in this document will have two examples - JSX/ES6 code to be transpiled using Babel, and standard ES5. Note that it is possible to ES6 without JS (or vice-versa), but those examples are left as an exercise to the developer (but the tests may point you in the right direction).

## Using Javascript Classes

A `lacona` phrase is expressed as a Javascript class. For use with ES5, a shorthand method is provided that will create this class for you, without requiring you to interact with prototypes.

#### Using ES6

```js
import {Phrase} from 'lacona-phrase'

export default class MyPhrase extends Phrase {
  constructor() {
    // no need to call super()
  }
  static get defaultProps() {
    return {a: 'test'}
  }
  describe() {
    return // ...
  }
}
```

#### Using ES5

```js
var createPhrase = require('lacona-phrase').createPhrase

module.exports = createPhrase({
  onCreate: function() {
    // initialize phrase
  },
  defaultProps: {a: 'test'},
  describe: function() {
    return // ...
  }
})
```

## Describing Language

In `lacona`, language is described using `Element`s. Each `Element` can be thought of as an instance of a `Phrase`. Each `Element` can have `props` which govern its behavior.

Please note that `Phrases` should never be instantiated directly, and `Elements` should never be used outside of the context of a `describe()` call. An `Element` is ultimately just a small descriptor of its inputs - the actual `Phrase` instantiation and parsing is all done by `lacona` itself.

#### Using ES6/JSX

In JSX, all lowercase tags refer to elements built-in to `lacona`. Custom classes must be uppercase. Please note the `@jsx` pragma in the initial comment. Unlike React, this comment is required. It must specify the name of the `createElement` function.

```js
/** @jsx createElement */
import {createElement, Phrase} from 'lacona-phrase'

class MyPhrase extends Phrase {
  describe() {
    return (
      <choice>
        <literal text='Google' />
        <literal text='Yahoo' />
        <literal text='Bing' />
      </choice>
    )
  }
}
```

#### Using ES5

In ES5, elements are specified in the form `phrase.createElement(constructor, props[, ...children])`. You can also create a factory to free you from continually needing to call `createElement`, using `createFactory`.

```js
var phrase = require('lacona-phrase')
var factory = phrase.createFactory(MyPhrase)
// these two lines are equivalent
factory({myProp: 'test'}, child1, child2)
phrase.createElement(MyPhrase, {myProp: 'test'}, child1, child2)
```

The module contains shorthand factories for the builtin elements.

```js
var phrase = require('lacona-phrase')

module.exports = phrase.createPhrase({
  describe: function() {
    return phrase.choice(null,
      phrase.literal({text: 'Google'}),
      phrase.literal({text: 'Yahoo'}),
      phrase.literal({text: 'Bing'})
    )
  }
})
```

## Supporting multiple languages

The pesky thing about *language* is that there are lots of them. A single phrase can (and should) support as many languages as possible, all expressing the same fundamental thing. This is done using the `translations` property. Note that while `describe()` is specified as a single function, `translations` is specified as a Static Property (see below for more information).

### Using ES6/JSX

```js
/** @jsx createElement */
import {createElement, Phrase} from 'lacona-phrase'
class MyPhrase extends Phrase {
  static get translations () {
    return [{
      langs: ['en'],
      describe() {
        return <literal text='hello' />
      }
    }, {
      langs: ['zh']
      describe() {
        return <literal text='你好' />
      }
    }]
  }
}
```

### Using ES5

```js
var phrase = require('lacona-phrase')

module.exports = phrase.createPhrase({
  translations: [{
    langs: ['en'],
    describe: function() {
      return phrase.literal({text: 'hello'})
    }
  }, {
    langs: ['zh']
    describe: function() {
      return phrase.literal({text: '你好'})
    }
  }]
})
```


## Phrase Properties

A `Phrase` is ultimately just a class - it can have any methods or properties. However, some methods and properties govern the `Phrase`'s behavior, and should not be used outside of that context.

### Static Properties

Some of a `Phrase`'s behavior is governed by Static Properties, which are specific to the `Phrase`, not to any particular `Element`. When using `createPhrase`, these are specified directly as objects. However, because ES6 does not directly support static properties, these cannot be expressed using ES6 class syntax alone. They can set be set as static getters, or directly as properties on the constructor.

* `defaultProps`
* `supplements`
* `overrides`
* `translations`

#### Using ES6

The two strategies below are precisely equivalent

```js
import {Phrase} from 'lacona-phrase'

class MyPhrase extends Phrase {
  static get defaultProps() {
    return {myProp: 'test'}
  }
  static get supplements() {
    return []
  }
  describe() {
    return // ...
  }
}
```

```js
import {Phrase} from 'lacona-phrase'

class MyPhrase extends Phrase {
  describe() {
    return // ...
  }
}
MyPhrase.defaultProps = {myProp: 'test'}
MyPhrase.supplements = []
```

#### Using ES5
```js
var phrase = require('lacona-phrase')

module.exports = phrase.createPhrase({
  defaultProps: {myProp: 'test'},
  supplements: [],
  describe: function () {
    return // ...
  }
})
```
