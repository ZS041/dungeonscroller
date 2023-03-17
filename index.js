    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')

    canvas.width = 64*16
    canvas.height = 64*9

    let parsedCollisions 
    let collisionBlocks 

    let background 
    
    let doors 

    const player = new Player({
        
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
                onComplete: () => {
                    console.log('completed animation')
                   
                    gsap.to(overlay, {
                        opacity: 1,
                        onComplete:() => {
                            level++
                            if (level === 3) level = 1
                            levels[level].init()
                            player.switchSprite('idleRight')
                            player.preventInput = false
                            gsap.to(overlay, {opacity:0})

                        }
                    })

                }
            }

        }
    })


    let level = 1
    let levels = {
        1: {
            init: () => {
            parsedCollisions = collisionsLevel1.parse2D()
        
            collisionBlocks =  parsedCollisions.createobjectsFrom2D()
            player.collisionBlocks = collisionBlocks

            background = new Sprite({
        position:{
            x:0,
            y:0,
        },
        imageSrc:'./img/backgroundLevel1.png'
    })
    doors =  [
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

            }
        },

        2: {
            init: () => {
            parsedCollisions = collisionsLevel2.parse2D()
        
            collisionBlocks =  parsedCollisions.createobjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 96
            player.position.y = 140
            if(player.currentAnimation)player.currentAnimation.isActive = false

            background = new Sprite({
        position:{
            x:0,
            y:0,
        },
        imageSrc:'./img/backgroundLevel2.png'
    })
    doors =  [
        new Sprite({
            position:{
            x:772,
            y:336,
            },
            imageSrc: './img/doorOpen.png',
            frameRate: 5,
            frameBuffer: 5,
            loop: false,
            autoplay: false,
        })
    ]

            }
        }

        
    }









    

  

 
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


const overlay ={
    opacity:0,
}

    function animate(){
        window.requestAnimationFrame(animate)
      
        background.draw()
       /*
       //No longer render collision blocks
       
       collisionBlocks.forEach(collisionBlock => {
            collisionBlock.draw()
        })*/

        doors.forEach((door) => {
            door.draw()
        })

        player.handleInput(keys)
        player.draw()
        player.update()
        c.save()
        c.globalAlpha = overlay.opacity
        c.fillStyle = 'black'
        c.fillRect(0,0,canvas.width,canvas.height)
        c.restore()
      
      
    }


    levels[level].init()
    animate()

    