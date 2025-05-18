let mode = 'manual';
let directions = ['north', 'east', 'south', 'west'];
let currentDirectionIndex = 0;
let currentPhase = 'green'; // 'green', 'yellow', 'red'
let interval;
let phaseDuration = 4000; // 4 seconds

function updateTrafficLights() {
    directions.forEach(dir => {
        const light = document.getElementById(dir);
        const red = light.querySelector('.red');
        const yellow = light.querySelector('.yellow');
        const green = light.querySelector('.green');

        red.classList.remove('active');
        yellow.classList.remove('active');
        green.classList.remove('active');

        // Set active light only for the current direction
        if (dir === directions[currentDirectionIndex]) {
            if (currentPhase === 'green') green.classList.add('active');
            else if (currentPhase === 'yellow') yellow.classList.add('active');
            else red.classList.add('active');
        } else {
            red.classList.add('active'); // Other directions stay red
        }
    });
}

function nextPhase() {
    if (currentPhase === 'green') {
        currentPhase = 'yellow';
    } else if (currentPhase === 'yellow') {
        currentPhase = 'red';
    } else if (currentPhase === 'red') {
        currentDirectionIndex = (currentDirectionIndex + 1) % directions.length;
        currentPhase = 'green';
    }
    updateTrafficLights();
}

function setMode(selectedMode) {
    mode = selectedMode;
    clearInterval(interval);

    document.getElementById('manualBtn').classList.remove('active');
    document.getElementById('autoBtn').classList.remove('active');

    if (mode === 'manual') {
        document.getElementById('manualBtn').classList.add('active');
    } else {
        document.getElementById('autoBtn').classList.add('active');
        interval = setInterval(() => {
            nextPhase();
        }, phaseDuration);
    }

    updateTrafficLights();
}

// Initialize on page load
updateTrafficLights();
