document.addEventListener("DOMContentLoaded", ()=>{
    const bird = document.querySelector('.bird')
    const ground = document.querySelector('.ground')
    const gameDisplay = document.querySelector('.game-container')

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 2;
    let isGameOver = false;

    function startGame() {
        birdBottom -= gravity;
        if(birdBottom === 0) clearInterval(gameTimerId);
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }
    
    let gameTimerId = setInterval(startGame, 20);

    function jump(){
        if(birdBottom < 485) birdBottom += 50;
        bird.style.bottom = birdBottom + 'px';
    }
    
    function control(e){
        if(e.code == 'Space') jump();
    }
    document.addEventListener('keyup',control)

    function generalObstacle(){
        let  obstacleLeft = 500;
        let randomHeight = Math.random() * 60;
        let obstacleBottom = randomHeight;
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');
        if( !isGameOver ){
           obstacle.classList.add('obstacle')
           topObstacle.classList.add('topObstacle')
        }
            gameDisplay.appendChild(obstacle)
            gameDisplay.appendChild(topObstacle)
            obstacle.style.left = obstacleLeft + 'px';
            obstacle.style.bottom = obstacleBottom + 'px';
            topObstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.bottom = obstacleBottom + 450 + 'px';
            
        let timerId = setInterval(moveObstacle, 20)
        function moveObstacle(){
            obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.left = obstacleLeft + 'px';
            if(obstacleLeft === -60 ) {
                clearInterval(timerId)
                obstacle.remove();
                topObstacle.remove();
            }
            if(obstacleLeft >= 160 && obstacleLeft < 280 && (obstacleBottom + 255 <= birdBottom || birdBottom <= obstacleBottom + 150 )
             || birdBottom === 0 || isGameOver){
               gameOver();
               clearInterval(timerId);
            }
        }
        if( !isGameOver) setTimeout(generalObstacle, 2000)
    }
    generalObstacle()

    function gameOver() {
        console.log("gameOver")
        isGameOver = true;
        clearInterval(gameTimerId)
        document.removeEventListener('keyup', control)
    }
    
})



