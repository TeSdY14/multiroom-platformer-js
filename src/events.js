window.addEventListener('keydown', (event) => {
  if (player.preventInput) return;
  switch (event.key.toLowerCase()) {
    case 'z':
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i];
        if (
          player.hitbox.position.x + player.hitbox.width <=
            door.position.x + door.width &&
          player.hitbox.position.x >= door.position.x &&
          player.hitbox.position.y + player.hitbox.height >= door.position.y &&
          player.hitbox.position.y <= door.position.y + door.height
        ) {
          player.velocity.x = 0;
          player.velocity.y = 0;
          player.switchSprite('enterDoor');
          player.preventInput = true;
          door.play();
          return;
        }
      }
      if (player.velocity.y === 0) {
        player.velocity.y = -20;
      }
      break;
    case 'q':
      keys.q.pressed = true;
      break;
    case 'd':
      keys.d.pressed = true;
      break;
    case 's':
      break;
  }
});

window.addEventListener('keyup', (event) => {
  console.log('event', event.key);
  switch (event.key.toLowerCase()) {
    case 'z':
      player.velocity.y = 0;
      break;
    case 'q':
      keys.q.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
    case 's':
      break;
  }
});
