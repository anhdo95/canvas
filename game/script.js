

window.onload = startGame

/** @type {Component} */
let gamePiece

function startGame() {
  gameArea.start()
  gamePiece = new Component(20, 20, 30, 30, "red")
}

/**
 * @type {GameArea}
 */
const gameArea = {
  canvas: document.createElement('canvas'),
  start() {
    this.canvas.width = 480
    this.canvas.height = 270
    this.context = this.canvas.getContext('2d')
    document.body.insertBefore(this.canvas, document.body.childNodes[0])
    this.interval = setInterval(updateGameArea, 20) // 50 times per second
  },
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

function updateGameArea() {
  gameArea.clear();
  // gamePiece.x++
  gamePiece.update();
}

function Component(x, y, width, height, color) {
  this.x = x
  this.y = y
  this.width = width
  this.height = height
  this.color = color

  this.update = function() {
    const ctx = gameArea.context
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
