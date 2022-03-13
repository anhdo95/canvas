

window.onload = startGame

/** @type {Component} */
let gamePiece, gameScore, gameObstacles = []

function startGame() {
  gamePiece = new Component(10, 120, 30, 30, "red")
  gameScore = new TextComponent(340, 30, '#f50', '18px Arial', 'SCORE: 0')
  gameArea.start()
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
    this.context = this.canvas.getContext('2d')
    this.frameNo = 0

    document.body.insertBefore(this.canvas, document.body.childNodes[0])
    this.interval = setInterval(updateGameArea, 20) // 50 times per second

    document.addEventListener('keydown', this.handleKeyDown.bind(this))
    document.addEventListener('keyup', this.handleKeyUp.bind(this))
  },
  stop() {
    clearInterval(this.interval)
  },
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
  isValidKey(key) {
    return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)
  },
  handleKeyUp(event) {
    if (!this.isValidKey(event.key)) return
    this.keys[event.key] = false
  },
  handleKeyDown(event) {
    if (!this.isValidKey(event.key)) return
    this.keys[event.key] = true
  }
}

function updateGameArea() {
  for (let i = 0; i < gameObstacles.length; i++) {
    if (gamePiece.crashWith(gameObstacles[i])) {
      return void gameArea.stop()
    }
  }

  gameArea.clear();
  gamePiece.clearSpeed()

  if (gameArea.keys['ArrowUp']) gamePiece.speedY--
  if (gameArea.keys['ArrowDown']) gamePiece.speedY++
  if (gameArea.keys['ArrowLeft']) gamePiece.speedX--
  if (gameArea.keys['ArrowRight']) gamePiece.speedX++

  gameArea.frameNo++
  if (gameArea.frameNo === 1 || everyInterval(150)) {
    const x         = gameArea.canvas.width
          minHeight = 30,
          maxHeight = 200,
          height    = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight),
          minGap    = 30,
          maxGap    = 150,
          gap       = Math.floor(Math.random() * (maxGap - minGap) + minGap)

    gameObstacles.push(new Component(x, 0, 10, height, 'green'))
    gameObstacles.push(new Component(x, height + gap, 10, x - height - gap, 'green'))
  }

  gameObstacles.forEach(function (obstacle) {
    obstacle.x--
    obstacle.update()
  })

  gamePiece.moveToNewPosition()
  gamePiece.update();

  gameScore.text = `SCORE: ${gameArea.frameNo}`
  gameScore.update()
}

function Component(x, y, width, height, color) {
  this.x = x
  this.y = y
  this.speedX = 0;
  this.speedY = 0;
  this.width = width
  this.height = height
  this.color = color

  this.crashWith = function(other) {
    const myLeft      = this.x,
          myRight     = this.x + (this.width),
          myTop       = this.y,
          myBottom    = this.y + (this.height)
          otherLeft   = other.x,
          otherRight  = other.x + (other.width),
          otherTop    = other.y,
          otherBottom = other.y + (other.height)
    
    if (
      myRight < otherLeft ||
      myLeft > otherRight ||
      myTop > otherBottom ||
      myBottom < otherTop
    ) {
      return false;
    }
    return true
  }

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

function TextComponent(x, y, color, font, text) {
  this.x = x
  this.y = y
  this.color = color
  this.font = font
  this.text = text

  this.update = function() {
    const ctx = gameArea.context
    ctx.font = this.font
    ctx.fillStyle = this.color
    ctx.fillText(this.text, this.x, this.y)
  }
}

function everyInterval(n) {
  return gameArea.frameNo / n % 1 === 0
}
