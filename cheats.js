var cheatsVisible = false
var cheatSelected = 0

var wallcheat = false
var trailcheat = false
var applecheat = false
var bot = false

function renderCheatsMenu() {
    ctx.fillStyle = "#0f0"
    ctx.fillRect(10,10,300,300)
    ctx.clearRect(13,13,295,295)
    ctx.fillStyle = "#00000088"
    ctx.fillRect(13,13,295,295)
    ctx.fillStyle = "#0f0"
    ctx.font = "20px monospace"
    centerText("CHEATS MENU",30)
    ctx.font = "15px monospace"
    ctx.fillText((wallcheat ? "* " : "  ") + "Wallcheat", 30,50)
    ctx.fillText((trailcheat ? "* " : "  ") + "Trailcheat", 30,65)
    ctx.fillText((applecheat ? "* " : "  ") + "Applecheat", 30,80)
    ctx.fillText((bot ? "* " : "  ") + "Bot [not implemented]", 30,95)
    ctx.fillStyle = colorPalettes[colorPalette].head
    ctx.fillText("Color Palette: " + colorPalette, 30,110)
    ctx.fillStyle = "#0f0"
    ctx.fillText("Go back", 30,140)
    ctx.fillText(">",17,((cheatSelected == 5 ? 6 : cheatSelected)  * 15) + 50)
}

function checkCheats(key) {
    if ((keylog.endsWith("c")) && !cheatsVisible) {
        cancelAnimationFrame(animFrame)
        clearInterval(mvmt)
        cheatsVisible = true
    } else if (cheatsVisible) {
        console.log()
        if (key == "ArrowUp") {
            cheatSelected -= 1
        }
        if (key == "ArrowDown") {
            cheatSelected += 1
        }
        if (key == "Enter") {
            if (cheatSelected == 0) {
                wallcheat = !wallcheat
            } else if (cheatSelected == 1) {
                trailcheat = !trailcheat
            } else if (cheatSelected == 2) {
                applecheat = !applecheat
            } else if (cheatSelected == 3) {
                bot = !bot
            } else if (cheatSelected == 4) {
                var palettes = Object.keys(colorPalettes)
                var index = palettes.indexOf(colorPalette)
                var next = palettes[index + 1]
                if (!next) { next = palettes[0] }
                colorPalette = next
                render()
                cancelAnimationFrame(animFrame)
            } else {
                cheatsVisible = false
                render()
                mvmt = setInterval(movement,100)

            }
        }
        if (cheatSelected > 5) { cheatSelected = 0 }
        if (cheatSelected < 0) { cheatSelected = 5 }
    }
    if (cheatsVisible) {
        renderCheatsMenu()
    }
    
}