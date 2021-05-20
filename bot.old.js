var s = document.createElement("script")
s.src = "./pathfinding-browser.min.js"
s.onload = function() {
    window.steps = []
    window.finder = new PF.JumpPointFinder();
    window.doBotLogic = function() {
        if (!this.gameState.running) { steps = []; return}
        if (steps.length <= 1000) {
            var grid = new PF.Grid(boardWidth, boardHeight);
            for (var trail of gameState.trail) {
                try {
                    grid.setWalkableAt(...trail, false);
                } catch(e){}
            } 
            try {
                var lpos = [
                    this.gameState.position[0] - this.gameState.direction[0],
                    this.gameState.position[1] - this.gameState.direction[1]]
                this.botIndicators = []
                this.putIndicator(lpos,1,1)
                this.putIndicator(pos,0.5,1)
                grid.setWalkableAt(...lpos,
                false)
            } catch(e) {}
            steps = finder.findPath(...gameState.position, ...gameState.applePosition, grid);
            
    
        }
        var npos = steps[0]
        var pos = this.gameState.position
        /*doOldBotLogic(...npos)*/
        if (npos[0] == pos[0] && npos[1] == pos[1]) {
            steps.shift()
            if (!steps[0]) {
                return doBotLogic()
            }
            npos = steps[0]
        }
        var hasDirected = false
        if (pos[0] > npos[0] && !willDieAtPos([pos[0] - 1,pos[1]]) && this.gameState.direction != [1,0]) {
            hasDirected = true
            window.onkeydown({key: "a"})
            if (pos[0] <= 0) {
                if (pos[1] > boardHeight / 2) {
                    window.onkeydown({key: "w"})
                } else {
                    window.onkeydown({key: "s"})
                }
            }
        }
        if (pos[0] < npos[0] && !willDieAtPos([pos[0] + 1,pos[1]]) && this.gameState.direction != [1,0]) {
            hasDirected = true
            window.onkeydown({key: "d"})
            if (pos[0] >= boardWidth - 1) {
                if (pos[1] > boardHeight / 2) {
                    window.onkeydown({key: "w"})
                } else {
                    window.onkeydown({key: "s"})
                }
            }
        }
        if (pos[1] < npos[1] && !willDieAtPos([pos[0],pos[1] - 1]) && this.gameState.direction != [0,1]) {
            hasDirected = true
            window.onkeydown({key: "s"})
            if (pos[1] >= boardHeight - 1) {
                if (pos[0] > boardWidth / 2) {
                    window.onkeydown({key: "a"})
                } else {
                    window.onkeydown({key: "d"})
                }
            }
        }
        if (pos[1] > npos[1] && !willDieAtPos([pos[0],pos[1] - 1]) && this.gameState.direction != [0,-1]) {
            hasDirected = true
            window.onkeydown({key: "w"})
            if (pos[1] <= 0) {
                if (pos[0] > boardWidth / 2) {
                    window.onkeydown({key: "a"})
                } else {
                    window.onkeydown({key: "d"})
                }
            }
        }
        if (!hasDirected) {
            this.console.log("what")
            if (this.gameState.direction[1] == -1) {
                this.lastDirect = "w"
            }
            if (this.gameState.direction[1] == 1) {
                this.lastDirect = "s"
            }

            if (this.gameState.direction[0] == -1) {
                this.lastDirect = "a"
            }

            if (this.gameState.direction[0] == 1) {
                this.lastDirect = "d"
            }
            this.doOldBotLogic(...npos)
        }
        /*this.setTimeout(function() {
            if (pos != npos) {
                window.steps = []
                doBotLogic()
                doBotLogic()
            }
        },60)*/
        
        
    }
}
document.body.appendChild(s)
window.doBotLogic = function(){}