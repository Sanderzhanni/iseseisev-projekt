/*jshint esversion: 6*/

//Muutujate deklareerimine
let gate = true;
let help = 0;
let index = 0;

const lights = ["l1", "l2", "l3","l4","l5","l6","l7","l8","l9","l10","l11","l12","l13","l14","l15","l16"];
const C4 = new Audio("C4.mp3");
const Db4 = new Audio("Db4.mp3");
const D4 = new Audio("D4.mp3");
const Eb4 = new Audio("Eb4.mp3");
const E4 = new Audio("E4.mp3");
const F4 = new Audio("F4.mp3");
const Gb4 = new Audio("Gb4.mp3");
const G4 = new Audio("G4.mp3");
const Ab4 = new Audio("Ab4.mp3");
const A4 = new Audio("A4.mp3");
const Bb4 = new Audio("Bb4.mp3");
const B4 = new Audio("B4.mp3");
const C5 = new Audio("C5.mp3");
const Db5 = new Audio("Db5.mp3");
const D5 = new Audio("D5.mp3");
const Eb5 = new Audio("Eb5.mp3");
const E5 = new Audio("E5.mp3");


//The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page. <URL>
//Järgnev funktsioon lahendab selle probleemi
document.documentElement.addEventListener('mousedown', () => {
  if (Tone.context.state !== 'running') Tone.context.resume();
});

//Sliderite deklareerimine
let tempoSlider = document.getElementById("tempo");
var tempoValue = document.getElementById("tempoValue");
tempoValue.innerHTML = tempoSlider.value + " bpm"; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
tempoSlider.oninput = function() {
  tempoValue.innerHTML = this.value + " bpm";
};

let reverbSlider = document.getElementById("reverb");
var reverbValue = document.getElementById("reverbValue");
reverbValue.innerHTML = reverbSlider.value;
reverbSlider.oninput = function() {
  reverbValue.innerHTML = this.value;
};

let distorSlider = document.getElementById("distor");
var distorValue = document.getElementById("distorValue");
distorValue.innerHTML = distorSlider.value;
distorSlider.oninput = function() {
  distorValue.innerHTML = this.value;
};

let kickSlider = document.getElementById("volumeKick");
var kickValue = document.getElementById("kickValue");
kickValue.innerHTML = kickSlider.value + " dB";
kickSlider.oninput = function() {
  kickValue.innerHTML = this.value + " dB";
};

let snareSlider = document.getElementById("volumeSnare");
var snareValue = document.getElementById("snareValue");
snareValue.innerHTML = snareSlider.value + " dB";
snareSlider.oninput = function() {
  snareValue.innerHTML = this.value + " dB";
};

let hihatSlider = document.getElementById("volumeHihat");
var hihatValue = document.getElementById("hihatValue");
hihatValue.innerHTML = hihatSlider.value + " dB";
hihatSlider.oninput = function() {
  hihatValue.innerHTML = this.value + " dB";
};

let tomSlider = document.getElementById("volumeTom");
let tomValue = document.getElementById("tomValue");
tomValue.innerHTML = tomSlider.value + " dB";
tomSlider.oninput = function() {
  tomValue.innerHTML = this.value + " dB";
};

let celloSlider = document.getElementById("volumeCello");
let freeverb = new Tone.Freeverb().toMaster();
freeverb.dampening.value = 1;
let dist = new Tone.Distortion().toMaster();
dist.wet.value = 0;

