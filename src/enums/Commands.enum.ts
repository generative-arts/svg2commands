// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d
export enum Commands {
  M = 'M', // MoveTo
  m = 'm', // MoveTo
  L = 'L', // LineTo
  l = 'l', // LineTo
  H = 'H', // LineTo
  h = 'h', // LineTo
  V = 'V', // LineTo
  v = 'v', // LineTo
  C = 'C', // Cubic Bézier Curve
  c = 'c', // Cubic Bézier Curve
  S = 'S', // Cubic Bézier Curve
  s = 's', // Cubic Bézier Curve
  Q = 'Q', // Quadratic Bézier Curve
  q = 'q', // Quadratic Bézier Curve
  T = 'T', // Quadratic Bézier Curve
  t = 't', // Quadratic Bézier Curve
  A = 'A', // Elliptical Arc Curve
  a = 'a', // Elliptical Arc Curve
  Z = 'Z', // ClosePath
  z = 'z', // ClosePath
}
