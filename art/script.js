
// const images = [
//   '../home/imgs/personal/MAL-2Final.png',
//   '../home/imgs/personal/MAL-3.png',
//   '../home/imgs/personal/MAL-4.png',
//   '../home/imgs/personal/MAL1.png',
//   '../home/imgs/personal/WLG2REAL.png',
//   '../home/imgs/work/CruelOilBlaizunDiamond.jpg',
//   '../home/imgs/work/NailClippersBlaizunDiamond.jpg',
//   '../home/imgs/work/SwankyCover-1.jpg',
//   '../home/imgs/IMGClass/1.png',
//   '../home/imgs/IMGClass/8.png',
//   '../home/imgs/IMGClass/10.png',
//   '../home/imgs/IMGClass/DumbJealous.png',
//   '../home/imgs/IMGClass/FeelsLikeADream.png',
//   '../home/imgs/IMGClass/honestly.png',
//   '../home/imgs/IMGClass/Iknowyouredownbad.png',
//   '../home/imgs/IMGClass/JumpedInTooDeepREALFINAL.png',
//   '../home/imgs/IMGClass/proj7.png',
//   '../home/imgs/IMGClass/Proj8Insta.png',
//   '../home/imgs/IMGClass/proj9.png',
//   '../home/imgs/IMGClass/ReachingOutToMe.png',


//   // Add more image sources as needed
// ];
// const container = document.getElementById('imageContainer');

// images.forEach((src) => {
//   const card = document.createElement('div');
//   card.classList.add("card");
//   const imgElement = document.createElement('img');
//   imgElement.src = src;
//   card.appendChild(imgElement);
//   container.appendChild(card);
// });




var start = 0;
var start2 = 0;
function setup() {
  createCanvas(windowWidth, windowHeight*.75
  );

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
function terrain1(inc,min){
  const leftSide = window.innerWidth * min;
  const rightSide = window.innerWidth * (1-min);
  const circleSize = 50;
  const innerLeft = leftSide + (circleSize/2);
  const innerRight = rightSide - (circleSize/2);
  const heightMax = height;
  const heightMin = height-(height*min);
  noFill()
  stroke(255);
  beginShape()
  var xoff = start;
  circle(leftSide,map(noise(xoff+inc),0,1,heightMin,heightMax),circleSize)
  circle(rightSide,map(noise(xoff+(inc*(window.innerWidth - (innerLeft*2)))),0,1,heightMin,heightMax),circleSize)
  for(var x = innerLeft; x < innerRight; x++){
    //strokeWeight(map(noise(xoff),0,1,1,5));
    vertex(x,map(noise(xoff),0,1,heightMin,heightMax));
    xoff += inc;
  }
  start += inc;
  endShape();
}
function terrain2(inc,min){
  const leftSide = window.innerWidth * (1-min);
  const rightSide = window.innerWidth * min;
  const circleSize = 50;
  const innerLeft = leftSide - (circleSize/2);
  const innerRight = rightSide + (circleSize/2);
  const heightMax = height;
  const heightMin = height-(height*min);
  noFill()
  stroke(255,61,65);
  beginShape()
  var xoff = start;
  circle(leftSide,map(noise(xoff+inc),0,1,heightMin,heightMax),circleSize)
  circle(rightSide,map(noise(xoff+(inc*(window.innerWidth - (innerRight*2)))),0,1,heightMin,heightMax),circleSize)
  for(var x = innerLeft; x > innerRight; x--){
    //strokeWeight(map(noise(xoff),0,1,1,5));
    vertex(x,map(noise(xoff),0,1,heightMin,heightMax));
    xoff += inc;
  }
  start += inc;
  endShape();
}

function blaizun(){
  for(var i = 0; i < height; i+= 50){
    stroke(255,61,65,map(height-i,height,0,255,0))
    text('blaizun.com', window.innerWidth/2, i)
  }

}



function draw() {
  textSize(56);
  textAlign(CENTER);
  background(0);

  terrain1(0.001,.1);
  terrain2(0.001,.1);
  terrain1(0.001,.2);
  terrain2(0.001,.2);
  terrain1(0.001,.3);
  terrain2(0.001,.3);
  terrain1(0.001,.4);
  terrain2(0.001,.4);



  // text('blaizun.com', 100, 100);
  blaizun();
  
  // //stroke(255,61,65);
  // text('blaizun.com', 100, 110);
  // stroke(0);
  // text('blaizun.com', 100, 105);
  //text('art',170,110);
  textSize(12);
  let dir = 1;

  //for (let i = 0.02; i < 0.1; i+=0.02){
  //  let j = map(i,0.02,0.1,120,255);
  //  terrain(i,j,1);
  //}

 
}

