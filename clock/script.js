/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
canvas.style.backgroundColor = '#333'

const ctx = canvas.getContext('2d')
const radius = canvas.height / 2
const primaryColor = '#a90'
ctx.translate(radius, radius)
setInterval(drawClock, 1000)

function drawClock() {
  const clockRadius = radius * 0.95

  drawFace(ctx, clockRadius)
  drawNumbers(ctx, clockRadius)
  drawTime(ctx, clockRadius)
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} radius 
 */
function drawFace(ctx, radius) {
  ctx.beginPath()
  ctx.arc(0, 0, radius, 0, 2*Math.PI)
  ctx.fillStyle = '#fff'
  ctx.fill()

  const gradient = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05)
  gradient.addColorStop(0, primaryColor)
  gradient.addColorStop(0.5, '#fff')
  gradient.addColorStop(1, '#333')

  ctx.strokeStyle = gradient
  ctx.lineWidth = radius * 0.075
  ctx.stroke()
  
  ctx.beginPath()
  ctx.arc(0, 0, radius * 0.1, 0, 2*Math.PI)
  ctx.fillStyle = primaryColor
  ctx.fill()
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} radius 
 */
function drawNumbers(ctx, radius) {
  ctx.font = `${radius * 0.15}px Arial`
  ctx.fillStyle = '#333'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  for (let num = 1; num <= 12; num++) {
    const angle = num * (Math.PI / 6)

    ctx.rotate(angle)
    ctx.translate(0, -radius * 0.85)
    ctx.rotate(-angle)
    ctx.fillText(num, 0, 0)
    ctx.rotate(angle)
    ctx.translate(0, radius * 0.85)
    ctx.rotate(-angle)
  }
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} radius 
 */
function drawTime(ctx, radius) {
  const now = new Date(),
        hour = now.getHours(),
        minute = now.getMinutes(),
        second = now.getSeconds()

  drawHand(
    ctx,
    (hour % 12) * (Math.PI / 6) +
      minute * Math.PI / (6 * 60) +
      second * Math.PI / (6 * 60 * 60),
    radius * 0.5,
    radius * 0.07
  )
  drawHand(
    ctx,
    minute * (Math.PI / 30) + second * Math.PI / (30 * 60),
    radius * 0.7,
    radius * 0.07
  )
  drawHand(ctx, second * (Math.PI / 30), radius * 0.9, radius * 0.02)
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} position 
 * @param {number} length 
 * @param {number} width 
 */
function drawHand(ctx, position, length, width) {
  ctx.beginPath()
  ctx.lineCap = 'round'
  ctx.lineWidth = width
  ctx.rotate(position)
  ctx.moveTo(0, 0)
  ctx.lineTo(0, -length)
  ctx.stroke()
  ctx.rotate(-position)
}
