// let titles = ['WELCOME', 'FUTURE IS NEAR', 'WHAT ARE YOU WANT?'];
// let current_index = 1;

// setInterval(function() {

//     if (current_index <= 2) {
//         document.getElementById('title-paper').innerHTML = titles[current_index];
//         current_index ++;
//     } else {
//         current_index = 0;
//         document.getElementById('title-paper').innerHTML = titles[current_index];
//     }

// }, 5000);

const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    "outsourcing",
    "outstaffing"
];

const morphTime = 1;
const cooldownTime = 2;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

animate();

window.addEventListener('DOMContentLoaded', function() {
  let aboutBlock = document.getElementById('About');
  let servicesBlock = document.getElementById('Services');
  let animatedText = document.getElementById('animated-text');

  function checkScrollPosition() {
    let aboutBlockPosition = aboutBlock.getBoundingClientRect().top;
    let servicesBlockPosition = servicesBlock.getBoundingClientRect().top;
    let screenPosition = window.innerHeight / 2;

    if (aboutBlockPosition < screenPosition) {
      aboutBlock.classList.add('show');
      animatedText.classList.add('show');
    } else {
      aboutBlock.classList.remove('show');
      animatedText.classList.remove('show');
    }

    if (servicesBlockPosition < screenPosition) {
      servicesBlock.classList.add('show');
    } else {
      servicesBlock.classList.remove('show');
    }
  }

  window.addEventListener('scroll', checkScrollPosition);
});


window.addEventListener('scroll', function () {

    let posTop = window.pageYOffset;

    if (posTop == 0) {

        document.querySelector(".menu").style.backgroundColor = "transparent";
        let elems = document.getElementsByClassName("option")
        for (let i = 0; i < elems.length; i++) {
            elems[i].style.color = "white";

            elems[i].addEventListener("mouseenter", function() {
                elems[i].style.color = "#014db1";
            });

            elems[i].addEventListener("mouseleave", function() {
                elems[i].style.color = "white";
            });
        }

    } else {
        document.querySelector(".menu").style.backgroundColor = "white";
        let elems = document.getElementsByClassName("option")
        for (let i = 0; i < elems.length; i++) {
            elems[i].style.color = "black";

            elems[i].addEventListener("mouseenter", function() {
                elems[i].style.color = "#014db1";
            });

            elems[i].addEventListener("mouseleave", function() {
                elems[i].style.color = "black";
            });
        }

    }


});