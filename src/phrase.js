export function createElement(constructor, props, ...children) {
  return {
    constructor: constructor,
    props: props,
    children: children
  }
}

export function createFactory(constructor) {
  return createElement.bind(null, constructor)
}

export class Phrase {}

export function createPhrase(options) {
  const constructor = options.onCreate || function () {}

  constructor.translations = options.translations
  constructor.supplements = options.supplements
  constructor.overrides = options.overrides
  constructor.defaultProps = options.defaultProps
  constructor.additions = options.initialAdditions

  for (let key in options) {
    if (typeof options[key] === 'function') {
      constructor.prototype[key] = options[key]
    }
  }
  return constructor
}

export const choice = createFactory('choice')
export const content = createFactory('content')
export const literal = createFactory('literal')
export const repeat = createFactory('repeat')
export const separator = createFactory('separator')
export const sequence = createFactory('sequence')
export const value = createFactory('value')
