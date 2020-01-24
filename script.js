const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const width = canvas.width; const height = canvas.height
const boardWidth = 32; const boardHeight = 32;
const bWidth = width / boardWidth; const bHeight = height / boardHeight

function resetGame() {
    gameState = {
        running: true,
        position: [boardHeight / 2 + 2,boardHeight / 2 ],
        direction: [1,0],
        canDirect: true,
        canReset: true,
        trail: [],
        length: 0,
        applePosition: [boardHeight / 2 - 2,boardHeight / 2],
        movementIndex: 0
    }    
}

var gameState = {}

resetGame()

var colorPalettes = {
    normal: {
        background: "#000",
        head: "#0ff",
        trail: ["#aff","#5ff"],
        apple: "#f00"
    },
    classic: {
        background: "#000",
        head: "#0e0",
        trail: ["#0a0","#0a0"],
        apple: "#f00"
    },
    bnw: {
        background: "#000",
        head: "#fff",
        trail: ["#eee","#eee"],
        apple: "#aaa"
    },
    mono: {
        background: "#fff",
        head: "#000",
        trail: ["","#222","#444","#666","#888","#aaa","#ccc","#aaa","#888","#666","#444","#222"],
        apple: "#000"
    },
    rainbow: {
        background: "#444",
        head: "#F00",
        trail: ["#f00","#8B00FF","#4b0082","#3783ff","#0f0","#ff0","#f70",""].reverse(),
        apple: "#f00"
    },
    transrights: {
        background: "#f8f8f8",
        head: "#58c8f3",
        trail: ["","#efa2b5","#fff","#efa2b5","#58c8f3"],
        apple: "#efa2b5"
    },
    trainsrights: {
        background: "#1b2735",
        head: "#b77c6c",
        trail: ["","#96ca38","#1ba14e","#f7e50b"],
        apple: "#299bd6"
    }

}

var colorPalette = "normal" 


function michaelbayfunction(trail,x) {
    setTimeout(function() {
        for (let i = 0; i < 100; i++) {
            particles.create((trail[0] + 0.5) * bWidth,(trail[1] + 0.5) * bHeight,colorPalettes[colorPalette].trail[(gameState.movementIndex - trail[2]) % colorPalettes[colorPalette].trail.length])
        }
    },x * 10)
}

function centerText(text,height) {
    var size = ctx.measureText(text).width
    if (size < width) {
        ctx.fillText(text,(width * 0.5) - size * 0.5, height,width)
    } else {
        ctx.fillText(text,0, height,width)
    }
}

function loseState() {
    for (let i = 0; i < 200; i++) {
        particles.create((gameState.position[0] + 0.5) * bWidth,(gameState.position[1] + 0.5) * bHeight,colorPalettes[colorPalette].head)
    }
    var x = 0
    for (var trail of gameState.trail) {
        x += 1
        michaelbayfunction(trail,x)
    }
    gameState.running = false
    gameState.canReset = false
    setTimeout(function() {
        alert("You lost! Score: " + gameState.length + ". Press 'r' to reset.")
        gameState.canReset = true
    },1000 + (x * 10))
}

