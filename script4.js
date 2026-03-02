js
// script4.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Audio Elements ---
    const backgroundMusic = new Audio('audio/space_ambient.mp3'); // Path to your ambient sound
    // const clickSound = new Audio('audio/click_sfx.mp3'); // No longer needed if script5 handles all clicks

    // --- UI Elements for Sound Control ---
    const toggleMusicBtn = document.getElementById('toggle-music-btn');
    const volumeSlider = document.getElementById('volume-slider');
    // const planets = document.querySelectorAll('.planet'); // No longer needed here

    // --- Background Music Settings ---
    backgroundMusic.loop = true; // Loop the background music
    backgroundMusic.volume = 0.3; // Default volume (0.0 to 1.0)

    // --- Click Sound Settings ---
    // clickSound.volume = 0.7; // No longer needed

    // --- Function to Play Background Music (with user interaction requirement) ---
    function playBackgroundMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.play().then(() => {
                console.log("Background music started.");
                toggleMusicBtn.textContent = 'Pause Music';
            }).catch(error => {
                console.warn("Could not play background music automatically:", error);
                toggleMusicBtn.textContent = 'Play Music (click to start)';
            });
        }
    }

    // --- Event Listeners ---

    // 1. Toggle Background Music Button
    if (toggleMusicBtn) {
        toggleMusicBtn.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                playBackgroundMusic();
            } else {
                backgroundMusic.pause();
                toggleMusicBtn.textContent = 'Play Music';
                console.log("Background music paused.");
            }
        });
    }

    // 2. Volume Slider for Background Music
    if (volumeSlider) {
        volumeSlider.value = backgroundMusic.volume; // Initialize slider position
        volumeSlider.addEventListener('input', (event) => {
            backgroundMusic.volume = event.target.value;
            console.log("Music volume set to:", backgroundMusic.volume);
        });
    }

    // 3. Play Click Sound when a Planet is Clicked (REMOVED FROM HERE - script5.js will handle this)
    /*
    planets.forEach(planet => {
        planet.addEventListener('click', () => {
            clickSound.currentTime = 0;
            clickSound.play().catch(error => {
                console.warn("Could not play click sound:", error);
            });
        });
    });
    */

    // --- Initial setup ---
    document.body.addEventListener('click', playBackgroundMusic, { once: true });
    document.body.addEventListener('keypress', playBackgroundMusic, { once: true });
    
    toggleMusicBtn.textContent = backgroundMusic.paused ? 'Play Music' : 'Pause Music';

    console.log("script4.js loaded: Ambient audio functionality initialized.");
});

