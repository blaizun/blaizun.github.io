/*const p5Container = document.querySelector('#p5-container')*/
let isMouseMoved = true;
const dotSize = 5
spacing = dotSize * 3
let dots = [];
/*let w = p5Container.clientWidth;
let h = p5Container.clientHeight; */

function setup() {
  
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('z-index: -1;');
  /*cnv.parent(p5Container);*/
  noStroke();
  for (let i = 0; i < width; i += spacing) {
    for (let j = 0; j < height; j += spacing){
      let d = new Dot(i,j, dotSize)
      dots.push(d)
    }
  }
}


function draw() {
  background(0);
  dots.forEach(dot => {
    dot.update()
    dot.render()
  })

}

function mouseMoved() {
  isMouseMoved = true;
  setTimeout(() => {
  isMouseMoved = false
  },500)
  
}

class Dot {
  constructor(x,y,size) {
    this.x = x;
    this.y = y;
    this.size = size
    this.transparency = 40;
  }
  
  update(){
    let distance = dist(mouseX,mouseY,this.x,this.y)
    if ((this.x > 100 && this.x < 660 )&& (this.y > 100 && this.y < 220)){
      this.transparency = 40;
    }

    
    if (distance< 45 ){
      if(isMouseMoved)
        {
          this.transparency = map(distance,45,0,40,210)
        }
      else{
        this.transparency = map(distance,45,0,40,150)
      }
      //this.size = map(distance,50,0,dotSize,dotSize*2)
    }
    else{
      this.transparency = 40
      //this.size = dotSize
    }
    if (distance < 150){
      if(isMouseMoved)
        {
          this.size = map(distance,150,0,dotSize,dotSize*2)
        }
      else{
        this.size = map(distance,150,0,dotSize,dotSize*2)
      }
    }
    else {
      this.size = dotSize
    }
    
  
  }
  
  render() {
    fill(255, this.transparency)
    ellipse(this.x, this.y, this.size)
  }
}