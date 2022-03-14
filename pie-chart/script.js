/**
 * Frameworks' star
 */
const frameworks = {
  react: 184000,
  vue: 194000,
  angular: 80200,
  svelte: 56600,
  preact: 31300,
}

const colors = ['#f20', '#abbeed', '#199423', '#984', '#009999']

new PieChart({
  canvas: document.getElementById("pie-canvas"),
  data: frameworks,
  colors,
  legend: document.getElementById("pie-legend"),
}).draw()

new DoughnutChart({
  canvas: document.getElementById("doughnut-canvas"),
  data: frameworks,
  colors,
  doughnutHoleSize: 0.5,
  legend: document.getElementById("doughnut-legend"),
}).draw()

/**
 * @constructor
 * @param {PieChartOptions} options 
 */
function PieChart(options) {
  this.canvas = options.canvas
  this.ctx = options.canvas.getContext('2d')
  this.data = options.data
  this.colors = options.colors
  this.legend = options.legend

  this.draw = function(offset = 0) {
    const total = Object.values(this.data).reduce((sum, value) => sum + value)

    let startAngle = 0,
        colorIndex = 0,
        legendHTML = ""

    for (key in this.data) {
      const value = this.data[key]
      // Full circle corresponds to an angle of 360 degrees or 2*PI
      const sliceAngle = Math.PI * 2 * value / total
      const pieRadius = Math.min(this.canvas.width / 2, this.canvas.height / 2)
      const endAngle = startAngle + sliceAngle
      const color = this.colors[colorIndex++ % this.colors.length]
  
      drawPieSlice(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        pieRadius,
        startAngle,
        endAngle,
        color
      )

      let labelX = this.canvas.width / 2 + (offset + pieRadius / 2) * Math.cos(startAngle + sliceAngle / 2)
      let labelY = this.canvas.height / 2 + (offset + pieRadius / 2) * Math.sin(startAngle + sliceAngle / 2)

      drawText(
        this.ctx,
        labelX,
        labelY,
        `${Math.round(100 * value / total)}%`,
        'bold 18px Arial',
        '#fff'
      )

      if (this.legend) {
        legendHTML += `
          <div class="legend__item">
            <span class="legend__color" style="background-color: ${color}"></span>
            ${key}
          </div>
        `
      }

      startAngle += sliceAngle
    }

    if (legendHTML) {
      this.legend.innerHTML = legendHTML
    }
  }
}

/**
 * @constructor
 * @param {DoughnutChartOptions} options 
 */
function DoughnutChart(options) {
  this.doughnutHoleSize = options.doughnutHoleSize
  this.base = new PieChart(options)

  this.draw = function() {
    const radius = Math.min(this.base.canvas.width / 2, this.base.canvas.height / 2) * this.doughnutHoleSize
    const offset = radius / 2
    this.base.draw(offset)

    drawPieSlice(
      this.base.ctx,
      this.base.canvas.width / 2,
      this.base.canvas.height / 2,
      radius,
      0,
      2 * Math.PI,
      '#fff'
    )
  }
}

/**
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} startX 
 * @param {number} startY 
 * @param {number} endX 
 * @param {number} endY 
 */
function drawLegend(ctx, startX, startY, endX, endY) {
  ctx.beginPath()
  ctx.moveTo(startX, startY)
  ctx.lineTo(endX, endY)
  ctx.stroke()
}

/**
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} centerX 
 * @param {number} centerY 
 * @param {number} radius 
 * @param {number} startAngle 
 * @param {number} endAngle 
 * @param {string} color 
 */
function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(centerX, centerY)
  ctx.arc(centerX, centerY, radius, startAngle, endAngle)
  ctx.closePath
  ctx.fill()
}

/**
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} centerX 
 * @param {number} centerY 
 * @param {number} radius 
 * @param {number} startAngle 
 * @param {number} endAngle 
 * @param {string} color 
 */
 function drawText(ctx, x, y, text, font, color) {
  ctx.font = font
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.fillText(text, x, y)
}

