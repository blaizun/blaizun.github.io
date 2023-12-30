var start = 0;



function setup() {
  createCanvas(windowWidth, 400);
}
function terrain(inc){
  noFill()
  stroke(255);
  beginShape()
  var xoff = start;
  for(var x = 0; x < width; x++){
    vertex(x,map(noise(xoff),0,1,0,height))
    xoff += inc;
  }
  start += inc;
  endShape();   
}

function draw() {
  background(0);
  //shader(myShader);
  
    terrain(0.02);
  text('blaizun.com', 100, 100);
  terrain(0.01);
 
}