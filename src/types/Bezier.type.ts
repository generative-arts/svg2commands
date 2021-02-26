import { Coordinate } from './Coordinate.type'
import { Element } from './Element.type'

export interface Bezier extends Element {
  parameters: {
    startControl: Coordinate
    endControl: Coordinate
  }
}
