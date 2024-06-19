document.getElementById('addButton').addEventListener('click', function() {
    const discordHandle = document.getElementById('discordHandle').value;
    const showcaseLink = document.getElementById('showcaseLink').value;
    const comicRarity = document.getElementById('comicRarity').value;
    const mintNumber = document.getElementById('mintNumber').value;

    if (discordHandle && comicRarity && mintNumber) {
        let points = calculatePoints(comicRarity, mintNumber);
        let currentPoints = document.getElementById(comicRarity.toLowerCase() + 'Points');
        currentPoints.textContent = points;

        updateTotalPoints();

        document.getElementById('current-showcase-title').textContent = discordHandle;
    }
});

function calculatePoints(rarity, mintNumber) {
    // Example points calculation logic
    let basePoints = {
        Lego: 100,
        Epic: 80,
        Rare: 60,
        UC: 40,
        Core: 20
    };
    return basePoints[rarity] / mintNumber; // Simplified calculation
}

function updateTotalPoints() {
    const legoPoints = parseFloat(document.getElementById('legoPoints').textContent) || 0;
    const epicPoints = parseFloat(document.getElementById('epicPoints').textContent) || 0;
    const rarePoints = parseFloat(document.getElementById('rarePoints').textContent) || 0;
    const ucPoints = parseFloat(document.getElementById('ucPoints').textContent) || 0;
    const corePoints = parseFloat(document.getElementById('corePoints').textContent) || 0;

    const totalPoints = legoPoints + epicPoints + rarePoints + ucPoints + corePoints;
    document.getElementById('totalPoints').textContent = totalPoints;
}

// Countdown timer
function startCountdown() {
    const countdownElement = document.getElementById('countdown-timer');
    const endDate = new Date(Date.now() + 27 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 41 * 1000);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.textContent = "EXPIRED";
        }
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

startCountdown();
