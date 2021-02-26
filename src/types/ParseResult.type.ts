import { Dimensions } from './Dimensions.type'
import { Element } from './Element.type'

export interface ParseResult {
  elements: Element[]
  dimensions: Dimensions
}
