const canvas = document.getElementById('gameCanvas');
const c = canvas.getContext('2d');

canvas.width = 64 * 16;
canvas.height = 64 * 9;

let parsedCollisions;
let collisionBlocks;
let background;

let doors;

const player = new Player({
  imageSrc: 'img/king/idle.png',
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11, // equal the number of sprites for this posture
      frameBuffer: 8, // sprite display frequency (the higher the number, the slower the sprite succession)
      loop: true, // repeat the move
      imageSrc: 'img/king/idle.png', // list of sprites to display
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 8,
      loop: true,
      imageSrc: 'img/king/idleLeft.png',
    },
    runRight: {
      frameRate: 8,
      frameBuffer: 8,
      loop: true,
      imageSrc: 'img/king/runRight.png',
    },
    runLeft: {
      frameRate: 8,
      frameBuffer: 10,
      loop: true,
      imageSrc: 'img/king/runLeft.png',
    },
    enterDoor: {
      frameRate: 8,
      frameBuffer: 10,
      loop: false,
      imageSrc: 'img/king/enterDoor.png',
      onComplete: () => {
        console.log('completed animation');
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            if (level >= 3) {
              level = 1;
            } else {
              level++;
            }
            levels[level].init();
            player.switchSprite('idleRight');
            player.preventInput = false;
            gsap.to(overlay, {
              opacity: 0,
            });
          },
        });
      },
    },
  },
});

let level = 1;
let levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel1.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      if (player.currentAnimation) {
        player.currentAnimation.isActive = false;
      }
      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: 'img/backgroundLevel1.png',
      });
      doors = [
        new Sprite({
          position: {
            x: 767,
            y: 270,
          },
          imageSrc: 'img/doorOpen.png',
          frameRate: 5, // number of sprite in the image
          frameBuffer: 10, // display speed of next image in sprite
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
  2: {
    init: () => {
      parsedCollisions = collisionsLevel2.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 50;
      player.position.y = 100;
      if (player.currentAnimation) {
        player.currentAnimation.isActive = false;
      }
      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: 'img/backgroundLevel2.png',
      });
      doors = [
        new Sprite({
          position: {
            x: 772,
            y: 336,
          },
          imageSrc: 'img/doorOpen.png',
          frameRate: 5, // number of sprite in the image
          frameBuffer: 10, // display speed of next image in sprite
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
  3: {
    init: () => {
      parsedCollisions = collisionsLevel3.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 750;
      player.position.y = 150;
      if (player.currentAnimation) {
        player.currentAnimation.isActive = false;
      }
      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: 'img/backgroundLevel3.png',
      });
      doors = [
        new Sprite({
          position: {
            x: 176,
            y: 335,
          },
          imageSrc: 'img/doorOpen.png',
          frameRate: 5, // number of sprite in the image
          frameBuffer: 10, // display speed of next image in sprite
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
};

let overlay = {
  opacity: 0,
};

const keys = {
  z: {
    pressed: false,
  },
  q: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
};

function animate() {
  window.requestAnimationFrame(animate);

  // display elements
  background.draw();

  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.draw();
  });
  doors.forEach((door) => {
    door.draw();
  });

  player.handleInput(keys);

  player.draw();
  player.update();

  c.save();
  c.globalAlpha = overlay.opacity;
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
}

levels[level].init();
animate();
