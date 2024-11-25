const canvas = document.querySelector('canvas'); // definiert Variable mit konstantem Wert 
const ctx = canvas.getContext('2d'); // -"- , vorbestimmt 2d Zeichenelemente für das Canvas

canvas.width = window.innerWidth; // Breite des Canvas
canvas.height = window.innerHeight; // Höhe des Canvas

const collisionsMap = [] // Erstellt neues Array
 
for(let i =  0; i < collision.length; i+=70){// zur Erstellung von neuen Arrays für des Rechteck(Tile)
    collisionsMap.push(collision.slice(i, 70 + i)) // fügt Array alle 70 Stellen ein Neues hinzu
}// sodass man am Ende Collision wie Tiled abgebildet in Array-Format erhält
 


const boundaries = []

const offset = { // Variable für die vorgenommene Verschiebung des Hintergrundes
    x: -740,
    y: -620
}


collisionsMap.forEach((row, i) => { // Schleife für jede Reihe, "i" ist der Index der jeweiligen Reihe
    row.forEach((symbol, j) => { // Schleife für jedes Element innerhalb einer Reihe, "j" ist der Index des jeweiligen Elements
        if (symbol === 1025)
        boundaries.push(new Boundary({position:{ // Erstellt neues Array mit x- u. y-Koordinate
            x: j * Boundary.width + offset.x, // x-Koordinate Rechtecke collisions + die Verschiebung
            y: i * Boundary.height + offset.y // y-Koordinate Rechtecke Collisions + die Verschiebung
        
            
        }}))
    })

} )




const image = new Image(); // erstellt HTML Tag
image.src = './img/Pellet Town.png'; // Konstante wird mit Bild belegt

const playerDownImage = new Image();
playerDownImage.src = './img/playerDown.png'

const playerUpImage = new Image();
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image();
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image();
playerRightImage.src = './img/playerRight.png'


const foregroundImage = new Image();
foregroundImage.src = './img/foregroundObjects.png'


const player = new Sprite({
    position: {
        x: canvas.width / 2 - (192 / 4) / 2, // Koordinaten x-Achse Mitte Haus
        y: canvas.height /2 - 68  / 2 // Koordinaten y-Achse Mitte haus
    },
    image: playerDownImage,
    frames: { // wird benötigt um das Zuschneiden zu ermögliche, max kommt aus dem Sprite
        max: 4
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage,
    }
})

console.log(player)

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image 

})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage

})


const keys = {
    w: {
        pressed: false 
    },

    a: {
        pressed: false 
    },

    s: {
        pressed: false 
    },

    d: {
        pressed: false 
    }
}



const movables = [background, ...boundaries, foreground] // Array für alle beweglichen Objekte -> Vereinfachung
 
function rectangularCollision({rectangle1, rectangle2}){
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y 
    
    )

}

function animate(){
    
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach((boundary) => {
       boundary.draw()

 

    })
    
     

    player.draw()
    foreground.draw()

    
    let moving = true 

    player.moving = false 

    if (keys.w.pressed) {
        player.moving = true
        player.image = player.sprites.up
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries [i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }}
                })
            ) {
                
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.y += 3
            })
    

    
    } else if (keys.a.pressed) {
        player.moving = true
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries [i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }}
                })
            ) {
                
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.x += 3
            })
       
        


    } else if (keys.s.pressed) {
        player.moving = true
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries [i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }}
                })
            ) {
                
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.y -= 3
            })
       

    } else if (keys.d.pressed) {
        player.moving = true
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries [i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }}
                })
            ) {
                
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.x -= 3
            })
    }


}


    


window.addEventListener('keydown', (e) => { // legt Werte für die Varibalen fest 
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
        break 

        case 'a':
            keys.a.pressed = true
        break 

        case 's':
            keys.s.pressed = true
        break 

        case 'd':
            keys.d.pressed = true 
        break 
      
       

    }
        
})

window.addEventListener('keyup', (e) => { // legt Werte für die Varibalen fest 
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
        break 

        case 'a':
            keys.a.pressed = false
        break 

        case 's':
            keys.s.pressed = false
        break 

        case 'd':
            keys.d.pressed = false
        break 
      
       

    }
})     

animate()
