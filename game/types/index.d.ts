type GameArea = {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  width: number
  height: number
  frameNo: number
  keys: string[]
  start(): void
  stop(): void
  handleKeyUp(event: KeyboardEvent): void
  handleKeyDown(event: KeyboardEvent): void
}

type Component = {
  new (x: number, y: number, width: number, height: number, color: string)
}