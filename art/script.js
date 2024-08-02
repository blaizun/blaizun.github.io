
const images = [
  '../home/imgs/personal/MAL-2Final.png',
  '../home/imgs/personal/MAL-3.png',
  '../home/imgs/personal/MAL-4.png',
  '../home/imgs/personal/MAL1.png',
  '../home/imgs/personal/WLG2REAL.png',
  '../home/imgs/work/CruelOilBlaizunDiamond.jpg',
  '../home/imgs/work/NailClippersBlaizunDiamond.jpg',
  '../home/imgs/work/SwankyCover-1.jpg',
  '../home/imgs/IMGClass/1.png',
  '../home/imgs/IMGClass/8.png',
  '../home/imgs/IMGClass/10.png',
  '../home/imgs/IMGClass/DumbJealous.png',
  '../home/imgs/IMGClass/FeelsLikeADream.png',
  '../home/imgs/IMGClass/honestly.png',
  '../home/imgs/IMGClass/Iknowyouredownbad.png',
  '../home/imgs/IMGClass/JumpedInTooDeepREALFINAL.png',
  '../home/imgs/IMGClass/proj7.png',
  '../home/imgs/IMGClass/Proj8Insta.png',
  '../home/imgs/IMGClass/proj9.png',
  '../home/imgs/IMGClass/ReachingOutToMe.png',


  // Add more image sources as needed
];
const container = document.getElementById('imageContainer');

images.forEach((src) => {
  const card = document.createElement('div');
  card.classList.add("card");
  const imgElement = document.createElement('img');
  imgElement.src = src;
  card.appendChild(imgElement);
  container.appendChild(card);
});




var start = 0;
var start2 = 0;
function setup() {
  createCanvas(windowWidth, 400);
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
function terrain(inc){
  noFill()
  stroke(255);
  beginShape()
  var xoff = start;
  circle(475,map(noise(xoff+inc),0,1,0,height),50)
  circle(475+inc,map(noise(xoff+inc),0,1,0,height),50)
  circle(475+inc*3,map(noise(xoff+inc*3),0,1,0,height),50)

  circle(width-475,map(noise(xoff+(inc*920)),0,1,0,height),50)

  for(var x = 500; x < width-500; x++){
    //strokeWeight(map(noise(xoff),0,1,1,5));
    vertex(x,map(noise(xoff),0,1,0,height));
    xoff += inc;
  }
  start += inc;
  endShape();
}

function terrain2(inc){
  noFill()
  stroke(255,61,65);
  beginShape()
  var xoff = start;
  let pos = width-475
  text('blaizun.com', 100, 105);
  circle(pos,map(noise(xoff),0,1,0,height),50)
  circle(pos+inc,map(noise(xoff+inc),0,1,0,height),50)
  circle(pos+inc*3,map(noise(xoff+inc*3),0,1,0,height),50)

  circle(475,map(noise(xoff+inc*(920)),0,1,0,height),50)
  text('blaizun.com', 100,map(noise(xoff+inc*(920))) );
  for(var x = width-500; x > 500; x--){
    
    //strokeWeight(map(noise(xoff),0,1,1,5));
    vertex(x,map(noise(xoff),0,1,0,height));
    xoff += inc;
  }
  start2 += inc;
  endShape();

}


function draw() {
  textSize(64);
  background(0);
  //shader(myShader);
  //terrain(0.02);
  terrain(0.001);
  //terrain2(0.02);
  
  terrain2(0.001);

  text('blaizun.com', 100, 100);
  
  
  //stroke(255,61,65);
  text('blaizun.com', 100, 110);
  stroke(0);
  text('blaizun.com', 100, 105);
  //text('art',170,110);
  textSize(12);
  let dir = 1;

  //for (let i = 0.02; i < 0.1; i+=0.02){
  //  let j = map(i,0.02,0.1,120,255);
  //  terrain(i,j,1);
  //}

 
}

