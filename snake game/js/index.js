
// game constants

let inputDirection = { x: 0, y: 0 };
const foodSound = new Audio('/eat.mp3');
const gameOverSound = new Audio('/over.mp3');
const moveSound = new Audio('/turn.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];

food = { x: 3, y: 5 };

//game functions

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

// function isCollide(sarr){
//     return false;
// }

function isCollide(snake) {
   //if bump into itself
   for (let i = 1; i < snakeArr.length; i++) {
       if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
           return true;
       }
    }
    //if bump into wall
       if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0 ) {
       return true;
   }
   return false;
}


function gameEngine() {
    // Part 1: updating snake array and food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        inputDirection = { x: 0, y: 0 };
        alert("Game Over !. Press any key to play again");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
    }

    // if food is eaten
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    //moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;


    // Part 2: display the snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement); // appends node as last element
    });

    // Part 3: display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement); // appends node as last element

}




//main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDirection = { x: 0, y: 1 } // starts the game
    //inputDirection=snakeVelocity
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;

        default: alert("Press one of the 4 direction keys")
            break;
    }
})