function createParagraph() {
    const para = document.createElement("div");
    para.classList.add("dot");
    const flexy = document.getElementById("flexy");
    flexy.appendChild(para);
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