//sequencer funktsioon
function sequencer(){

  //Tone.Playeri abil on võimalik enda soundid importida
  const kick = new Tone.Player("kick.wav").connect(dist).connect(freeverb).toMaster();
  const snare = new Tone.Player("snare-808.wav").connect(dist).connect(freeverb).toMaster();
  const hihat = new Tone.Player("hihat-digital.wav").connect(dist).connect(freeverb).toMaster();
  const tom = new Tone.Player("tom-808.wav").connect(dist).connect(freeverb).toMaster();

  const celloA2 = new Tone.Player("celloA2.mp3").connect(dist).connect(freeverb).toMaster();
  const celloB2 = new Tone.Player("celloB2.mp3").connect(dist).connect(freeverb).toMaster();
  const celloC3 = new Tone.Player("celloC3.mp3").connect(dist).connect(freeverb).toMaster();
  const celloD3 = new Tone.Player("celloD3.mp3").connect(dist).connect(freeverb).toMaster();
  const celloE3 = new Tone.Player("celloE3.mp3").connect(dist).connect(freeverb).toMaster();
  const celloF3 = new Tone.Player("celloF3.mp3").connect(dist).connect(freeverb).toMaster();
  const celloG3 = new Tone.Player("celloG3.mp3").connect(dist).connect(freeverb).toMaster();
  const celloA3 = new Tone.Player("celloA3.mp3").connect(dist).connect(freeverb).toMaster();
  const celloNotes = [celloA2,celloB2, celloC3, celloD3, celloE3, celloF3, celloG3, celloA3];
  let running;

  //Sequencery funktsioon, kus sisestatud funktsiooni korratakse lõpmatuseni, 16 nooti vältel
  Tone.Transport.scheduleRepeat(play,"16n");

  //funktsioon mida korratakse
  function play(){

    running = true;

    //Sliderite väärtuse omistamine objektidele
    if(!kick.mute){
      kick.volume.value = kickSlider.value;
    }
    if(!snare.mute){
      snare.volume.value = snareSlider.value;
    }
    if(!hihat.mute){
      hihat.volume.value = hihatSlider.value;
    }
    if(!tom.mute){
      tom.volume.value = tomSlider.value;
    }

    for(let i = 0; i < celloNotes.length; i++){
      celloNotes[i].volume.value = celloSlider.value;
    }

    Tone.Transport.bpm.value = tempoSlider.value;
    freeverb.dampening.value = reverbSlider.value;
    dist.wet.value = distorSlider.value / 100;

    //querySelectori abil valime kõik 16 childi(inputi) divi seest, omistame nendele Tone.Player objekti
    let step = index % 16;
    help = step;
    let kickInputs = document.querySelector(`.kick input:nth-child(${step + 1})`);
    let snareInputs = document.querySelector(`.snare input:nth-child(${step + 1})`);
    let hihatInputs = document.querySelector(`.hihat input:nth-child(${step + 1})`);
    let tomInputs = document.querySelector(`.tom input:nth-child(${step + 1})`);
    let celloA2Inputs = document.querySelector(`.cA2 input:nth-child(${step + 1})`);
    let celloB2Inputs = document.querySelector(`.cB2 input:nth-child(${step + 1})`);
    let celloC3Inputs = document.querySelector(`.cC3 input:nth-child(${step + 1})`);
    let celloD3Inputs = document.querySelector(`.cD3 input:nth-child(${step + 1})`);
    let celloE3Inputs = document.querySelector(`.cE3 input:nth-child(${step + 1})`);
    let celloF3Inputs = document.querySelector(`.cF3 input:nth-child(${step + 1})`);
    let celloG3Inputs = document.querySelector(`.cG3 input:nth-child(${step + 1})`);
    let celloA3Inputs = document.querySelector(`.cA3 input:nth-child(${step + 1})`);

    //taktilugeja, näitab mitmendat childi hetkel käsitletakse
    document.getElementById(lights[step]).checked=true;
    setTimeout(function() {
        document.getElementById(lights[step]).checked=false;
    }, 130);


    //Kui on checkbox checked, siis mängitakse heli

    //Trummi soundid
    if(kickInputs.checked){
      kick.start();
    }
    if(snareInputs.checked){
      snare.start();
    }
    if(hihatInputs.checked){
      hihat.start();
    }
    if(tomInputs.checked){
      tom.start();
    }

    //Cello soundid
    if(celloA2Inputs.checked){
      celloA2.start();
    }
    if(celloB2Inputs.checked){
      celloB2.start();
    }
    if(celloC3Inputs.checked){
      celloC3.start();
    }
    if(celloD3Inputs.checked){
      celloD3.start();
    }
    if(celloE3Inputs.checked){
      celloE3.start();
    }
    if(celloF3Inputs.checked){
      celloF3.start();
    }
    if(celloG3Inputs.checked){
      celloG3.start();
    }
    if(celloA3Inputs.checked){
      celloA3.start();
    }

    index++;
  }

  //Kontrollib kas trummide peamute on aktiive, kui jah siis disable child mutes
  setInterval(function() {
    if(kick.mute || snare.mute || hihat.mute || tom.mute){
      if(gate){
        document.getElementById("muteDrums").disabled = true;
      }
    }else{
      document.getElementById("muteDrums").disabled = false;
    }
  }, 100);

  //Event listenerid

  //Peamute
  document.getElementById('muteDrums').addEventListener('click', function(){
    if(kick.mute){
      gate=true;
      document.getElementById("muteKick").disabled = false;
      document.getElementById("muteSnare").disabled = false;
      document.getElementById("muteHihat").disabled = false;
      document.getElementById("muteTom").disabled = false;
      kick.mute = false;
      snare.mute = false;
      hihat.mute = false;
      tom.mute = false;
    }else{
      gate = false;
      document.getElementById("muteKick").disabled = true;
      document.getElementById("muteSnare").disabled = true;
      document.getElementById("muteHihat").disabled = true;
      document.getElementById("muteTom").disabled = true;
      kick.mute = true;
      snare.mute = true;
      hihat.mute = true;
      tom.mute = true;
    }
  });

  //Kick mute
  document.getElementById('muteKick').addEventListener('click', function(){
    if(kick.mute){
      kick.mute = false;
    }else{
      kick.mute = true;
    }
  });

  //Snare mute
  document.getElementById('muteSnare').addEventListener('click', function(){
    if(snare.mute){
      snare.mute = false;
    }else{
      snare.mute = true;
    }
  });

  //Hihat mute
  document.getElementById('muteHihat').addEventListener('click', function(){
    if(hihat.mute){
      hihat.mute = false;
    }else{
      hihat.mute = true;
    }
  });

  //Tom mute
  document.getElementById('muteTom').addEventListener('click', function(){
    if(tom.mute){
      tom.mute = false;
    }else{
      tom.mute = true;
    }
  });
}

