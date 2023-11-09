const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = ["images/pic1.jpg","images/pic2.jpg","images/pic3.jpg","images/pic4.jpg","images/pic5.jpg"];

/* Declaring the alternative text for each image file */
var imgDict = {
    "images/pic1.jpg":"an eyeball",
    "images/pic2.jpg":"a stone formation",
    "images/pic3.jpg":"some flowers",
    "images/pic4.jpg":"some egyptian art",
    "images/pic5.jpg":"a butterfly"};
/* Looping through images */
console.log(imgDict["pic1.jpg"])
for(img of images) {
    const newImage = document.createElement('img');
    newImage.setAttribute("src",img);
    newImage.setAttribute("alt",imgDict.img);
    newImage.addEventListener("click",function(){
        let cur = document.querySelector('.displayed-img');
        cur.setAttribute('src',newImage.src);
        cur.setAttribute('alt',newImage.alt);
    });
    thumbBar.appendChild(newImage);
    
    
}


/* Wiring up the Darken/Lighten button */
btn.addEventListener("click",function(){
    if(btn.getAttribute('class') === 'dark'){
        btn.setAttribute('class','light');
        btn.textContent = "Lighten";
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";

        return;
    }
    btn.setAttribute('class','dark');
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgba(0,0,0,0)";
    
});