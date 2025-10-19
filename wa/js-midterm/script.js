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
const phoneNumber = [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '];
const phoneNum = document.getElementById("phoneNumber");

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style("display","block");
  cnv.style("position","absolute");
  cnv.style("inset",0);
  cnv.style("z-index",-1);
  const nums = ['1','2','3','4','5','6','7','8','9','0'];
  for(let i = 0; i < numParticles; i++){
    var num = nums[Math.floor(Math.random()*nums.length)];
    particles.push(new Particle(num));
  }
}

function empt(element, index, array) {
    return element != " ";
  }

function draw() {
  //background('#71BBFF');
  c2 = color(255);
  c1 = color('#71BBFF');
  var numString = " ";
  for(let y=0; y<height; y++){
    n = map(y,0,height,0,1);
    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(0,y,width, y);
  }
  particles.forEach((particle,index) => {
    particle.update(phoneNumber);
    particle.drawParticle();
    particle.drawLines(particles.slice(index));
  })
  for(let i = 0; i < phoneNumber.length; i++){
    if(phoneNumber[i] != ' '){
        switch(i) {
            case 0:
                numString += '(' + phoneNumber[i];
                break;
            case 2:
                numString += phoneNumber[i] + ')';
                break;
            case 3: 
                numString += '-' + phoneNumber[i];
                break;
            case 6:
                numString += '-' + phoneNumber[i];
                break;
            default:
                numString += phoneNumber[i];
        }

        
    }
    if(phoneNumber.every(empt)){
        phoneNum.style.color =  'rgba(76, 190, 80, 0.85)';
    }
    else{
        phoneNum.style.color =  'rgb(124,193,254,.85)';
    }

}
  phoneNum.innerHTML = numString;
}


class Particle  {
  constructor(number){
    this.position = createVector(random(windowWidth),random(windowHeight));
    this.velocity = createVector(random(-2,2),random(-2,2));
    this.acceleration = createVector();
    this.number = number;
    this.flag = false;
  }
  update(phone){
    this.detectMouseInteraction(phone);
    this.position.add(this.velocity);
    this.detectEdges();
  }
  detectMouseInteraction(phone){
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
    if((distance < 50) && this.flag == false){
        for(let i = 0; i < phone.length; i++){
            if(phone[i] == ' '){
                phone[i] = this.number;
                this.flag = true;
                break;
            }
        }
       
    }
    if((this.flag == true) && (distance > 50))
    {
        for(let i = 0; i < phone.length; i++){
            if(phone[i] == this.number){
                phone[i] = ' ';
                this.flag = false;
                break;
            }

        }
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
    textSize(50);
    text(this.number,this.position.x,this.position.y);
    //ellipse(this.position.x,this.position.y,6)
    
  }
}
