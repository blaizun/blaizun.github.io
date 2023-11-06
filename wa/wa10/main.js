const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}
var storyText = "\"It was 94 fahrenheit outside on a Monday. :insertx: was in a disassociative state, listless, and sweaty. In the breast pocket of his sunbleached polo, there were :inserty:. He'd stolen them from a woman who'd been kind enough to share her weekend with him. Her name was :insertz: and she was beautiful. She tip-toed around his mind while the sun beat his face red. He knew he would never see her again and he hated it.\" - Bob";
var insertX = ["Jack","Milo","Mike"];
var insertY = ["two cigarettes","three pieces of gum","four toothpicks"];
var insertZ = ["Emma","Gracey","Chloe"];
randomize.addEventListener('click', result);

function result() {
    var newStory = storyText;;
    var xItem = randomValueFromArray(insertX);
    var yItem = randomValueFromArray(insertY);
    var zItem = randomValueFromArray(insertZ);
    newStory = newStory.replace(/:insertx:/g,xItem);
    newStory = newStory.replace(/:inserty:/g,yItem);
    newStory = newStory.replace(/:insertz:/g,zItem);

  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace(/Bob/g,name);


  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(300/14) + " stone";
    const temperature =  Math.round((94-32)*(5/9)) + " centigrade";
    newStory = newStory.replace(/94 fahrenheit/g,temperature);
    newStory = newStory.replace(/300 pounds/g,weight);

  }


  story.textContent = newStory;
  story.style.visibility = 'visible';
}

