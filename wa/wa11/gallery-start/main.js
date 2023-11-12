const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const body = document.querySelector('body');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = ["images/pic1.png","images/pic2.png","images/pic3.png","images/pic4.png","images/pic5.png"];

/* Declaring the alternative text for each image file */
const imgDict = {
    "images/pic1.png":["an eyeball","#AF736D"],
    "images/pic2.png":["a stone formation","#232220"],
    "images/pic3.png":["some flowers","#242426"],
    "images/pic4.png":["some egyptian art","#BEB3A0"],
    "images/pic5.png":["a butterfly","#1F2532"]};
/* Looping through images */
console.log(imgDict["images/pic1.png"][0]);
for(img of images) {
    const newImage = document.createElement('img');
    newImage.setAttribute("src",img);
    newImage.setAttribute("alt",imgDict[img][0]);
    newImage.addEventListener("click",function(){
        let cur = document.querySelector('.displayed-img');
        cur.setAttribute('src',newImage.src);
        cur.setAttribute('alt',newImage.alt);
        body.style.backgroundColor = imgDict[img][1];
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