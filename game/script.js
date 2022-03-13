

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
  keys: [],
  
  start() {
    this.canvas.width = 480
    this.canvas.height = 270
    this.canvas.tabIndex = 1
    this.context = this.canvas.getContext('2d')

    document.body.insertBefore(this.canvas, document.body.childNodes[0])
    this.interval = setInterval(updateGameArea, 20) // 50 times per second

    document.addEventListener('keydown', this.handleKeyDown.bind(this))
    document.addEventListener('keyup', this.handleKeyUp.bind(this))
  },
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
  isValidKey(key) {
    return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)
  },
  handleKeyUp(event) {
    if (event.target !== this.canvas) return
    if (!this.isValidKey(event.key)) return
    this.keys[event.key] = false
  },
  handleKeyDown(event) {
    if (event.target !== this.canvas) return
    if (!this.isValidKey(event.key)) return
    this.keys[event.key] = true
  }
}

function updateGameArea() {
  gameArea.clear();
  gamePiece.clearSpeed()

  if (gameArea.keys['ArrowUp']) gamePiece.speedY--
  if (gameArea.keys['ArrowDown']) gamePiece.speedY++
  if (gameArea.keys['ArrowLeft']) gamePiece.speedX--
  if (gameArea.keys['ArrowRight']) gamePiece.speedX++

  gamePiece.moveToNewPosition()
  gamePiece.update();
}

function Component(x, y, width, height, color) {
  this.x = x
  this.y = y
  this.speedX = 0;
  this.speedY = 0;
  this.width = width
  this.height = height
  this.color = color

  this.update = function() {
    const ctx = gameArea.context
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  this.moveToNewPosition = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  this.clearSpeed = function() {
    this.speedX = 0;
    this.speedY = 0;
  }
}
