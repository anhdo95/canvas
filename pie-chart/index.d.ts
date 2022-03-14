type PieChartOptions = {
  new(options: {
    canvas: HTMLCanvasElement,
    data: { [key in string]: number }
    colors: string[]
    legend?: HTMLElement
  }): void
}

type DoughnutChartOptions = {
  new(options: {
    canvas: HTMLCanvasElement,
    data: { [key in string]: number }
    colors: string[]
    doughnutHoleSize: number
    legend?: HTMLElement
  }): void
}
