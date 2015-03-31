import inherits from 'inherits'
import {version} from '../package'

export function createElement(Constructor, props, ...children) {
  return {
    Constructor: Constructor,
    props: props,
    children: children,
    version: version
  }
}

export function createFactory(constructor) {
  return createElement.bind(null, constructor)
}

export class Phrase {}

export class Source {}

export function createPhrase(options) {
  const Constructor = function () {}

  inherits(Constructor, Phrase)

  Constructor.translations = options.translations
  Constructor.extensions = options.extensions
  Constructor.defaultProps = options.defaultProps
  Constructor.sources = options.sources

  for (let key in options) {
    if (typeof options[key] === 'function') {
      Constructor.prototype[key] = options[key]
    }
  }
  return Constructor
}

export const choice = createFactory('choice')
export const content = createFactory('content')
export const literal = createFactory('literal')
export const separator = createFactory('separator')
export const sequence = createFactory('sequence')
export const value = createFactory('value')
