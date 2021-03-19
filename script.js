const arena = document.getElementById('arena');
    spx = randomNumber(13, 7) 
    spy = randomNumber(13, 7) 
    apx = randomNumber()
    apy = randomNumber()

    snakeSpeed = 200
    direction = 'Right'
    lose = false
    tailTotal = 1
    tail = []
    
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
        for(let i = 0; i < tail.length; i++){
            if(apx == tail[i].x && apy == tail[i].y || apx == spx && apy == spy){
                console.log('deu ruim')
                apx = randomNumber()
                apy = randomNumber()
            }
        }
        
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
        spx = randomNumber(13, 7)
        spy = randomNumber(13, 7)
    }
}

function randomNumber (max = 19,min = 0) {
    let generatedNumber = Math.floor((Math.random() * (max - min) + min))
    return generatedNumber
}

document.addEventListener('keydown', ((evt) =>{
    let command = evt.key.replace('Arrow', '')

    if((command == "Right" || command == "d" || command == "D") && direction != 'Left')direction = 'Right'
    if((command == "Left" || command == "a" || command == "A") && direction != 'Right')direction = 'Left'
    if((command == "Up" || command == "w" || command == "W") && direction != 'Down')direction = 'Up'
    if((command == "Down" || command == "s" || command == "S") && direction != 'Up')direction = 'Down'
}))

////////////////////////////////////////////////////////////////////////////

setInterval(() => {
    move()
    eatFood()
    build()
    gameover()

}, snakeSpeed);


build()