//puhastab cello kastid
document.getElementById('clearCello').addEventListener('click', function(){
  clearChildren(document.getElementById("celloA2"));
  clearChildren(document.getElementById("celloB2"));
  clearChildren(document.getElementById("celloC3"));
  clearChildren(document.getElementById("celloD3"));
  clearChildren(document.getElementById("celloE3"));
  clearChildren(document.getElementById("celloF3"));
  clearChildren(document.getElementById("celloG3"));
  clearChildren(document.getElementById("celloA3"));
});

//Alustab sequencery
document.getElementById('start').addEventListener('click', function(){
    Tone.Transport.start();
    running = true;
    document.getElementById(lights[help]).checked=false;
});

//Paneb Sequencery pausile
document.getElementById('pause').addEventListener('click', function(){
    Tone.Transport.pause();
    running = false;
    setTimeout(function() {
        document.getElementById(lights[help]).checked=true;
    }, 200);
});

//Restardib sequencery
document.getElementById('reset').addEventListener('click', function(){
    index = 0;
    document.getElementById(lights[help]).checked=false;
    document.getElementById(lights[0]).checked=true;
});

//Peatab sequencery
document.getElementById('stop').addEventListener('click', function(){
    index = 0;
    document.getElementById(lights[0]).checked=true;
    document.getElementById(lights[0]).checked=false;
    document.getElementById(lights[help]).checked=false;
    Tone.Transport.stop();
});

//Puhastab trummide kastid
function clearDrums() {
    clearChildren(document.getElementById("kick"));
    clearChildren(document.getElementById("snare"));
    clearChildren(document.getElementById("hihat"));
    clearChildren(document.getElementById("tom"));
}

//Trummide stiil 1
function style1() {
  clearDrums();
  document.getElementById("k1").checked=true;
  document.getElementById("k9").checked=true;
  document.getElementById("k11").checked=true;

  document.getElementById("s5").checked=true;
  document.getElementById("s13").checked=true;

  document.getElementById("h1").checked=true;
  document.getElementById("h3").checked=true;
  document.getElementById("h5").checked=true;
  document.getElementById("h7").checked=true;
  document.getElementById("h9").checked=true;
  document.getElementById("h11").checked=true;
  document.getElementById("h13").checked=true;
  document.getElementById("h15").checked=true;

  document.getElementById("t1").checked=true;
  document.getElementById("t7").checked=true;
}

//Trummide stiil 2
function style2() {
  clearDrums();
  document.getElementById("k1").checked=true;
  document.getElementById("k9").checked=true;

  document.getElementById("s5").checked=true;

  document.getElementById("h1").checked=true;
  document.getElementById("h5").checked=true;
  document.getElementById("h8").checked=true;
  document.getElementById("h9").checked=true;
  document.getElementById("h13").checked=true;
}

