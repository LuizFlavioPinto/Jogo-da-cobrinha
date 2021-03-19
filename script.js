const arena = document.getElementById('arena');
    spx = randomNumber(15, 5) 
    spy = randomNumber(15, 5) 
    apx = randomNumber()
    apy = randomNumber()

    snakeSpeed = 200
    tailTotal = 1
    tail = []
    direction = 'Right'
    lose = false
    
    ctx = arena.getContext('2d')
    
function move () {
    if(direction == 'Right') spx++
    if(direction == 'Left') spx--
    if(direction == 'Up') spy--
    if(direction == 'Down') spy++
}

function eatFood () {
    if(spx == apx && spy == apy){
        apx = randomNumber()
        apy = randomNumber()
        tailTotal++
    } 
}

function build(){
    ctx.clearRect(0,0,arena.width,arena.height)

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, arena.width, arena.height)

    ctx.fillStyle = 'red'
    ctx.fillRect(apx * 30,apy * 30, 30, 30);
    
    ctx.fillStyle = 'green'
    
    tail[tailTotal - 1] = { x: spx, y: spy}
    
    for(let i = 0; i < tail.length; i++){
        ctx.fillRect(tail[i].x * 30, tail[i].y * 30, 30, 30)
    }

    for(let i = 0; i < tail.length - 1; i++){
        if(spx == tail[i].x && spy == tail[i].y){
            lose = true
        }else tail[i] = tail[i+1]   
    }
    
    ctx.fillRect(spx * 30, spy * 30, 30, 30)
}

function gameover () {
    inGettingOutOfTheArena()

    if(lose == true){
        lose = false
        alert('GAMEOVER')
        tailTotal = 1
        tail = []
    }  
}


function inGettingOutOfTheArena () {
    if(spx > 19 || spx < 0 || spy > 19 || spy < 0){
        lose = true
        spx = randomNumber(15, 5)
        spy = randomNumber(15, 5)
    }
}

function randomNumber (max = 19,min = 0) {
    let generatedNumber = Math.floor((Math.random() * (max - min) + min))
    console.log(generatedNumber)
    return generatedNumber
}


document.addEventListener('keydown', ((evt) =>{
    let command = evt.key.replace('Arrow', '')

    if(command == "Right" || command == "d" || command == "D")direction = 'Right'
    if(command == "Left" || command == "a" || command == "A")direction = 'Left'
    if(command == "Up" || command == "w" || command == "W")direction = 'Up'
    if(command == "Down" || command == "s" || command == "S")direction = 'Down'
}))

////////////////////////////////////////////////////////////////////////////

setInterval(() => {
    move()
    eatFood()
    build()
    gameover()

}, snakeSpeed);


build()