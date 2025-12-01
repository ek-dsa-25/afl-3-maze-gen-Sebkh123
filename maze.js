<<<<<<< HEAD
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
=======
function randomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.walls = {
            top: true,
            right: true,
            bottom: true,
            left: true,
        };
        this.visited = false;
    }

    draw(ctx, cellWidth) {
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;
        ctx.beginPath();

        const px = this.x * cellWidth;
        const py = this.y * cellWidth;

        ctx.moveTo(px, py);

        if (this.walls.left) {
            ctx.lineTo(px, py + cellWidth);
        } else {
            ctx.moveTo(px, py + cellWidth);
        }

        if (this.walls.bottom) {
            ctx.lineTo(px + cellWidth, py + cellWidth);
        } else {
            ctx.moveTo(px + cellWidth, py + cellWidth);
        }

        if (this.walls.right) {
            ctx.lineTo(px + cellWidth, py);
        } else {
            ctx.moveTo(px + cellWidth, py);
        }

        if (this.walls.top) {
            ctx.lineTo(px, py);
        } else {
            ctx.moveTo(px, py);
        }

        ctx.stroke();
    }

    // find naboerne i grid vha. this.x og this.y
    unvisitedNeighbors(grid) {
        let neighbors = [];

        // Vi er ikke den nordligste celle
        if (this.y > 0) {
            const nord_x = this.x;
            const nord_y = this.y - 1;
            const nord_nabo = grid[nord_x][nord_y];
            if (!nord_nabo.visited) {
                neighbors.push(nord_nabo);
            }
        }

        // Vi er ikke cellen mest til venstre
        if (this.x > 0) {
            const venstre_x = this.x - 1;
            const venstre_y = this.y;
            const venstre_nabo = grid[venstre_x][venstre_y];
            if (!venstre_nabo.visited) {
                neighbors.push(venstre_nabo);
            }
        }

        // Vi er ikke den sydligste celle
        if (this.y < grid[0].length - 1) {
            const syd_x = this.x;
            const syd_y = this.y + 1;
            const syd_nabo = grid[syd_x][syd_y];
            if (!syd_nabo.visited) {
                neighbors.push(syd_nabo);
            }
        }

        // Vi er ikke cellen mest til højre
        if (this.x < grid.length - 1) {
            const højre_x = this.x + 1;
            const højre_y = this.y;
            const højre_nabo = grid[højre_x][højre_y];
            if (!højre_nabo.visited) {
                neighbors.push(højre_nabo);
            }
        }

        return neighbors;
    }

    punchWallDown(otherCell) {
        const dx = this.x - otherCell.x;
        const dy = this.y - otherCell.y;

        if (dx === 1) {
            // otherCell er til venstre for this
            this.walls.left = false;
            otherCell.walls.right = false;
        } else if (dx === -1) {
            // otherCell er til højre for this
            this.walls.right = false;
            otherCell.walls.left = false;
        } else if (dy === 1) {
            // otherCell er over this
            this.walls.top = false;
            otherCell.walls.bottom = false;
        } else if (dy === -1) {
            // otherCell er under this
            this.walls.bottom = false;
            otherCell.walls.top = false;
        }
    }
}

class Maze {
    constructor(cols, rows, canvas) {
        this.grid = [];
>>>>>>> 7588da7928e9238894277a51d89637b560777ecc
        this.cols = cols;
        this.rows = rows;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cellWidth = canvas.width / cols;
<<<<<<< HEAD
        this.grid = [];
        this.stack = [];

        const start_x = randomInteger(0, cols - 1);
        const start_y = randomInteger(0, rows - 1);

        this.current = null;

        this.initializeGrid();
        this.current = this.grid[start_y][start_x];
        this.current.visited = true;
      }

      initializeGrid() {
        this.grid = []; // clear old grid
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

        let neighbours = this.current.getUnvisitedNeighbours(this.grid, this.rows, this.cols);

        if (neighbours.length > 0) {
          let next = neighbours[Math.floor(Math.random() * neighbours.length)];
          this.removeWalls(this.current, next);
          this.stack.push(this.current);
          this.current = next;
          this.current.visited = true;
        } else if (this.stack.length > 0) {
          this.current = this.stack.pop();
        } else {
          this.current = null; // done
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
        runMaze(); // restart at new speed
      });

      // Reset button
      const resetBtn = document.getElementById("resetButton");
      resetBtn.addEventListener("click", resetMaze);

      // Start first maze
      resetMaze();
    });
=======
        this.initializeGrid();
    }

    initializeGrid() {
        for (let i = 0; i < this.rows; i += 1) {
            this.grid.push([]);
            for (let j = 0; j < this.cols; j += 1) {
                this.grid[i].push(new Cell(i, j));
            }
        }
    }

    draw() {
        for (let i = 0; i < this.rows; i += 1) {
            for (let j = 0; j < this.cols; j += 1) {
                this.grid[i][j].draw(this.ctx, this.cellWidth);
            }
        }
    }

    generate() {
        const start_x = randomInteger(0, this.cols);
        const start_y = randomInteger(0, this.rows);
        let currentCell = this.grid[start_x][start_y];
        let stack = [];

        currentCell.visited = true;

        // Get unvisited neighbors
        // If there are unvisited neighbors:
        // - pick a random one of them
        // - carve a hole through the wall
        // - push current cell on stack
        // - make that neighbor the current cell
        // If not, make the top of stack the current cell
        // If still not, you're done

        while (currentCell != null) {
            let unvisitedNeighbors = currentCell.unvisitedNeighbors(this.grid);
            if (unvisitedNeighbors.length > 0) {
                const randomNeighborCell = unvisitedNeighbors[randomInteger(0, unvisitedNeighbors.length)];
                currentCell.punchWallDown(randomNeighborCell);
                stack.push(currentCell);
                currentCell = randomNeighborCell;
                currentCell.visited = true;
            } else {
                currentCell = stack.pop();
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const maze = new Maze(20, 20, canvas);

    // TODO: Fjern nogle af væggene på en smart måde.
    maze.generate();

    maze.draw();

    console.log(maze);
})
>>>>>>> 7588da7928e9238894277a51d89637b560777ecc
