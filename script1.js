// ---------- Y2K38 TIME SIMULATION ----------
let currentSeconds = Math.floor(Date.now() / 1000); // current UNIX timestamp in seconds
let isGlitchMode = false;

// ---------- TOGGLE 32-BIT GLITCH MODE ----------
function toggleGlitch() {
    isGlitchMode = !isGlitchMode;
    const btn = document.getElementById('glitch-btn');
    btn.innerText = isGlitchMode ? "Restore 64-bit" : "Enable 32-bit Crash";
    document.body.classList.toggle('glitch-active', isGlitchMode);
}

// ---------- UPDATE CLOCK & HANDLE OVERFLOW ----------
function updateClock() {
    currentSeconds++;

    let displaySeconds = currentSeconds;

    // Y2K38 "flip" logic: simulate 32-bit overflow
    if (isGlitchMode && currentSeconds > 2147483647) {
        // Wrap around like 32-bit signed integer
        displaySeconds = ((currentSeconds + 2147483648) % 4294967296) - 2147483648;
    }

    // Update timestamp and date display
    document.getElementById('timestamp').innerText = displaySeconds;

    const date = new Date(displaySeconds * 1000);
    document.getElementById('date-display').innerText = date.toUTCString();

    // Update status message
    const status = document.getElementById('status-msg');
    if (displaySeconds < 0) {
        status.innerText = "Y2K38 ERROR: TIME IS 1901";
        status.style.color = "#ff4d4d";
    } else {
        status.innerText = isGlitchMode ? "32-bit Mode Active" : "Status: 64-bit Stable";
        status.style.color = isGlitchMode ? "#ffff00" : "#00ffcc";
    }
}

// ---------- JUMP TO 2038 ----------
function jumpTo2038() {
    currentSeconds = 2147483640; // 7 seconds before the overflow
}

// ---------- START THE CLOCK ----------
setInterval(updateClock, 1000);
updateClock(); // immediate first call
