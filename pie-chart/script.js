/**
 * Frameworks' star
 */
const frameworks = {
  react: 184000,
  vue: 194000,
  angular: 80200,
  svelte: 56600,
  preact: 31300
}

new PieChart({
  canvas: document.getElementById("canvas"),
  data: frameworks,
  colors: ['#f20', '#abbeed', '#199423', '#984', '#009999']
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

  this.draw = function() {
    const total = Object.values(this.data).reduce((sum, value) => sum + value)

    let startAngle = 0,
        colorIndex = 0
    Object.values(this.data).forEach((value) => {
      // Full circle corresponds to an angle of 360 degrees or 2*PI
      const sliceAngle = Math.PI * 2 * value / total
  
      drawPieSlice(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        Math.min(this.canvas.width / 2, this.canvas.height / 2),
        startAngle,
        startAngle + sliceAngle,
        this.colors[colorIndex++ % this.colors.length]
      )

      startAngle += sliceAngle
    })
  }
}


/**
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} startX 
 * @param {number} startY 
 * @param {number} endX 
 * @param {number} endY 
 */
function drawLine(ctx, startX, startY, endX, endY) {
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
 */
function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle) {
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, startAngle, endAngle)
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