// script2.js

document.addEventListener('DOMContentLoaded', () => {
    const planets = document.querySelectorAll('.planet');
    const infoPanel = document.getElementById('planet-info-panel');
    const infoPanelName = document.getElementById('info-planet-name');
    const infoPanelData = document.getElementById('info-planet-data');
    const closeInfoPanelBtn = document.getElementById('close-info-panel');
    const solarSystemContainer = document.querySelector('.solar-system');

    // Define data for each planet
    const planetData = {
        mercury: {
            name: 'Mercury',
            moons: 0,
            diameter: '4,879 km',
            distance: '57.9 million km (0.39 AU)',
            composition: 'Rocky, metallic core',
            description: 'The smallest planet in our solar system and closest to the Sun.',
            color: '#A0A0A0', // Example color for visual feedback
            scale: 1.5 // Example zoom scale
        },
        venus: {
            name: 'Venus',
            moons: 0,
            diameter: '12,104 km',
            distance: '108.2 million km (0.72 AU)',
            composition: 'Rocky, iron core, dense atmosphere',
            description: 'A terrestrial planet often called Earth\'s "sister planet" due to its similar size.',
            color: '#E0C060',
            scale: 1.4
        },
        earth: {
            name: 'Earth',
            moons: 1,
            diameter: '12,742 km',
            distance: '149.6 million km (1 AU)',
            composition: 'Rocky, iron core, water, nitrogen-oxygen atmosphere',
            description: 'Our home planet, the only known celestial body to support life.',
            color: '#6080E0',
            scale: 1.3
        },
        mars: {
            name: 'Mars',
            moons: 2,
            diameter: '6,779 km',
            distance: '227.9 million km (1.52 AU)',
            composition: 'Rocky, iron core, thin atmosphere',
            description: 'The "Red Planet", known for its distinctive reddish appearance.',
            color: '#C04020',
            scale: 1.6
        },
        jupiter: {
            name: 'Jupiter',
            moons: 79, // Known moons, many more smaller ones
            diameter: '139,820 km',
            distance: '778.5 million km (5.2 AU)',
            composition: 'Hydrogen, Helium (Gas Giant)',
            description: 'The largest planet in our solar system, a gas giant with a Great Red Spot.',
            color: '#D0A070',
            scale: 1.1
        },
        saturn: {
            name: 'Saturn',
            moons: 82, // Known moons
            diameter: '116,460 km',
            distance: '1.4 billion km (9.5 AU)',
            composition: 'Hydrogen, Helium (Gas Giant)',
            description: 'Famous for its prominent ring system, the second largest planet.',
            color: '#E0D0B0',
            scale: 1.05
        },
        uranus: {
            name: 'Uranus',
            moons: 27,
            diameter: '50,724 km',
            distance: '2.9 billion km (19.8 AU)',
            composition: 'Water, methane, ammonia ices (Ice Giant)',
            description: 'An ice giant that rotates on its side.',
            color: '#A0E0E0',
            scale: 1.2
        },
        neptune: {
            name: 'Neptune',
            moons: 14,
            diameter: '49,244 km',
            distance: '4.5 billion km (30.1 AU)',
            composition: 'Water, methane, ammonia ices (Ice Giant)',
            description: 'The farthest known planet from the Sun and an ice giant.',
            color: '#4060C0',
            scale: 1.25
        },
        pluto: { // Yes, it's a dwarf planet, but included in your HTML
            name: 'Pluto',
            moons: 5,
            diameter: '2,376 km',
            distance: '5.9 billion km (39.5 AU)',
            composition: 'Rock and ice',
            description: 'A dwarf planet in the Kuiper Belt, once considered the ninth planet.',
            color: '#B08090',
            scale: 1.8
        }
    };

    let activePlanet = null; // To keep track of the currently zoomed/selected planet

    function showPlanetInfo(planetId) {
        const data = planetData[planetId];
        if (data) {
            infoPanelName.textContent = data.name;
            infoPanelData.innerHTML = `
                <p><strong>Moons:</strong> ${data.moons}</p>
                <p><strong>Diameter:</strong> ${data.diameter}</p>
                <p><strong>Distance from Sun:</strong> ${data.distance}</p>
                <p><strong>Composition:</strong> ${data.composition}</p>
                <p><strong>Description:</strong> ${data.description}</p>
            `;
            infoPanel.classList.add('active'); // Show the info panel
            solarSystemContainer.classList.add('info-panel-active'); // Adjust layout if needed
        }
    }

    function hidePlanetInfo() {
        infoPanel.classList.remove('active');
        solarSystemContainer.classList.remove('info-panel-active');
    }

    function zoomInPlanet(planetElement, planetId) {
        // Remove 'zoomed' class from previously active planet
        if (activePlanet && activePlanet !== planetElement) {
            activePlanet.classList.remove('zoomed');
            // Reset any specific styles if applied directly, though CSS will handle most
            activePlanet.style.transform = '';
            activePlanet.style.zIndex = '';
        }

        planetElement.classList.toggle('zoomed'); // Toggle zoom class
        
        if (planetElement.classList.contains('zoomed')) {
            activePlanet = planetElement;
            // Apply scale and z-index for visual zoom effect
            const scale = planetData[planetId].scale || 2; // Default scale if not defined
            planetElement.style.transform = `scale(${scale})`;
            planetElement.style.zIndex = '100'; // Bring to front
            // Further styling can be in CSS with .zoomed class
        } else {
            activePlanet = null;
            planetElement.style.transform = ''; // Reset transform
            planetElement.style.zIndex = ''; // Reset z-index
        }
    }

    planets.forEach(planet => {
        // Extract planet ID (e.g., 'mercury', 'venus') from its class list
        const planetId = Array.from(planet.classList).find(cls => planetData[cls]);
        
        if (planetId) { // Ensure a valid planetId is found
            // Click event for detailed view and info panel
            planet.addEventListener('click', () => {
                showPlanetInfo(planetId);
                zoomInPlanet(planet, planetId);
            });

            // Optional: Hover event for quick info (e.g., just name and moon count in a tooltip)
            // This is separate from the CSS-only tooltip we discussed earlier
            planet.addEventListener('mouseover', () => {
                // You could display a very brief info here, or rely on the CSS tooltip
                // For now, let's keep the click for detailed info to avoid clutter.
            });
        }
    });

    closeInfoPanelBtn.addEventListener('click', () => {
        hidePlanetInfo();
        // If a planet was zoomed, unzoom it when closing the panel
        if (activePlanet) {
            activePlanet.classList.remove('zoomed');
            activePlanet.style.transform = '';
            activePlanet.style.zIndex = '';
            activePlanet = null;
        }
    });

    // Close info panel and unzoom if clicking outside the panel or a planet
    document.addEventListener('click', (event) => {
        if (!infoPanel.contains(event.target) && !event.target.closest('.planet') && infoPanel.classList.contains('active')) {
            hidePlanetInfo();
            if (activePlanet) {
                activePlanet.classList.remove('zoomed');
                activePlanet.style.transform = '';
                activePlanet.style.zIndex = '';
                activePlanet = null;
            }
        }
    });
});
