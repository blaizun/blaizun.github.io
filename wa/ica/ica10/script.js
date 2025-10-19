function createParagraph() {
    const para = document.createElement("span");
    para.classList.add("dot");
    document.body.appendChild(para);
  }

  function deleteChild() { 
    var e = document.querySelector("body"); 
    
    //e.firstElementChild can be used. 
    var child = e.lastElementChild;  
    if (child) {
        e.removeChild(child);
    }
} 
var btn = document.getElementById( 
"btn").onclick = function() { 
    deleteChild(); 
} 