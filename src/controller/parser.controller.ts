/* eslint-disable id-length */
import { Dimensions } from 'types/Dimensions.type'
import { Commands } from '../enums/Commands.enum'
import { ElementType } from '../enums/ElementType.enum'
import { SvgTagName, SvgType } from '../enums/SVG.enum'
import { Coordinate } from '../types/Coordinate.type'
import { Element } from '../types/Element.type'
import { ParseResult } from '../types/ParseResult.type'

export class ParserController {
  public static parse(svg: any): ParseResult {
    const elements: Element[] = []
    const dimensions: Dimensions = {
      width: 0,
      height: 0,
    }
    if (svg.type === SvgType.ROOT) {
      for (const rootChild of svg.children) {
        if (rootChild.tagName === SvgTagName.SVG && rootChild.properties) {
          dimensions.width = rootChild.properties.width
          dimensions.height = rootChild.properties.height
        }
        if (rootChild.children) {
          for (const child of rootChild.children) {
            if (child.tagName === SvgTagName.PATH) {
              elements.push(...ParserController.parsePath(child.properties.d))
            }
          }
        }
      }
    }
    return { elements, dimensions }
  }

  public static parsePath(path: string): Element[] {
    const splitted = path.split(' ')
    const elements: Element[] = []
    let moveTo: Coordinate = { x: 0, y: 0 }
    let tempCoordinates: Coordinate[]
    let tempCount: number = 0
    for (let i = 0; i < splitted.length; i++) {
      const current = splitted[i]
      switch (current) {
        case Commands.M:
          tempCount = 2
          moveTo = ParserController.nextElementsAsCoordinates(
            splitted,
            i,
            tempCount
          )[0]
          break
        case Commands.C:
          tempCount = 6
          tempCoordinates = ParserController.nextElementsAsCoordinates(
            splitted,
            i,
            tempCount
          )
          elements.push({
            start: moveTo,
            parameters: {
              startControl: tempCoordinates[0],
              endControl: tempCoordinates[1],
            },
            end: tempCoordinates[2],
            element: ElementType.BEZIER,
          })
          moveTo = tempCoordinates[2]
          break
        case Commands.L:
          tempCount = 2
          tempCoordinates = ParserController.nextElementsAsCoordinates(
            splitted,
            i,
            tempCount
          )
          elements.push({
            start: moveTo,
            end: tempCoordinates[0],
            element: ElementType.LINE,
          })
          moveTo = tempCoordinates[0]
          break
        case Commands.Q:
          tempCount = 4
          tempCoordinates = ParserController.nextElementsAsCoordinates(
            splitted,
            i,
            tempCount
          )
          elements.push({
            start: moveTo,
            parameters: {
              control: tempCoordinates[0],
            },
            end: tempCoordinates[1],
            element: ElementType.QUADRATIC_BEZIER,
          })
          moveTo = tempCoordinates[1]
          break
        default:
          console.log(`Command ${current} unsupported`)
      }
      i += tempCount
    }
    return elements
  }

  private static nextElementsAsNumbers(
    splitted: string[],
    index: number,
    count: number
  ): number[] {
    const stringValues: string[] = []
    for (let i = index + 1; i <= index + count; i++) {
      stringValues.push(splitted[i])
    }
    const values = stringValues.map((stringValue) => {
      const value: number = Number(stringValue.replace(',', ''))
      return value
    })
    return values
  }

  private static nextElementsAsCoordinates(
    splitted: string[],
    index: number,
    count: number
  ): Coordinate[] {
    const values = ParserController.nextElementsAsNumbers(
      splitted,
      index,
      count
    )
    if (values.length % 2 !== 0) {
      throw Error(`Cannot determine Coordinates`)
    }
    const coordinates: Coordinate[] = []
    for (let i = 0; i < values.length; i += 2) {
      coordinates.push({
        x: values[i],
        y: values[i + 1],
      })
    }
    return coordinates
  }
}
