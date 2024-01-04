
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
  text('blaizun.com', 100, 105);
  text('blaizun.com', 100, 110);
  textSize(32);
  text('art',170,110);
  textSize(12);
  terrain(0.01);
 
}

