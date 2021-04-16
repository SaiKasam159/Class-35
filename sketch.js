var ball;
var database, position, ball1;

function setup(){
    database = firebase.database()
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    ball1 = database.ref('ball/position')
    ball1.on('value', readPosition, showError)
}

function draw(){
    background("white");
   
    //movement by sending the info to database
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    
    drawSprites();
}

//writing the position of the ball into the database
function writePosition(x,y){
    database.ref('ball/position').set({
        x: position.x + x,
        y: position.y + y,   
    })
}

//reading the data from the datatbase
function readPosition(data){

    position = data.val()
    ball.x = position.x
    ball.y = position.y

}

//if we get errors but i won't get none cuz i am master programmer 
function showError(){

    console.log('error in writing the value in database')
}