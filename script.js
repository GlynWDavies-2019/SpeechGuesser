const messageElement = document.getElementById('msg');

const randomNumber = getRandomNumber();

console.log(`Random Number: ${randomNumber}`);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game

recognition.start();

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function onSpeak(event) {
    const msg = event.results[0][0].transcript;
    writeMessage(msg);
    checkNumber(msg);
}

function writeMessage(msg) {
    messageElement.innerHTML = `
        <div>You said: </div>
        <span class="box">${msg}</span>
    `;
}

function checkNumber(msg) {
    const num = Number(msg);
    if(Number.isNaN(num)) {
        messageElement.innerHTML += `<div>That is not a valid number!</div>`;
        return;
    }
    if(num > 100 || num < 1) {
        messageElement.innerHTML += `<div>Number must be between 1 and 100!</div>`;
    }
    if(num === randomNumber) {
        document.body.innerHTML = `
        <h2>Correct<br><br>The number was ${num}</h2>
        <button class="play-again" id="play-again">Play Again</button>
        `;
    } else if(num > randomNumber) {
        messageElement.innerHTML += `
            <div>Go Lower!</div>
        `;
    } else {
        messageElement.innerHTML += `
        <div>Go Higher!</div>
    `; 
    }
}

// Listen for result event

recognition.addEventListener('result',onSpeak);

recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', (event) => {
    if(event.target.id === 'play-again') {
        window.location.reload();
    }
});