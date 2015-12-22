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

class LaconaElementInstance {
  constructor (props) {
    this.props = props
  }
}

export class Phrase extends LaconaElementInstance { }

export class Source extends LaconaElementInstance { }
