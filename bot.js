var s = document.createElement("script")
s.src = "./pathfinding-browser.min.js"

function canDieAlongQueue() {
    var pos = [...gameState.position ]
    for (var input of bQueue) {
        pos[0] += input[0]
        pos[1] += input[1]
        if (willDieAtPos(pos)) return true
    }
    return false
}
s.onload = function() {
    window.steps = []
    window.finder = new PF.AStarFinder({allowDiagonal: false});
    window.doBotLogic = function() {
        if (!this.gameState.running) { steps = []; return}
        if (bQueue.length > 1 && !canDieAlongQueue()) return
        var pos = this.gameState.position
        var grid = new PF.Grid(boardWidth, boardHeight);
        if (steps.length <= 1000) {
            for (var trail of gameState.trail) {
                try {
                    grid.setWalkableAt(...trail, false);
                } catch(e){console.error(e)}
            } 
            try {
                var lpos = [
                    this.gameState.position[0] - this.gameState.direction[0],
                    this.gameState.position[1] - this.gameState.direction[1]]
                this.botIndicators = []
                console.log(pos,lpos)
                this.putIndicator(lpos,1,1)
                this.putIndicator(pos,0.5,1)
                grid.setWalkableAt(...lpos,false)
            } catch(e) {console.error(e)}
            steps = finder.findPath(...gameState.position, ...gameState.applePosition, grid);
            
            
        }
        var dirs = []
        var ls = pos
        for (var s of steps) {
            dirs.push([ s[0] - ls[0], s[1] - ls[1] ])
            ls = s
        }
        dirs.shift()
        bQueue = dirs
        
    }
}
document.body.appendChild(s)
window.doBotLogic = function(){}