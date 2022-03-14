type PieChartOptions = {
  new(options: {
    canvas: HTMLCanvasElement,
    data: { [key in string]: number }
    colors: string[]
  }): void
}
