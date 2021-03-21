const arena = document.getElementById('arena');
    counter = document.querySelector('.counter')
    menu = document.querySelector('.menu')

    spx = randomNumber(13, 7) 
    spy = randomNumber(13, 7) 
    apx = randomNumber()
    apy = randomNumber()

    snakeSpeed = 200
    direction = 'Right'
    lose = false
    tailTotal = 1
    tail = []
    command = null

    paused = true
    intervalId = null
    
    ctx = arena.getContext('2d')
    
function move () {
    if(direction == 'Right') spx++
    if(direction == 'Left') spx--
    if(direction == 'Up') spy--
    if(direction == 'Down') spy++
}

function changeDirection() {
    if((command == "Right" || command == "d" || command == "D") && direction != 'Left')direction = 'Right'
    if((command == "Left" || command == "a" || command == "A") && direction != 'Right')direction = 'Left'
    if((command == "Up" || command == "w" || command == "W") && direction != 'Down')direction = 'Up'
    if((command == "Down" || command == "s" || command == "S") && direction != 'Up')direction = 'Down'
}

function eatFood () {
    if(spx == apx && spy == apy){
        apx = randomNumber()
        apy = randomNumber()

        for(let i = 0; i < tail.length; i++){
            if(apx == tail[i].x && apy == tail[i].y || apx == spx && apy == spy){
                apx = randomNumber()
                apy = randomNumber()
            }
        }
        
        tailTotal++
    } 
}

function updateCounter () {
    counter.innerHTML = `<h1 class="counter">SCORE: ${tailTotal}</h1>` 
}

function build(){
    ctx.clearRect(0,0,arena.width,arena.height)
    
    ctx.fillStyle = "rgb(56, 172, 74)"
    ctx.fillRect(0, 0, arena.width, arena.height)

    ctx.fillStyle = 'red'
    ctx.fillRect(apx * 25,apy * 25, 25, 25);
    
    
    ctx.fillStyle = 'blue'
    
    tail[tailTotal - 1] = { x: spx, y: spy}
    
    for(let i = 0; i < tail.length; i++){
        ctx.fillRect(tail[i].x * 25, tail[i].y * 25, 25, 25)
    }

    for(let i = 0; i < tail.length - 1; i++){
        if(spx == tail[i].x && spy == tail[i].y){
            lose = true
        }else tail[i] = tail[i+1]   
    }
    
    ctx.fillRect(spx * 25, spy * 25, 25, 25)
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

function changeVisibility () {
    if(paused == false){
        clearInterval(intervalId)
        paused = true
        menu.style.display = 'flex'
    }
}

function gameover () {
    inGettingOutOfTheArena()

    if(lose == true){
        lose = false
        tailTotal = 1
        tail = []
        changeVisibility()
    }  
}

document.addEventListener("visibilitychange", changeVisibility, false);

document.addEventListener('keydown', ((evt) => command = evt.key.replace('Arrow', '')))

////////////////////////////////////////////////////////////////////////////

function playPause() {
    paused = paused == true? false: true

    if(paused == false){

        intervalId = setInterval(() => {
            changeDirection()
            move()
            eatFood()
            updateCounter()
            build()
            gameover()
        }, snakeSpeed);

        menu.style.display = 'none'

    } else {
        clearInterval(intervalId)
        menu.style.display = 'flex'
    }

}


build()