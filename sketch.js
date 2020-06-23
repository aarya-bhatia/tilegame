let panda;
let images = [];
let puzzle = [];
let originalTiles = [];
let w = 400;
let h = 400;
let sclx = 100;
let scly = 100;
let strokesInput;
let shuffleStrokes = 100;
let difficulty = "easy";

function preload() {
  panda = loadImage("panda.png");
}

function setup() {
  var canvas = createCanvas(400, 400);
  canvas.parent("canvas");
  panda.resize(w,h);
  setupGame();
  let button = createButton("Shuffle pieces");
  button.parent("button");
  strokesInput = select("#strokes");
  shuffleStrokes = strokesInput.value();

  button.mousePressed(algorithm);
}

function setupGame() {
  images = [];
  puzzle = [];
  originalTiles = [];
  
  for(let i = 0; i < h/scly; i++){
    for(let j = 0; j < w/sclx; j++){
      let x = j * sclx;
      let y = i * scly; 
      //Insert the images in img[].
      let img = panda.get(x, y, sclx, scly);
      images.push(img);
      //Create the cells with blank images.
      let cell = new Cell(x, y, img);
      puzzle.push(cell);
      originalTiles.push(cell);
    }
  }

  //first tile to be blank
  puzzle[0].setImage(null);
  originalTiles[0].setImage(null);
  images.splice(0, 1);
}

function draw() {
  background(200);
  for(let i = 0; i < puzzle.length; i++) {
    if(puzzle[i].img != null)
      puzzle[i].show();  
  }
}

function mousePressed() {
  for(let i = 0; i < puzzle.length; i++) {
    if(puzzle[i].hasMouse()) {
      puzzle[i].nextSpot(puzzle);
    }
  }
}

function algorithm() {
  noLoop();

  shuffleStrokes = strokesInput.value();

  let openSpot; // store the position of blank tile

  for(let moves = 0; moves < shuffleStrokes; moves++) {
    for(let i = 0; i < puzzle.length; i++) {
      if(!puzzle[i].hasImage()){
        openSpot = puzzle[i];
        break;
      }
    }

    let probable = [];

    for(let i = 0; i < puzzle.length; i++) {
      if(puzzle[i].can_go(openSpot)) {
        probable.push(puzzle[i]);
      }
      if(probable.length >= 4) {
        break; //all spots found
      }
    }

    //get a random spot from probable[]
    let randomSpot = probable[floor(random(0, probable.length))];
    switchImages(openSpot, randomSpot);
  }

  loop();
}

function switchImages(cell1, cell2) {
  let temp = cell1.getImage();
  cell1.setImage(cell2.getImage());
  cell2.setImage(temp);
}

/* TODO Feature */
function solve(openSpot, cells) {
  if(originalTiles == puzzle) return true;

  let probable = [];

  for(let i = 0; i < puzzle.length; i++) {
    if(puzzle[i].can_go(openSpot)) {
      probable.push(puzzle[i]);
    }
    if(probable.length >= 4) {
        break; //all spots found
      }
    }
  }

  function level(mode) {
    if(mode == "easy") {
      w = 390;
      h = 390;
      sclx = 130;
      scly = 130;
      resizeCanvas(w, h);
      panda.resize(w, h);
      setupGame();
    }
    else if(mode == "hard") {
      w = 400;
      h = 400;
      sclx = 100;
      scly = 100;
      resizeCanvas(w, h);
      panda.resize(w, h);
      setupGame();
    }
  }