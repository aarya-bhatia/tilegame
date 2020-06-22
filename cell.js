function Cell(x, y, img) {
  this.x = x;
  this.y = y;
  this.img = img;
}

Cell.prototype.setImage = function(img){
  this.img = img;  
};

Cell.prototype.show = function() {
  strokeWeight(3);
  rect(this.x, this.y, sclx, scly);
  image(this.img,this.x,this.y);
};

Cell.prototype.nextSpot = function(cells) {
  for(let i = 0; i < cells.length; i++){
    if(this.can_go(cells[i]) && cells[i].img == null) {
      console.log(this.x, this.y, cells[i].x, cells[i].y);
      //console.log(cells[i] + " is next.");
      let temp = cells[i].img;
      cells[i].img = this.img;
      this.img = temp;
    }
  }
};

Cell.prototype.can_go = function(cell) {
  let dx = abs(this.x - cell.x);
  let dy = abs(this.y - cell.y);
  
  return ( (this.x == cell.x && dy == scly) ||
          (this.y == cell.y && dx == sclx));
};

Cell.prototype.hasMouse = function(){  
  return ((mouseX >= this.x && mouseX < this.x + sclx) &&
          (mouseY >= this.y && mouseY < this.y + scly));
};