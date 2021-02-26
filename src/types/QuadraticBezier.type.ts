import { Coordinate } from './Coordinate.type'
import { Element } from './Element.type'

export interface QuadraticBezier extends Element {
  parameters: {
    control: Coordinate
  }
}
