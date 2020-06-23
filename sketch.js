let panda;
let images = [];
let puzzle = [];
let w = 400;
let h = 400;
let sclx = 100;
let scly = 100;

function preload() {
  panda = loadImage("panda.png");
}

function setup() {
  var canvas = createCanvas(400, 400);
  canvas.parent("canvas");
  panda.resize(w,h);
  setupGame();
  let button = createButton("Shuffle pieces");
  select(".header").child(button);
  button.mousePressed(handleShuffle);
}

function setupGame() {
  images = [];
  puzzle = [];
  
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
      //console.log(x,y);
    }
  }

  //first tile to be blank
  puzzle[0].setImage(null);
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

function handleShuffle() {
  images = shuffle(images);
  puzzle = shuffle(puzzle);

  for(let i = 0; i < puzzle.length; i++) {
    puzzle[i].setImage(null);
    puzzle[i].setImage(images[i]);
  }
}