import { ElementType } from '../enums/ElementType.enum'
import { Coordinate } from './Coordinate.type'

export interface Element {
  start: Coordinate
  end: Coordinate
  element: ElementType
  parameters?: any
}