function movement() {
    if (window.smovement) { window.smovement() }
    if (!gameState.running) {return}
    // add trail
    gameState.trail.unshift([gameState.position[0],gameState.position[1],gameState.movementIndex])
    // limit trail size
    if (gameState.trail.length > gameState.length) {
        gameState.trail.pop()
    }

    gameState.movementIndex += 1

    gameState.position[0] += gameState.direction[0]
    gameState.position[1] += gameState.direction[1]

    // apple collision
    if (gameState.applePosition[0] == gameState.position[0] && gameState.applePosition[1] == gameState.position[1]) {
        if (applecheat) {
            gameState.applePosition = [
                Math.min(Math.max(gameState.position[0] + gameState.direction[0],0),boardWidth - 1),
                Math.min(Math.max(gameState.position[1] + gameState.direction[1],0),boardHeight - 1)]
        } else {
            gameState.applePosition = [Math.floor(Math.random() * boardWidth),Math.floor(Math.random() * boardHeight)]
        }
        gameState.length += 1
    }
    // trail collision
    for (var trail of gameState.trail) {
        if (!trailcheat && trail[0] == gameState.position[0] && trail[1] == gameState.position[1]) {
            loseState()
        }
    }

    // edge collision
    if (wallcheat) {
        if (gameState.position[0] < 0) {gameState.position[0] = boardWidth - 1}
        if (gameState.position[1] < 0) {gameState.position[1] = boardHeight - 1}

        if (gameState.position[0] > boardWidth) {gameState.position[0] = 0}
        if (gameState.position[1] > boardHeight) {gameState.position[1] = 0}
    } else {
        if (gameState.position[0] < 0 ||
            gameState.position[0] >= boardWidth ||
            gameState.position[1] < 0 ||
            gameState.position[1] >= boardHeight) {

            gameState.position[0] -= gameState.direction[0]
            gameState.position[1] -= gameState.direction[1]
            loseState()
        }
    }


    gameState.canDirect = true

    // bot
    if (bot) {
        doBotLogic()
    }

}

function render() {
    ctx.fillStyle = colorPalettes[colorPalette].background
    ctx.fillRect(0,0,width,height)

    if (gameState.running) {
        // Render trail
        for (var trail of gameState.trail) {
            ctx.fillStyle = colorPalettes[colorPalette].trail[(gameState.movementIndex - trail[2]) % colorPalettes[colorPalette].trail.length]
            ctx.fillRect((trail[0] * bWidth) + bWidth * 0.15,(trail[1] * bHeight) + bHeight * 0.15,bWidth * 0.7,bHeight * 0.7)
        }
        if (bot) {
            for (var a of botIndicators) {
                ctx.fillStyle = a[4]
                ctx.fillRect(...a)
            }
        }


        // Render head
        ctx.fillStyle = colorPalettes[colorPalette].head
        ctx.fillRect(gameState.position[0] * bWidth,gameState.position[1] * bHeight,bWidth,bHeight)
    }

    // Render apple
    ctx.fillStyle = colorPalettes[colorPalette].apple
    ctx.fillRect(gameState.applePosition[0] * bWidth,gameState.applePosition[1] * bHeight,bWidth,bHeight)
    
    particles.render(ctx)

    animFrame = requestAnimationFrame(render)
}
var animFrame = requestAnimationFrame(render)
var mvmt = setInterval(movement,100)

var keylog = ""

window.onkeydown = function(evt) {
    var key = evt.key
    keylog += key
    if (window.checkCheats) { window.checkCheats(key) }
    
    if ((key == "ArrowUp" || key == "w") && gameState.direction[1] != 1 && gameState.canDirect) {
        gameState.canDirect = false
        gameState.direction = [0,-1]
    }
    if ((key == "ArrowDown" || key == "s") && gameState.direction[1] != -1&& gameState.canDirect) {
        gameState.canDirect = false
        gameState.direction = [0,1]
    }
    if ((key == "ArrowLeft" || key == "a") && gameState.direction[0] != 1&& gameState.canDirect) {
        gameState.canDirect = false
        gameState.direction = [-1,0]
    }
    if ((key == "ArrowRight" || key == "d") && gameState.direction[0] != -1&& gameState.canDirect) {
        gameState.canDirect = false
        gameState.direction = [1,0]
    }
    if (key == "r" && gameState.canReset) {
        resetGame()
    }
    if (keylog.endsWith("mono")) {
        colorPalette = "mono"
    }
    if (keylog.endsWith("transrights")) {
        colorPalette = "transrights"
    }
    if (keylog.endsWith("trainsrights")) {
        colorPalette = "trainsrights"
    }
}
canvas.onclick = function(evt) {
    var x = evt.offsetX
    var y = evt.offsetY
    for (var trail of gameState.trail) {
        if (trail[0] == Math.floor(x / bWidth) && trail[1] == Math.floor(y / bHeight)) {
            colorPalette = "rainbow"
        }
    }
}