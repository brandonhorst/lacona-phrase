import inherits from 'inherits'

let uniqueId = 0

export function createElement(constructor, props, ...children) {
  if (props && props.id == null) {
    props.id = '_temp' + uniqueId++
  }
  return {
    Constructor: constructor,
    props: props,
    children: children
  }
}

export function createFactory(constructor) {
  return createElement.bind(null, constructor)
}

export class Phrase {}

export function createPhrase(options) {
  const Constructor = options.onCreate || function () {}

  inherits(Constructor, Phrase)

  Constructor.translations = options.translations
  Constructor.supplements = options.supplements
  Constructor.overrides = options.overrides
  Constructor.defaultProps = options.defaultProps
  Constructor.additions = options.initialAdditions

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
export const repeat = createFactory('repeat')
export const separator = createFactory('separator')
export const sequence = createFactory('sequence')
export const value = createFactory('value')
