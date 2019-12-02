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

var colorPalette = {
    background: "#000",
    head: "#0ff",
    trail: ["#aff","#5ff"],
    apple: "#f00"
}

function michaelbayfunction(trail,x) {
        setTimeout(function() {
            for (let i = 0; i < 100; i++) {
                particles.create((trail[0] + 0.5) * bWidth,(trail[1] + 0.5) * bHeight,colorPalette.trail[(gameState.movementIndex - trail[2]) % colorPalette.trail.length])
            }
        },x * 10)
}

function loseState() {
    for (let i = 0; i < 200; i++) {
        particles.create((gameState.position[0] + 0.5) * bWidth,(gameState.position[1] + 0.5) * bHeight,colorPalette.head)
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
        gameState.applePosition = [Math.floor(Math.random() * bWidth),Math.floor(Math.random() * bHeight)]
        gameState.length += 1
    }
    // trail collision
    for (var trail of gameState.trail) {
        if (trail[0] == gameState.position[0] && trail[1] == gameState.position[1]) {
            loseState()
        }
    }

    // edge collision
    if (gameState.position[0] < 0 ||
        gameState.position[0] >= boardWidth ||
        gameState.position[1] < 0 ||
        gameState.position[1] >= boardHeight) {

        gameState.position[0] -= gameState.direction[0]
        gameState.position[1] -= gameState.direction[1]
        loseState()
    }

    gameState.canDirect = true

}

function render() {
    ctx.fillStyle = colorPalette.background
    ctx.fillRect(0,0,width,height)

    if (gameState.running) {
            // Render trail
            for (var trail of gameState.trail) {
                console.log((gameState.movementIndex - trail[2]))
                ctx.fillStyle = colorPalette.trail[(gameState.movementIndex - trail[2]) % colorPalette.trail.length]
                ctx.fillRect(trail[0] * bWidth,trail[1] * bHeight,bWidth,bHeight)
            }


        // Render head
        ctx.fillStyle = colorPalette.head
        ctx.fillRect(gameState.position[0] * bWidth,gameState.position[1] * bHeight,bWidth,bHeight)
    }

    // Render apple
    ctx.fillStyle = colorPalette.apple
    ctx.fillRect(gameState.applePosition[0] * bWidth,gameState.applePosition[1] * bHeight,bWidth,bHeight)
    
    particles.render(ctx)

    requestAnimationFrame(render)
}
requestAnimationFrame(render)
setInterval(movement,100)

var keylog = ""

window.onkeydown = function(evt) {
    var key = evt.key
    keylog += key
    console.log(key)
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
        colorPalette =  {
            background: "#fff",
            head: "#000",
            trail: ["","#222","#444","#666","#888","#aaa","#ccc","#aaa","#888","#666","#444","#222"],
            apple: "#000"
        }
    }
    if (keylog.endsWith("transrights")) {
        colorPalette =  {
            background: "#f8f8f8",
            head: "#58c8f3",
            trail: ["","#efa2b5","#fff","#efa2b5","#58c8f3"],
            apple: "#efa2b5"
        }
    }
if (keylog.endsWith("trainsrights")) {
        colorPalette =  {
            background: "#1b2735",
            head: "#b77c6c",
            trail: ["","#96ca38","#1ba14e","#f7e50b"],
            apple: "#299bd6"
        }
    }
    

}
canvas.onclick = function(evt) {
    var x = evt.offsetX
    var y = evt.offsetY
    for (var trail of gameState.trail) {
        if (trail[0] == Math.floor(x / bWidth) && trail[1] == Math.floor(y / bHeight)) {
            colorPalette =  {
                background: "#444",
                head: "#F00",
                trail: ["#f00","#8B00FF","#4b0082","#3783ff","#0f0","#ff0","#f70",""].reverse(),
                apple: "#f00"
            }
        }
    }
}