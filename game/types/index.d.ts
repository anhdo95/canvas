type GameArea = {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  width: number
  height: number
}

type Component = {
  new (x: number, y: number, width: number, height: number, color: string)
}