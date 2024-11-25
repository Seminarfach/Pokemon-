class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 }, sprites = [] })
    {
        this.position = position 
        this.image = image
        this.frames = {...frames, val: 0, elapsed:0 }

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height 
            
        }
        this.moving = false
        this.sprites = sprites
    }

    draw() {
        ctx.drawImage(
            this.image, // Bild Spieler zeichnen
            this.frames.val * this.width, // Startwert Zuschneiden x-Koordinate
            0, // Startwert Zuschneiden y-Koordinate
            this.image.width / this.frames.max, // Zuschneiden der Breite des Bildes (4 -> vier Figuren -> soll nur eine)
            this.image.height, // Zuschneiden Höhe des Bildes
    
            this.position.x,
            this.position.y,
            
           
            this.image.width / this.frames.max,  // "Echte" Breite Bild
            this.image.height // "Echte" Höhe Bild
    
            // Vier Argumente repäsentieren, "Echte" Eigenschaften Bild zeichnen 
        )

        if (!this.moving) return 

        

        if (this.frames.max > 1) {
            this.frames.elapsed++
        }

        if (this.frames.elapsed % 10 === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0 

        }
 
    } 
}

class Boundary {
    static width = 48
    static height = 48
    constructor({position}){
        this.position = position 
        this.width = 48
        this.height = 48 
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 0, 0, 0)' // Farbe Kollisionsblöcke
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}