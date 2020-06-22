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
}

function setupGame() {
  /*
  w = window.innerWidth - (window.innerWidth) % sclx;
  h = window.innerHeight - (window.innerHeight) % scly;
  resizeCanvas(w, h);
  */
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
      let cell = new Cell(x, y, null);
      puzzle.push(cell);
      
      console.log(x,y);
      image(img,x,y);
    }
  }

  
  //Shuffle Algorithm
  //note that last cell will not contain image..
  for(let i = 0; i < puzzle.length - 1; i++) {
    //Get a random image from the img array
    //Assign this image to the current Cell object
    //Remove that image from img[] so that another cell
    //will not have duplicate copies.
    
    let randomIndx = floor(random(0, images.length));
    let randomImg = images[randomIndx];
    puzzle[i].setImage(randomImg);
    images.splice(randomIndx, 1);
  }
  
  //loop();
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
      //console.log(puzzle[i] + " is selected.");
      puzzle[i].nextSpot(puzzle);
    }
  }
}

/*
window.addEventListener("resize", function(){
  noLoop();
  setupGame();
});
*/