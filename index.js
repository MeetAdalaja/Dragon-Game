score = 0;
cross = true;

audiogo = new Audio('gameover.mp3');

document.onkeydown = function (e) {
    console.log("Key code is: ", e.code);
    if (e.code == "ArrowUp") {
        dragon = document.querySelector('.dragon');
        dragon.classList.add('animateDragon');
        setTimeout(() => {
            dragon.classList.remove('animateDragon');
        }, 700);
    }
    if (e.code == "ArrowRight") {
        dragon = document.querySelector('.dragon');
        dragonX = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left')); dragon.style.left = dragonX + 112 + "px";
    }
    if (e.code == "ArrowLeft") {
        dragon = document.querySelector('.dragon');
        dragonX = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left')); dragon.style.left = dragonX - 112 + "px";
    }
}

setInterval(() => {
    dragon = document.querySelector('.dragon');
    gameOver = document.querySelector('.gameOver');
    gameOB = document.querySelector('.gameOB');
    obstacle = document.querySelector('.obstacle');

    dy = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('top'));
    dx = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsety = Math.abs(dy - oy);

    // console.log(offsetX, offsety);

    if (offsetX < 73 && offsety < 52) {
        gameOver.style.visibility = 'visible';
        gameOB.style.visibility = 'visible';
        obstacle.classList.remove('obstacleAni');
        audiogo.play();

        document.querySelector('.gameOB').addEventListener('click',()=>{
            location.reload();
        });
       
    }
    else if (offsetX < 143 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.01;
            obstacle.style.animationDuration = newDur + 's';
            console.log(newDur);
        }, 500);

    }
}, 10);

function updateScore(score) {
    scoreCont.innerHTML = 'Your Score: ' + score;
}
