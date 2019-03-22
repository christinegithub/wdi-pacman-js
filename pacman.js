// Setup initial game stats
let score = 0;
let lives = 2;
let powerPellets = 4;


// Define your ghosts here

const inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

const blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

const pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

const clyde = {
  menu_option: '2',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

let ghosts = [inky, blinky, pinky, clyde];

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(() => {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log(`Score: ${score}     Lives: ${lives}`);
  console.log(`Power-Pellets Left: ${powerPellets}`);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (powerPellets > 0) {
    console.log('(p) Eat Power-Pellet');
  }

  ghosts.forEach(function(ghost) {
    console.log(`(${ghost.menu_option}) Eat ${ghost.name} (${ghost.edible ? 'Edible' : 'Inedible'})`);
  })
  console.log('(q) Quit');
}

function eatGhost(ghost) {
  if (ghost.edible === false) {
    lives -= 1
    score += 200;
    // ghost.edible = false;
  } else if (ghost.edible === true) {
    score += 200;
    // ghost.edible = false;
  }
  ghost.edible = false;
  console.log(`Pac-Man killed by ${ghost.name} ${ghost.colour}`);

  gameOver();
}

// If Pac-Man's lives go below 0, it's Game Over and you should exit the game.
// Create a function that checks for this every time Pac-Man loses a life, and calls process.exit(); if necessary.

function gameOver() {
  if (lives < 0) {
    process.exit();
  }
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatPowerPellet() {
  console.log('\nPower-Pellet eaten!');
  score += 50;
  powerPellets -= 1;
  let i = 0
  ghosts.forEach(function(ghost) {
    ghost.edible = true;
    i++;
  })
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);
      break;
    case 'p':
      eatPowerPellet();
      if (powerPellets <= 0) {
        console.log('No more Power-Pellets left!');
      }
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', (key) => {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', () => {
  console.log('\n\nGame Over!\n');
});
