/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas')

const ctx = canvas.getContext('2d')
// const gradient = ctx.createLinearGradient(200, 200, 100, 100)
const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 10)
gradient.addColorStop(1, '#f50')
gradient.addColorStop(1, '#fff')

ctx.fillStyle = gradient
ctx.fillRect(100, 100, 200, 200)

// Hour-hand
ctx.moveTo(200, 200)
ctx.lineTo(200, 150)

// Minute-hand
ctx.moveTo(200, 200)
ctx.lineTo(260, 200)

// Second-hand
ctx.moveTo(200, 200)
ctx.lineTo(250, 270)
ctx.stroke()

ctx.beginPath()
ctx.arc(200, 200, 95, 0, 2*Math.PI)
ctx.stroke()

