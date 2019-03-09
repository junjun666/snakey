var playground = document.getElementById('playground');
var startBtn = document.getElementById('startBtn');
var leftBtn = document.getElementById('leftBtn');
var main = document.getElementById('main');
var score = document.getElementById('score');
var gameover = document.getElementById('gameover');
var over = document.getElementById('over');
var lastScore = document.getElementById('lastScore');
//这个key保证在setInterval延时期间只能改变一次方向，而不是多次改变。
var key = true;
//这个startGameKey保证点击开始按钮后会暂停游戏，再点击接着开始游戏。
var startGameKey = true;
//这个reloadGame保证在弹出失败页面后点击关闭后，再点击开始按钮会重新开始游戏。
var reloadGame = false; 
//这个leftbutton保证在弹出失败页面后保证再点击开始按钮没有效果
var leftbutton = true;
var snakeHeadBody = [];

init();
main.style.display = 'none';
function init(){
    //分数
    this.scoreSum = 0;
    //地图
    this.mapWidth = parseInt(getComputedStyle(playground).width);
    this.mapHeight = parseInt(getComputedStyle(playground).height);
    //苹果
    this.appleW = 20 + 'px';
    this.appleH = 20 + 'px';
    this.appleX = 0 + 'px';
    this.appleY = 0 + 'px';
    //蛇
    this.snakeW = 20 + 'px';
    this.snakeH = 20 + 'px';
    this.snakeBody = [[4,3],[3,3],[2,3]];
    //方向
    this.direct = 'right';
    this.up = true;
    this.down = true;
    this.right = false;
    this.left = false;
    bindEvent();
}
function bindEvent(){
    startBtn.onclick = function(){
        startBtn.style.display = 'none';
        main.style.display = 'block';
        leftBtn.classList.add('change');
        food();
        snake();
        document.onkeydown = function(e){
            if(key){
                var code = e.keyCode;
                setDirect(code);
                key = false;
            }
        }
        
    }
    leftBtn.onclick = function(){
        if(leftbutton){
            if(leftBtn.classList.contains('change')){
                leftBtn.classList.remove('change');
                startGameKey = false;
            }else{
                leftBtn.classList.add('change');
                startGameKey = true;
                if(reloadGame){
                    init();
                    score.innerHTML = 0;
                    food();
                    snake();
                    reloadGame = false;
                }else{
                    startGame();
                }
            }
        }else{
            return;
        }
        
    }
    over.onclick = function(){
        gameover.style.display = 'none';
        removeClass('snake');
        removeClass('apple');
        reloadGame = true;
        leftbutton = true;
    }
}
function food(){
    var oApple = document.createElement('div');
    oApple.style.width = this.appleW;
    oApple.style.height = this.appleH;
    oApple.style.backgroundImage = "url(img/6.jpg)";
    oApple.style.backgroundSize = "100% 100%";
    oApple.style.position = 'absolute';
    oApple.style.zIndex = '999';
    console.log(this.mapHeight);
    this.appleX = Math.floor(Math.random() * (this.mapWidth/20));
    this.appleY = Math.floor(Math.random() * (this.mapHeight/20));
    oApple.style.left = this.appleX * 20 + 'px';
    oApple.style.top = this.appleY * 20 + 'px';
    oApple.classList.add('apple');
    playground.appendChild(oApple);
} 
function snake(){
    for(var i = 0; i < this.snakeBody.length; i++){
        snakeHeadBody[i] = document.createElement('div');
        snakeHeadBody[i].style.width = this.snakeW;
        snakeHeadBody[i].style.height = this.snakeH;
        snakeHeadBody[i].style.position = 'absolute';
        snakeHeadBody[i].style.left = this.snakeBody[i][0] * 20 + 'px';
        snakeHeadBody[i].style.top = this.snakeBody[i][1] * 20 + 'px';
        snakeHeadBody[i].classList.add('snake');
        playground.appendChild(snakeHeadBody[i]);
    }
    snakeHeadBody[0].style.backgroundImage = "url(img/7.jpg)";
    snakeHeadBody[0].style.backgroundSize = "100% 100%";
    for(var m = 1; m < this.snakeBody.length ; m++){
        snakeHeadBody[m].style.backgroundImage = "url(img/8.jpg)";
        snakeHeadBody[m].style.backgroundSize = "100% 100%";
    }
    switch(this.direct){
        case 'down':
            snakeHeadBody[0].style.transform = "rotate(90deg)";
            break;
        case 'up':
            snakeHeadBody[0].style.transform = "rotate(-90deg)";
            break;
        case 'left':
            snakeHeadBody[0].style.transform = "rotate(180deg)";
            break;
        case 'right':
            break;
    }
    startGame();
}
function setDirect(code){
    switch(code){
        case 37:
            if(this.left){
                this.direct = 'left';
                this.left = false;
                this.right = false;
                this.down = true;
                this.up = true;
            }
            break;
        case 38:
            if(this.up){
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.down = false;
                this.up = false;
            }
            break;
        case 39:
            if(this.right){
                this.direct = 'right';
                this.left = false;
                this.right = false;
                this.down = true;
                this.up = true;
            }
            break;
        case 40:
            if(this.down){
                this.direct = 'down';
                this.left = true;
                this.right = true;
                this.down = false;
                this.up = false;
            }
            break;
    }
}
function startGame(){
    timer = setInterval(function(){
        key = true;
        move()
    },200);
}
function move(){
    clearInterval(timer);
    if(startGameKey){
        for(var i = this.snakeBody.length - 1; i > 0; i--){
            this.snakeBody[i][0] = this.snakeBody[i - 1][0];
            this.snakeBody[i][1] = this.snakeBody[i - 1][1];
        }
        switch(this.direct){
            case 'right':
                this.snakeBody[0][0] += 1;
                break;
            case 'down':
                this.snakeBody[0][1] += 1;
                break;
            case 'left':
                this.snakeBody[0][0] -= 1;
                break;
            case 'up':
                this.snakeBody[0][1] -= 1;
                break;
        }   
        removeClass('snake');   
        snake();
        if(this.snakeBody[0][0] == this.appleX && this.snakeBody[0][1] == this.appleY){
            removeClass('apple');
            food();
            //随便加入一个数组即可，因为在执行move的时候都会被代替掉。
            this.snakeBody.push([1,1]);
            scoreSum += 1;
            score.innerHTML = scoreSum;  
        }
        for(var i = 1; i < this.snakeBody.length; i++){
            if(this.snakeBody[0][0] == this.snakeBody[i][0] && this.snakeBody[0][1] == this.snakeBody[i][1]){
                leftBtn.classList.remove('change');
                startGameKey = false;
                gameover.style.display = 'block';
                lastScore.innerHTML = scoreSum;
                leftbutton = false;
            }
        }
        if(this.snakeBody[0][0] == -1 || this.snakeBody[0][0] == Math.floor(this.mapWidth/20) ){
            leftBtn.classList.remove('change');
            startGameKey = false;
            gameover.style.display = 'block';
            lastScore.innerHTML = scoreSum;
            leftbutton = false;
        }
        if(this.snakeBody[0][1] == -1 || this.snakeBody[0][1] == Math.floor(this.mapHeight/20) ){
            leftBtn.classList.remove('change');
            startGameKey = false;
            gameover.style.display = 'block';
            lastScore.innerHTML = scoreSum;
            leftbutton = false;
        }

    }
}
function removeClass(dom){
    var ele = document.getElementsByClassName(dom);
    while(ele.length > 0){
        ele[0].parentNode.removeChild(ele[0]);
    }
}
