
function calculateDistance(first,second) {
    return Math.sqrt(Math.pow(first[0] - second[0],2) + Math.pow(first[1] - second[1],2))
}
var lastDirect = "d"

function willDieAtPos(pos) {
    for (var trail of gameState.trail) {
        if (!trailcheat && trail[0] == pos[0] && trail[1] == pos[1]) {
            return true
        }
    }

    // edge collision
    if (wallcheat) {
        if (pos[0] < 0) {pos[0] = boardWidth - 1}
        if (pos[1] < 0) {pos[1] = boardHeight - 1}

        if (pos[0] > boardWidth) {pos[0] = 0}
        if (pos[1] > boardHeight) {pos[1] = 0}
    } else {
        if (pos[0] < 0 ||
            pos[0] >= boardWidth ||
            pos[1] < 0 ||
            pos[1] >= boardHeight) {

            pos[0] -= gameState.direction[0]
            pos[1] -= gameState.direction[1]
            return true
        }
    }
    return false
}

var maxSize = calculateDistance([0,0],[boardWidth,boardHeight])
var botIndicators = []

function putIndicator(pos,score,max) {
    return false
    if (score == 9999) {
        ctx.fillStyle = "#f00"
    } else {
        return false
        var c = 255 - Math.floor((score / max) * 255)
        ctx.fillStyle = "#0000" + c.toString(16)
    }
    botIndicators.push([pos[0] * bWidth,pos[1] * bHeight,bWidth,bHeight,ctx.fillStyle])
}

function doBotLogic() {
    botIndicators = []
/*
    if (gameState.applePosition[0] < gameState.position[0]) {
        window.onkeydown({key: "a"})
    }
    if (gameState.applePosition[0] > gameState.position[0]) {
        window.onkeydown({key: "d"})
    }
    if (gameState.applePosition[1] < gameState.position[1]) {
        window.onkeydown({key: "w"})
    }
    if (gameState.applePosition[1] > gameState.position[1]) {
        window.onkeydown({key: "s"})
    }*/
    var wPos = [gameState.position[0],gameState.position[1] - 1]
    var wScore = calculateDistance(wPos,gameState.applePosition)
    if (willDieAtPos(wPos)) { wScore = 9999}
    if (lastDirect == "s") {wScore = 9999}
    

    var aPos = [gameState.position[0] - 1,gameState.position[1]]
    var aScore = calculateDistance(aPos,gameState.applePosition)
    if (willDieAtPos(aPos)) { aScore = 9999}
    if (lastDirect == "d") {aScore = 9999}
    

    var sPos = [gameState.position[0],gameState.position[1] + 1]
    var sScore = calculateDistance(sPos,gameState.applePosition)
    if (willDieAtPos(sPos)) { sScore = 9999}
    if (lastDirect == "w") {sScore = 9999}
    

    var dPos = [gameState.position[0] + 1,gameState.position[1]]
    var dScore = calculateDistance(dPos,gameState.applePosition)
    if (willDieAtPos(dPos)) { dScore = 9999}
    if (lastDirect == "a") {dScore = 9999}
    
    var lowest = Math.min(wScore,aScore,sScore,dScore)
    var max = 16
    putIndicator(dPos,dScore,max)
    putIndicator(sPos,sScore,max)
    putIndicator(aPos,aScore,max)
    putIndicator(wPos,wScore,max)

    if (lowest == wScore) {
        lastDirect = "w"
        window.onkeydown({key: "w"})
    } else if (lowest == aScore) {
        lastDirect =("a")
        window.onkeydown({key: "a"})
    } else if (lowest == sScore) {
        lastDirect =("s")
        window.onkeydown({key: "s"})
    } else if (lowest == dScore) {
        lastDirect =("d")
        window.onkeydown({key: "d"})
    }
    console.log(lastDirect, " won with score ", lowest)
    if (lowest == 9999) {
        console.log("%cI'M IN DANGER", "font-size: 36px;font-weight:900;")
    }


    
}