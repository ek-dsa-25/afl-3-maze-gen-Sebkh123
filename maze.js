// Return a random integer between min and max (inclusive)
function randomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.walls = { top: true, right: true, bottom: true, left: true };
        this.visited = false;
    }

    draw(ctx, cellWidth) {
        const px = this.x * cellWidth;
        const py = this.y * cellWidth;

        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.beginPath();

        if (this.walls.top) {
            ctx.moveTo(px, py);
            ctx.lineTo(px + cellWidth, py);
        }
        if (this.walls.right) {
            ctx.moveTo(px + cellWidth, py);
            ctx.lineTo(px + cellWidth, py + cellWidth);
        }
        if (this.walls.bottom) {
            ctx.moveTo(px + cellWidth, py + cellWidth);
            ctx.lineTo(px, py + cellWidth);
        }
        if (this.walls.left) {
            ctx.moveTo(px, py + cellWidth);
            ctx.lineTo(px, py);
        }

        ctx.stroke();

        // Show visited cells
        if (this.visited) {
            ctx.fillStyle = "lightyellow";
            ctx.fillRect(px + 1, py + 1, cellWidth - 2, cellWidth - 2);
        }
    }

    getUnvisitedNeighbours(grid, rows, cols) {
        const neighbours = [];

        if (this.y > 0) {
            const north = grid[this.y - 1][this.x];
            if (!north.visited) neighbours.push(north);
        }
        if (this.y < rows - 1) {
            const south = grid[this.y + 1][this.x];
            if (!south.visited) neighbours.push(south);
        }
        if (this.x > 0) {
            const west = grid[this.y][this.x - 1];
            if (!west.visited) neighbours.push(west);
        }
        if (this.x < cols - 1) {
            const east = grid[this.y][this.x + 1];
            if (!east.visited) neighbours.push(east);
        }

        return neighbours;
    }
}

class Maze {
    constructor(cols, rows, canvas) {
        this.cols = cols;
        this.rows = rows;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cellWidth = canvas.width / cols;
        this.grid = [];
        this.stack = [];

        // Choose a random starting cell
        const start_x = randomInteger(0, cols - 1);
        const start_y = randomInteger(0, rows - 1);

        this.initializeGrid();
        this.current = this.grid[start_y][start_x];
        this.current.visited = true;
    }

    initializeGrid() {
        this.grid = [];
        for (let y = 0; y < this.rows; y++) {
            this.grid.push([]);
            for (let x = 0; x < this.cols; x++) {
                this.grid[y].push(new Cell(x, y));
            }
        }
    }

    removeWalls(cellA, cellB) {
        const dx = cellB.x - cellA.x;
        const dy = cellB.y - cellA.y;

        if (dx === 1) {
            cellA.walls.right = false;
            cellB.walls.left = false;
        } else if (dx === -1) {
            cellA.walls.left = false;
            cellB.walls.right = false;
        } else if (dy === 1) {
            cellA.walls.bottom = false;
            cellB.walls.top = false;
        } else if (dy === -1) {
            cellA.walls.top = false;
            cellB.walls.bottom = false;
        }
    }

    step() {
        if (!this.current) return false;

        let neighbours = this.current.getUnvisitedNeighbours(
            this.grid,
            this.rows,
            this.cols
        );

        if (neighbours.length > 0) {
            let next = neighbours[Math.floor(Math.random() * neighbours.length)];

            this.removeWalls(this.current, next);
            this.stack.push(this.current);

            this.current = next;
            this.current.visited = true;

        } else if (this.stack.length > 0) {
            this.current = this.stack.pop();

        } else {
            this.current = null; // Maze is finished
            return false;
        }

        return true;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.grid[y][x].draw(this.ctx, this.cellWidth);
            }
        }

        // Highlight the current cell
        if (this.current) {
            const px = this.current.x * this.cellWidth;
            const py = this.current.y * this.cellWidth;
            this.ctx.fillStyle = "lightgreen";
            this.ctx.fillRect(px + 2, py + 2, this.cellWidth - 4, this.cellWidth - 4);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    let maze;
    let intervalId;
    let intervalTime = 100; // default 100ms

    function runMaze() {
        clearInterval(intervalId);

        intervalId = setInterval(() => {
            let running = maze.step();
            maze.draw();

            if (!running) {
                clearInterval(intervalId);
                console.log("Maze complete!");
            }
        }, intervalTime);
    }

    function resetMaze() {
        maze = new Maze(20, 20, canvas);
        runMaze();
    }

    // Speed slider
    const slider = document.getElementById("speedSlider");
    const speedValue = document.getElementById("speedValue");

    slider.addEventListener("input", () => {
        intervalTime = parseInt(slider.value, 10);
        speedValue.textContent = intervalTime;
        runMaze();
    });

    // Reset button
    document.getElementById("resetButton")
        .addEventListener("click", resetMaze);

    resetMaze();
});
