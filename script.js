class Snake{
    constructor(){
        this.x = 3;
        this.y = 3;
        this.direction = "right";
    }
}

class Board{
    constructor(width, height) {
        this.element = document.getElementById("board");
        this.height = width;
        this.width = height;
        this.snake = new Snake();
        this.createTileMap()
        this.assign_position()
        this.draw_tile = () => {
            
            structure += "<td>";
            structure += "</td>";
        }
    }
    assign_position(){
        this.tilemap[this.snake.y][this.snake.x] = -1
    }
    draw_board(){
            let structure = ""
            structure = "<table>";
            for(let i = 1; i<=this.height; i++)
                {
                    structure += "<tr>";
                    for(let j = 1; j<=this.width; j++)
                        {
                             structure += "<td class=" + this.getTileMapByPosition(i,j) + ">";
                            structure += "</td>";
                        }
                     structure += "</tr>";
                }
            structure += "</table>";
            this.element.innerHTML = structure;
        }
    createTileMap(){
        this.tilemap = [];
        
        for(let i = 1; i<=this.height; i++)
        {
            this.tilemap[i] = []

            for(let j = 1; j<=this.width; j++)
            {
               this.tilemap[i][j] = 0 
            }
        }
    }
    
    getTileMapByPosition(x, y) {
        if (this.tilemap[x][y] == 0) return " ";
        if (this.tilemap[x][y] == -1) return "head";
    }
    
    
    tick(){
        
    }
    
}

const board = new Board(10, 10);
board.draw_board();
document.getElementById("start").addEventListener("click", ()=>{
    document.getElementById("start").disabled = true;
    
})

if keydown = szczała w prawo{board.snake.direction = "right"}
if keydown = szczała w dół{board.snake.direction = "down"}
if keydown = szczała w lewo{board.snake.direction = "left"}
if keydown = szczała w gure{board.snake.direction = "up"}

co jakiś czas{
    sprawdź następną pozycję snejka
    zmien w board.tilemap
    narysuj nowe
}
