// draw a single particle at random position and move it
// detect edges and reverse direction
// put multiple particles on screen
// add mouse interaction
// add lines

// draw a single particle at random position and move it
// detect edges and reverse direction
// put multiple particles on screen
// add mouse interaction
// add lines
const particles = [];
const numParticles = 45;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style("display","block");
  cnv.style("position","absolute");
  cnv.style("inset",0);
  cnv.style("z-index",-1);
  for(let i = 0; i < numParticles; i++){
    particles.push(new Particle());
  }
}



function draw() {
  //background('#71BBFF');
  c2 = color(255);
  c1 = color('#71BBFF');
  
  for(let y=0; y<height; y++){
    n = map(y,0,height,0,1);
    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(0,y,width, y);
  }
  particles.forEach((particle,index) => {
    particle.update();
    particle.drawParticle();
    particle.drawLines(particles.slice(index));
  })
}


class Particle {
  constructor(){
    this.position = createVector(random(windowWidth),random(windowHeight));
    this.velocity = createVector(random(-2,2),random(-2,2));
    this.acceleration = createVector();
  }
  update(){
    this.detectMouseInteraction();
    this.position.add(this.velocity);
    this.detectEdges();
  }
  detectMouseInteraction(){
    let mouse = createVector(mouseX,mouseY);
    let direction = mouse.sub(this.position);
    let distance = direction.mag() //magnitude
    
    if(distance < 100) {
      direction.normalize();
      direction.mult(0.5);
      this.acceleration = direction;
      this.velocity.add(this.acceleration);
      this.velocity.limit(4);
    }    
  }
  detectEdges() {
    if(this.position.x < 0 || this.position.x > windowWidth){
      this.velocity.x *= -1;
    }
    if(this.position.y < 0 || this.position.y > windowHeight){
      this.velocity.y *= -1;
    }
  }
  drawLines(particles){
    particles.forEach(particle => {
      let distance = dist(this.position.x,this.position.y,
                          particle.position.x,particle.position.y); // gets distance between current particle and all other particles
    const maxDistance = 200;
    if(distance < maxDistance) {
      let alpha = map(distance, 0,maxDistance,255,0);
      stroke(255,alpha); //line color
      line(this.position.x,this.position.y,
                          particle.position.x,particle.position.y);
    }
    })
    
  }
  drawParticle() {
    fill(255);
    noStroke();
    ellipse(this.position.x,this.position.y,6)
    
  }
}
