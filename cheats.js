var cheatsVisible = false
var cheatSelected = 0

var wallcheat = false
var trailcheat = false
var applecheat = false
var bot = false

function renderCheatsMenu() {
    ctx.fillStyle = "#0f0"
    ctx.fillRect(20,20,600,600)
    ctx.clearRect(26,26,590,590)

    ctx.font = "40px monospace"
    centerText("CHEATS MENU",60)
    ctx.font = "30px monospace"
    ctx.fillText((wallcheat ? "* " : "  ") + "Wallcheat", 60,100)
    ctx.fillText((trailcheat ? "* " : "  ") + "Trailcheat", 60,130)
    ctx.fillText((applecheat ? "* " : "  ") + "Applecheat", 60,160)
    ctx.fillText((bot ? "* " : "  ") + "Bot", 60,190)
    ctx.fillStyle = colorPalettes[colorPalette].head
    ctx.fillText("Color Palette: " + colorPalette, 60,220)
    ctx.fillStyle = "#0f0"
    ctx.fillText("Go back", 60,280)
    ctx.fillText(">",34,((cheatSelected == 5 ? 6 : cheatSelected)  * 30) + 100)
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