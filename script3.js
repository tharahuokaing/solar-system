js
// script3.js

document.addEventListener('DOMContentLoaded', () => {
    const solarSystemContainer = document.querySelector('.solar-system');
    let isDragging = false;
    let startX, startY;
    let currentRotateX = 0; // For vertical rotation (pitch)
    let currentRotateY = 0; // For horizontal rotation (yaw)
    let currentPanX = 0;
    let currentPanY = 0;

    // Adjust these sensitivity values as needed
    const rotationSensitivity = 0.2; // How much rotation per pixel of mouse movement
    const panSensitivity = 1;      // How much pan per pixel of mouse movement

    // Event listener for mouse down on the solar system container
    solarSystemContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        // Prevent default dragging behavior like text selection
        solarSystemContainer.style.cursor = 'grabbing';
        e.preventDefault();
    });

    // Event listener for mouse move
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        // Apply rotation based on mouse movement
        currentRotateY += deltaX * rotationSensitivity; // Yaw (left/right mouse movement)
        currentRotateX -= deltaY * rotationSensitivity; // Pitch (up/down mouse movement, inverted for natural feel)

        // Optionally, uncomment and modify to include panning with a different interaction
        // For now, only rotation is applied based on simple mouse drag.
        // currentPanX += deltaX * panSensitivity;
        // currentPanY += deltaY * panSensitivity;

        // Limit vertical rotation to prevent flipping
        currentRotateX = Math.max(-90, Math.min(90, currentRotateX));

        updateTransform();

        // Update start position for continuous dragging
        startX = e.clientX;
        startY = e.clientY;
    });

    // Event listener for mouse up (on the whole document to catch releases outside the container)
    document.addEventListener('mouseup', () => {
        isDragging = false;
        solarSystemContainer.style.cursor = 'grab';
    });

    // Reset view button handler
    document.addEventListener('click', (e) => {
        if (e.target.id === 'reset-view-btn') {
            currentRotateX = 0;
            currentRotateY = 0;
            currentPanX = 0;
            currentPanY = 0;
            updateTransform();
        }
    });

    // Apply the accumulated transformations to the solar system container
    function updateTransform() {
        solarSystemContainer.style.transform =
            `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) translateX(${currentPanX}px) translateY(${currentPanY}px)`;
    }

    // Initialize CSS properties needed for 3D transforms
    solarSystemContainer.style.transformOrigin = 'center center'; // Ensure rotation around center
    solarSystemContainer.style.transformStyle = 'preserve-3d'; // Essential for child elements to be 3D
});