//Trummide stiil 3
function style3() {
  clearDrums();
  document.getElementById("k12").checked=true;
  document.getElementById("k14").checked=true;
  document.getElementById("k16").checked=true;

  document.getElementById("s3").checked=true;
  document.getElementById("s6").checked=true;
  document.getElementById("s9").checked=true;
  document.getElementById("s12").checked=true;
  document.getElementById("s15").checked=true;

  document.getElementById("h1").checked=true;
  document.getElementById("h7").checked=true;
  document.getElementById("h13").checked=true;

  document.getElementById("t1").checked=true;
  document.getElementById("t4").checked=true;
  document.getElementById("t7").checked=true;
  document.getElementById("t10").checked=true;
  document.getElementById("t13").checked=true;
  document.getElementById("t15").checked=true;
}

//Klaver

//Nodeide abil klaveri mängimine
const playSound = audio => {
  const clone = audio.cloneNode();
  clone.play();
  setTimeout(() => (clone.volume = 0.8), 400);
  setTimeout(() => (clone.volume = 0.6), 800);
  setTimeout(() => (clone.volume = 0.4), 1200);
  setTimeout(() => (clone.volume = 0.2), 1600);
  setTimeout(() => (clone.volume = 0), 2000);
};

//Noodid

// C4
const C4Key = document.querySelector(".C4-key");
const playC4 = () => {
  playSound(C4);
  C4Key.classList.add("active");
  setTimeout(() => C4Key.classList.remove("active"), 200);
};
C4Key.addEventListener("click", playC4);

// Db4
const Db4Key = document.querySelector(".Db4-key");
const playDb4 = () => {
  playSound(Db4);
  Db4Key.classList.add("active");
  setTimeout(() => Db4Key.classList.remove("active"), 200);
};
Db4Key.addEventListener("click", playDb4);

// D4
const D4Key = document.querySelector(".D4-key");
const playD4 = () => {
  playSound(D4);
  D4Key.classList.add("active");
  setTimeout(() => D4Key.classList.remove("active"), 200);
};
D4Key.addEventListener("click", playD4);

// Eb4
const Eb4Key = document.querySelector(".Eb4-key");
const playEb4 = () => {
  playSound(Eb4);
  Eb4Key.classList.add("active");
  setTimeout(() => Eb4Key.classList.remove("active"), 200);
};
Eb4Key.addEventListener("click", playEb4);

// E4
const E4Key = document.querySelector(".E4-key");
const playE4 = () => {
  playSound(E4);
  E4Key.classList.add("active");
  setTimeout(() => E4Key.classList.remove("active"), 200);
};
E4Key.addEventListener("click", playE4);

// F4
const F4Key = document.querySelector(".F4-key");
const playF4 = () => {
  playSound(F4);
  F4Key.classList.add("active");
  setTimeout(() => F4Key.classList.remove("active"), 200);
};
F4Key.addEventListener("click", playF4);

// Gb4
const Gb4Key = document.querySelector(".Gb4-key");
const playGb4 = () => {
  playSound(Gb4);
  Gb4Key.classList.add("active");
  setTimeout(() => Gb4Key.classList.remove("active"), 200);
};
Gb4Key.addEventListener("click", playGb4);

// G4
const G4Key = document.querySelector(".G4-key");
const playG4 = () => {
  playSound(G4);
  G4Key.classList.add("active");
  setTimeout(() => G4Key.classList.remove("active"), 200);
};
G4Key.addEventListener("click", playG4);

// Ab4
const Ab4Key = document.querySelector(".Ab4-key");
const playAb4 = () => {
  playSound(Ab4);
  Ab4Key.classList.add("active");
  setTimeout(() => Ab4Key.classList.remove("active"), 200);
};
Ab4Key.addEventListener("click", playAb4);

// A4
const A4Key = document.querySelector(".A4-key");
const playA4 = () => {
  playSound(A4);
  A4Key.classList.add("active");
  setTimeout(() => A4Key.classList.remove("active"), 200);
};
A4Key.addEventListener("click", playA4);

// Bb4
const Bb4Key = document.querySelector(".Bb4-key");
const playBb4 = () => {
  playSound(Bb4);
  Bb4Key.classList.add("active");
  setTimeout(() => Bb4Key.classList.remove("active"), 200);
};
Bb4Key.addEventListener("click", playBb4);

