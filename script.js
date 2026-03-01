let currentSeconds = Math.floor(Date.now() / 1000);
let isGlitchMode = false;

function toggleGlitch() {
    isGlitchMode = !isGlitchMode;
    const btn = document.getElementById('glitch-btn');
    btn.innerText = isGlitchMode ? "Restore 64-bit" : "Enable 32-bit Crash";
    document.body.classList.toggle('glitch-active', isGlitchMode);
}

function updateClock() {
    currentSeconds++;
    let displaySeconds = currentSeconds;

    // The Y2K38 "Flip" logic
    if (isGlitchMode && currentSeconds > 2147483647) {
        displaySeconds = ((currentSeconds + 2147483648) % 4294967296) - 2147483648;
    }

    document.getElementById('timestamp').innerText = displaySeconds;
    const date = new Date(displaySeconds * 1000);
    document.getElementById('date-display').innerText = date.toUTCString();

    const status = document.getElementById('status-msg');
    if (displaySeconds < 0) {
        status.innerText = "Y2K38 ERROR: TIME IS 1901";
        status.style.color = "#ff4d4d";
    } else {
        status.innerText = isGlitchMode ? "32-bit Mode Active" : "Status: 64-bit Stable";
        status.style.color = isGlitchMode ? "#ffff00" : "#00ffcc";
    }
}

function jumpTo2038() {
    currentSeconds = 2147483640; // 7 seconds before the overflow
}

setInterval(updateClock, 1000);


