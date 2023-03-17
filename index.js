    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')

    canvas.width = 64*16
    canvas.height = 64*9




    const parsedCollisions = collisionsLevel1.parse2D()
        
   const collisionBlocks =  parsedCollisions.createobjectsFrom2D()



const backgroundLevel1 = new Sprite({
    position:{
        x:0,
        y:0,
    },
    imageSrc:'./img/backgroundLevel1.png'
})

    const player = new Player({
        collisionBlocks,
        imageSrc:'./img/king/idle.png',
        frameRate: 11,
        animations:{
            idleRight:{
                imageSrc:'./img/king/idle.png',
                frameRate: 11,
                frameBuffer: 2,
                loop:true,
            },
            idleLeft:{
                imageSrc:'./img/king/idleLeft.png',
                frameRate: 11,
                frameBuffer: 2,
                loop:true,
            },
            runRight:{
                imageSrc:'./img/king/runRight.png',
                frameRate: 8,
                frameBuffer: 4,
                loop:true,
            },
            runLeft:{
                imageSrc:'./img/king/runLeft.png',
                frameRate: 8,
                frameBuffer: 4,
                loop:true,
            },
            enterDoor:{
                imageSrc:'./img/king/enterDoor.png',
                frameRate: 8,
                frameBuffer: 4,
                loop:false,
            }

        }
    })

    const doors = [
        new Sprite({
            position:{
            x:767,
            y:270,
            },
            imageSrc: './img/doorOpen.png',
            frameRate: 5,
            frameBuffer: 5,
            loop: false,
            autoplay: false,
        })
    ]
  

 
 const keys = {
    w:{
        pressed:false
    },
    a:{
        pressed:false
    },
    d:{
        pressed:false
    }
 }


    function animate(){
        window.requestAnimationFrame(animate)
      
        backgroundLevel1.draw()
        collisionBlocks.forEach(collisionBlock => {
            collisionBlock.draw()
        })

        doors.forEach((door) => {
            door.draw()
        })

        player.handleInput(keys)
        player.draw()
        player.update()
      
      
    }

    animate()

    