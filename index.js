let isStarted = false;
const display = document.getElementById("click-box");
const clickDisplay = document.getElementById("click-display");
const timerDisplay = document.getElementById("time-display")
const cpsDisplay = document.getElementById("cps-display");
const recordDisplay = document.getElementById("record-list");

let startTime = 0;
let elapsedTime = 0;
let length = 3;

let timer;
let timeout;


document.getElementById("click-box").onclick = function() {
    if(!isStarted){
        console.log("Elindultam");
        isStarted = true;

        startTimer();

        updateClick();
    }
    else{
        updateClick();
    }
}


function startTimer(){
    startTime = Date.now() - elapsedTime;
    
    timer = setInterval(() => updateTimeAndCps(), 10);
    timeout = setTimeout(() => {reset(), addRecord(cpsDisplay.textContent)}, length * 1000); // Hossz     

    display.textContent = 0;
    clickDisplay.textContent = Number(0);
}

function updateTimeAndCps(){
    elapsedTime = Date.now() - startTime;

    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    let currentClicks = Number(clickDisplay.textContent);
    let currentCPS = currentClicks / elapsedTime * 1000;

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

   
    timerDisplay.textContent = `${seconds}:${milliseconds}`;
    cpsDisplay.textContent = currentCPS.toFixed(2);
}

function updateTimer(value){
    // Meddig tartson
    length = Number(value);

    // Fent kiirja
    let tmp = String(value).padStart(2, "0");
    timerDisplay.textContent = `${tmp}:00`;
}

function updateClick(){
    display.textContent++;
    clickDisplay.textContent = Number(clickDisplay.textContent) + 1;
}

function addRecord(cps){
    const record = document.createElement("p");
    record.textContent = `${cps} CPS in ${length} seconds.`;
    recordDisplay.appendChild(record);
}

function setTimer(value){
    if(!isStarted){
        updateTimer(Number(value));
        clickDisplay.textContent = Number(0);
        cpsDisplay.textContent = Number(0);
    }
}

function reset(){
    clearInterval(timer); 
    clearTimeout(timeout);

    isStarted = false;
    startTime = 0;
    elapsedTime = 0;

    display.textContent = "Click anywhere to start again!";
    window.alert("Vege");
}

