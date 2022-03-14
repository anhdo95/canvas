type PieChartOptions = {
  new(options: {
    canvas: HTMLCanvasElement,
    data: { [key in string]: number }
    colors: string[]
  }): void
}

type DoughnutChartOptions = {
  new(options: {
    canvas: HTMLCanvasElement,
    data: { [key in string]: number }
    colors: string[]
    doughnutHoleSize: number
  }): void
}
