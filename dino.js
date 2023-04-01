//board
let board;
let boardwidth = 750;
let boardheight = 250;
//dino
let dinowidth = 88;
let dinoheight = 94;
let dinoX = 50;
let dinoY = boardheight-dinoheight;
let dinoImg;

let dino = {
    x : dinoX,
    y : dinoY,
    width : dinowidth,
    height : dinoheight,
}
//cactus
let cactusArray = [];

let cactus1width = 40;
let cactus2width = 70;
let cactus3width = 100;

let cactusheight = 70;
let cactusX = 700;
let cactusY = boardheight - cactusheight;

let cactus1Img;
let cactus2Img;
let cactus3Img;




//cloud
let cloudImg;
let cloudwidth = 80;
let cloudheight = 80;
let cloudX = 450;
let cloudY = 40;

let cloud = {
    x : cloudX,
    y : cloudY,
    width : cloudwidth,
    height : cloudheight,
}
let cloud1Img;
let cloud1width = 80;
let cloud1height = 80;
let cloud1X = 170;
let cloud1Y = 100;


let cloud1 = {
    x : cloud1X,
    y : cloud1Y,
    width : cloud1width,
    height : cloud1height,
}

//reset
let resetImg;
let resetwidth = 60;
let resetheight = 60;
let resetX = 340;
let resetY = 110;

let reset = {
    x : resetX,
    y : resetY,
    width : resetwidth,
    height : resetheight,
}

//velocity
let velocityX = -8;
let velocityY = 0;
let gravity = .4;

let gameover = false;
let score = 0;
let Highscore = localStorage.getItem('Highscore');


//cactus
let cactus = {
    x : cactusX,
    y : cactusY,
    width : null,
    height : cactusheight,
}


window.onload = function() {
    board = document.getElementById("back");
    board.height = boardheight;
    board.width = boardwidth;
    context = board.getContext("2d");//to draw on board

    //draw intial dinosaur
    dinoImg = new Image();
    dinoImg.src = "./dino/dino.png";
    dinoImg.onload = function(){
        context.drawImage(dinoImg,dino.x,dino.y,dino.width,dino.height);
    }


    

    //cactus
    cactus1Img = new Image();
    cactus1Img.src = "./dino/cactus1.png";
    
    cactus2Img = new Image();
    cactus2Img.src = "./dino/cactus2 (1).png";

    cactus3Img = new Image();
    cactus3Img.src = "./dino/cactus3.png";

    

    //cloud 
    cloudImg = new Image();
    cloudImg.src = "./dino/cloud.png";
    
    //cloud2
    cloud1Img = new Image();
    cloud1Img.src = "./dino/cloud.png";

    //reset
    resetImg = new Image();
    resetImg.src = "./dino/reset.png";


    requestAnimationFrame(update);
    setInterval(placeCactus, 900);
    document.addEventListener("keydown",movedino); 
    setInterval(increasescore,100);
    detectCollision(dino,cactus);
    
    


}

function update(){
    requestAnimationFrame(update);
    if (gameover){
       document.getElementById("audio1").play();
       
       //alert("Game Over");
      
        return;
    }

   
   
    
    context.clearRect(0,0,board.width,board.height);
   //dino
    velocityY +=gravity;
    dino.y = Math.min(dino.y+velocityY, dinoY);
   
    context.drawImage(dinoImg,dino.x,dino.y,dino.width,dino.height);
   
   

    for(let i=0 ; i < cactusArray.length; i++){
        let cactus = cactusArray[i];
        cactus.x += velocityX;
        
        context.drawImage(cactus.img,cactus.x,cactus.y,cactus.width,cactus.height);
        context.drawImage(cloudImg,cloud.x,cloud.y,cloud.width,cloud.height);
        context.drawImage(cloud1Img,cloud1.x,cloud1.y,cloud1.width,cloud1.height);
       
        
        
        
    

        if (detectCollision(dino,cactus)) {
            gameover = true;
            dinoImg.src="./dino/dino-dead.png"
            dinoImg.onload = function(){
                context.drawImage(dinoImg,dino.x,dino.y,dino.width,dino.height);
            }
            context.fillText("Score :",650,50);
            context.fillText("HighScore :",600,20);
            context.drawImage(resetImg,reset.x,reset.y,reset.width,reset.height);
            context.font = "30px Open Sans";
            context.fillText("G A M E  O V E R",250,80);
            if(!Highscore){
                Highscore = 0;
            }
            if(score>Highscore){
                localStorage.setItem('Highscore',score);
                Highscore = score;
            }
           
            
           
        }
        
    }

    //score
    context.fillStyle = "black";
    context.font = "20px courier";
    //score++;
    //velocityX -=0.001;
    
    
   context.fillText(score,710,50);
   context.font = "20px roboto"
   context.fillText("Score :",650,50);
   context.fillText("HighScore :",600,20);
   context.fillText(Highscore,710,20);

   
   

   

   
}

function movedino(e){
    if (gameover){
        return;
    }

    if(e.code == "Space" && dino.y == dinoY ){
        velocityY = -10;

    }
}

function placeCactus(){

    if (gameover){
        return;
    }
    //place cactus 
    let cactus = {
        img : null,
        x : cactusX,
        y : cactusY,
        width : null,
        height : cactusheight,

    }

    let placeCactusChance = Math.random();

    if (placeCactusChance > .80){
        cactus.img = cactus3Img;
        cactus.width = cactus3width;
        cactusArray.push(cactus);
    }
    else if (placeCactusChance > .60){
        cactus.img = cactus2Img;
        cactus.width = cactus2width;
        cactusArray.push(cactus);
    }
    else if(placeCactusChance > .20){
        cactus.img = cactus1Img;
        cactus.width = cactus1width;
        cactusArray.push(cactus);
    }

    if(cactusArray.length  >5){
        cactusArray.shift();
    }
}

function detectCollision(a,b) {
    return a.x < (b.x + b.width -20) &&
           (a.x + a.width-20)> b.x &&
           a.y < (b.y + b.height-10) &&
           (a.y + a.height-10) > b.y;
}

function increasescore(){
    if (gameover){
        return;
    }


   score =  score+ 1;
   velocityX-=0.005;

    board = document.getElementById("back");
    
    if (score>100 ){
         
        board.style.backgroundColor = ' grey';
    }
    
    if(score>200){
      board.style.backgroundColor = 'white';
    }
       
    if(score>300){
      board.style.backgroundColor = 'blue';
    }
    
    if(score>400){
      board.style.backgroundColor = 'orange';
    }
    
    if(score>500){
      board.style.backgroundColor = 'green';
    }
   
}





