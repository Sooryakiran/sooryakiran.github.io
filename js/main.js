function setup(){
    console.log("Starting");
    mobile = detectMob();
    console.log(mobile);
    // var mobile_url = "m/";
    if(mobile)

        window.location.replace("m.html");
        // document.getElementById("box").classList.remove('container');
    
        

}

function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

setup();

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight;
}
  



$(document).ready(function () {
    rewrite();
    document.getElementById("wrapid").addEventListener("scroll", myScrollFunc);
    upid = document.getElementById("upid");
    
    Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
        includeHTML();
        AOS.init();
    });
});



function rewrite(){
    var elem = document.getElementById("about-texts");
    // if (elem.small == "0"){
    if(isOverflown(elem)) {
        var to_write = document.getElementById("about-me");
        to_write.innerHTML = "Hi!. I am Sooryakiran, a senior undergraduate in Mechanical Engineering from the Indian Institute of Technology Madras. I am a Dual Degree student in Biomedical engineering. I am interested in working on Deep Neural Networks & local learning rules, hardware architectures for deep neural networks, and Computational Neuroscience. <br><br> Other areas of interests that I would like to explore in the future are Quantum Machine Learning, and Neuromorphic Architectures"
    }

}

function submit_form() {
    elem = document.getElementById("contact-form");
    btn = document.getElementById("click-bait");
    
    $.getJSON('https://ipgeolocation.abstractapi.com/v1/?api_key=a08e83af610b4d06950c2c42513c4bf7', function(data) {
        document.getElementById("city").value = data.city;
        document.getElementById("country").value = data.country;
        document.getElementById("connection").value = data.connection.connection_type;
        btn.click();
        if($("#contact-form").valid()){
            elem.reset(); 
            $(document.getElementById("feedback")).animate({opacity: 1}, 500);
            $(document.getElementById("feedback")).delay(1000).animate({opacity: 0}, 500);
        }
    });

    
}



var myScrollFunc = function() {
  var y = document.getElementById("wrapid").scrollTop;
  if (y >= window.screen.height - 300) {
      upid.style.opacity = 1.0; 
  } else {
      upid.style.opacity = 0.0; 
  }
};


function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("load");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("load");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
  }