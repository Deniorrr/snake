class Snake {
    constructor() {
        this.x = 3;
        this.y = 3;
        this.direction = "right";
        this.prev_x;
        this.prev_y;
        this.score = 0;
    }
}

class Apple {
    constructor(height, width) {
        this.x;
        this.y;
    }
    draw_position() {
        this.x = Math.floor(Math.random() * height + 1)
        this.y = Math.floor(Math.random() * width + 1)
    }
}
class Board {
    constructor(width, height, speed) {
        this.element = document.getElementById("board");
        this.height = width;
        this.width = height;
        this.speed = 1000 / speed;
        this.snake = new Snake();
        this.apple = new Apple();
        this.createTileMap()
        this.assign_position()
        this.draw_tile = () => {

            structure += "<td>";
            structure += "</td>";
        }
        this.draw_apple_pos();
        this.changescoreboard();
    }
    assign_position() {
        this.tilemap[this.snake.y][this.snake.x] = -1
    }
    draw_board() {
        let structure = "<input type='button' id='start' value='start'>"
        structure += "<table>";
        for (let i = 1; i <= this.height; i++) {
            structure += "<tr>";
            for (let j = 1; j <= this.width; j++) {
                structure += "<td class=" + this.getTileMapByPosition(j, i) + ">";
                //structure += this.tilemap[j][i];

                structure += "</td>";
            }
            structure += "</tr>";
        }
        structure += "</table>";
        this.element.innerHTML = structure;
    }
    getTileMapByPosition(x, y) {
        if (this.tilemap[x][y] == 0) return " ";
        if (this.tilemap[x][y] == -1) return "head";
        if (this.tilemap[x][y] == -2) return "apple";
        if (this.tilemap[x][y] > 0) return "tail";
    }
    createTileMap() {
        this.tilemap = [];

        for (let i = 1; i <= this.width; i++) {
            this.tilemap[i] = []

            for (let j = 1; j <= this.height; j++) {
                this.tilemap[i][j] = 0
            }
        }
    }


    check_pos() {
        switch (this.snake.direction) {
            case "right":
                this.snake.x += 1;
                break;
            case "down":
                this.snake.y += 1;
                break;
            case "left":
                this.snake.x -= 1;
                break;
            case "top":
                this.snake.y -= 1;
                break;
        }
        // if (this.snake.direction == "right") this.snake.x += 1;
        // if (this.snake.direction == "down") this.snake.y += 1;
        // if (this.snake.direction == "left") this.snake.x -= 1;
        // if (this.snake.direction == "top") this.snake.y -= 1;

        if (this.snake.x > this.width || this.snake.x < 1 || this.snake.y > this.height || this.snake.y < 1 || this.tilemap[this.snake.x][this.snake.y] > 0) {
            this.lose();
        }
        if (this.tilemap[this.snake.x][this.snake.y] == -2) {
            this.snake.score += 1;
            this.draw_apple_pos();
            this.changescoreboard()
        }
    }
    draw_apple_pos() {
        // let tilemap_copy = this.tilemap;
        // for (let i = 1; i <= this.height; i++) {
        //     for (let j = 1; j <= this.width; j++) {
        //         if (this.tilemap[j][i] != 0) this.tilemap_copy[j][i].pop();
        //     }
        // }
        do {
            console.log("XD")
            this.apple.x = Math.floor(Math.random() * this.width + 1);
            this.apple.y = Math.floor(Math.random() * this.height + 1);
        } while (this.tilemap[this.apple.x][this.apple.y] != 0)
        this.tilemap[this.apple.x][this.apple.y] = -2;
    }
    moveontilemap() {
        this.snake.prev_x = this.snake.x;
        this.snake.prev_y = this.snake.y;
        this.check_pos();
        this.move_snake_body();
        this.tilemap[this.snake.prev_x][this.snake.prev_y] = 2 + this.snake.score;
        this.tilemap[this.snake.x][this.snake.y] = -1;
        this.draw_board();
    }
    move_snake_body() {
        for (let i = 1; i <= this.height; i++) {
            for (let j = 1; j <= this.width; j++) {
                if (this.tilemap[j][i] > 0) this.tilemap[j][i] -= 1
            }
        }
    }
    lose() {
        clearInterval(tick);
        setTimeout(() => {
            this.element.innerHTML = "<h1>GG</h1>";
        }, 1)
    }
    changescoreboard() {
        let scoreboard = document.getElementById("score");
        scoreboard.innerHTML = "SCORE: " + this.snake.score;
    }
}


let tick;
document.getElementById("start").addEventListener("click", () => {
    let height = document.getElementById("height").value;
    let width = document.getElementById("width").value;
    let speed = document.getElementById("speed").value;
    window.board = new Board(height, width, speed);
    board.draw_board();
    document.getElementById("start").disabled = true;
    tick = setInterval(() => {
        board.moveontilemap();
    }, board.speed)
})
// DEV TOOL
// document.getElementById("stop").addEventListener("click", () => {
//     clearInterval(tick)
// })

document.onkeypress = (event) => {
    let x = event.which || event.keyCode;
    if (x == 100) board.snake.direction = "right";
    if (x == 115) board.snake.direction = "down";
    if (x == 97) board.snake.direction = "left";
    if (x == 119) board.snake.direction = "top";
}
// if keydown = szczała w prawo{board.snake.direction = "right"}
// if keydown = szczała w dół{board.snake.direction = "down"}
// if keydown = szczała w lewo{board.snake.direction = "left"}
// if keydown = szczała w gure{board.snake.direction = "up"}

// co jakiś czas{
//     sprawdź następną pozycję snejka
//     zmien w board.tilemap
//     narysuj nowe
// }

//d = 100
//s = 115
//a = 95
//w = 119