// B4
const B4Key = document.querySelector(".B4-key");
const playB4 = () => {
  playSound(B4);
  B4Key.classList.add("active");
  setTimeout(() => B4Key.classList.remove("active"), 200);
};
B4Key.addEventListener("click", playB4);

// C5
const C5Key = document.querySelector(".C5-key");
const playC5 = () => {
  playSound(C5);
  C5Key.classList.add("active");
  setTimeout(() => C5Key.classList.remove("active"), 200);
};
C5Key.addEventListener("click", playC5);

// Db5
const Db5Key = document.querySelector(".Db5-key");
const playDb5 = () => {
  playSound(Db5);
  Db5Key.classList.add("active");
  setTimeout(() => Db5Key.classList.remove("active"), 200);
};
Db5Key.addEventListener("click", playDb5);

// D5
const D5Key = document.querySelector(".D5-key");
const playD5 = () => {
  playSound(D5);
  D5Key.classList.add("active");
  setTimeout(() => D5Key.classList.remove("active"), 200);
};
D5Key.addEventListener("click", playD5);

// Eb5
const Eb5Key = document.querySelector(".Eb5-key");
const playEb5 = () => {
  playSound(Eb5);
  Eb5Key.classList.add("active");
  setTimeout(() => Eb5Key.classList.remove("active"), 200);
};
Eb5Key.addEventListener("click", playEb5);

// E5
const E5Key = document.querySelector(".E5-key");
const playE5 = () => {
  playSound(E5);
  E5Key.classList.add("active");
  setTimeout(() => E5Key.classList.remove("active"), 200);
};
E5Key.addEventListener("click", playE5);

//Klaviatuuriga mängimie Eventlistener
window.addEventListener("keydown", ({ keyCode }) => {
  // Press Q
  if (keyCode === 81) return playC4();

  // Press 2
  if (keyCode === 50) return playDb4();

  // Press W
  if (keyCode === 87) return playD4();

  // Press 3
  if (keyCode === 51) return playEb4();

  // Press E
  if (keyCode === 69) return playE4();

  // Press R
  if (keyCode === 82) return playF4();

  // Press 5
  if (keyCode === 53) return playGb4();

  // Press T
  if (keyCode === 84) return playG4();

  // Press 6
  if (keyCode === 54) return playAb4();

  // Press Y
  if (keyCode === 89) return playA4();

  // Press 7
  if (keyCode === 55) return playBb4();

  // Press U
  if (keyCode === 85) return playB4();

  // Press I
  if (keyCode === 73) return playC5();

  // Press 9
  if (keyCode === 57) return playDb5();

  // Press O
  if (keyCode === 79) return playD5();

  // Press 0
  if (keyCode === 48) return playEb5();

  // Press P
  if (keyCode === 80) return playE5();
});

//Dropdown menüü funktsioonid

//Vahetab klassi
function showStyles() {
  document.getElementById("myDropdown").classList.toggle("show");
}

//Sulgeb akna, kui väljaspool menüüd vajutada
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};
//clearChildren funktsioon
//Saadud aadressilt:
//https://gist.github.com/randell/2436981
function clearChildren(element) {
   for (var i = 0; i < element.childNodes.length; i++) {
      var e = element.childNodes[i];
      if (e.tagName) switch (e.tagName.toLowerCase()) {
         case 'input':
            switch (e.type) {
               case "radio":
               case "checkbox": e.checked = false; break;
               case "button":
               case "submit":
               case "image": break;
               default: e.value = ''; break;
            }
            break;
         case 'select': e.selectedIndex = 0; break;
         case 'textarea': e.innerHTML = ''; break;
         default: clearChildren(e);
      }
   }
}

//Vahetab klasse, kui mute nuppude peale vajutada.
function toggleClass(){
  var element = document.getElementById("muteKick");
  element.classList.toggle("mystyle");
}
function toggleClass2(){
  var element = document.getElementById("muteSnare");
  element.classList.toggle("mystyle");
}
function toggleClass3(){
  var element = document.getElementById("muteHihat");
  element.classList.toggle("mystyle");
}
function toggleClass4(){
  var element = document.getElementById("muteTom");
  element.classList.toggle("mystyle");
}
function toggleClass5(){
  var element = document.getElementById("muteDrums");
  element.classList.toggle("mystyle");
}

//Alustab sequencery
sequencer();

console.clear();
