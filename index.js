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
            }

        }
    })
  

 
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

        player.velocity.x=0
        if(keys.d.pressed){
            player.switchSprite('runRight')
        player.velocity.x=5
    player.lastDirection = 'right'}
        else if (keys.a.pressed) {
            player.switchSprite('runLeft')
            player.velocity.x=-5
            player.lastDirection = 'left'}
        else {
            if(player.lastDirection === 'left')player.switchSprite('idleLeft')
            else player.switchSprite('idleRight')
        }
        player.draw()
        player.update()
      
      
    }

    animate()

    