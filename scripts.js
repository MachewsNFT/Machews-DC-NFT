document.getElementById('addButton').addEventListener('click', function() {
    const discordHandle = document.getElementById('discordHandle').value;
    const showcaseLink = document.getElementById('showcaseLink').value;
    const comicRarity = document.getElementById('comicRarity').value;
    const mintNumber = document.getElementById('mintNumber').value;

    if (discordHandle && comicRarity && mintNumber) {
        let points = calculatePoints(comicRarity, mintNumber);
        updateCurrentShowcase(comicRarity, points);
        updateTotalPoints();
        document.getElementById('current-showcase-title').textContent = discordHandle;

        addToLeaderboard(discordHandle, showcaseLink, calculateTotalPoints());
    }
});

function calculatePoints(rarity, mintNumber) {
    // Implement your logic for calculating points
    return parseInt(mintNumber); // Example logic, replace with your own
}

function updateCurrentShowcase(rarity, points) {
    let currentPoints = document.getElementById(rarity.toLowerCase() + 'Points');
    currentPoints.textContent = points;
}

function updateTotalPoints() {
    let legoPoints = parseInt(document.getElementById('legoPoints').textContent);
    let epicPoints = parseInt(document.getElementById('epicPoints').textContent);
    let rarePoints = parseInt(document.getElementById('rarePoints').textContent);
    let ucPoints = parseInt(document.getElementById('ucPoints').textContent);
    let corePoints = parseInt(document.getElementById('corePoints').textContent);

    let totalPoints = legoPoints + epicPoints + rarePoints + ucPoints + corePoints;
    document.getElementById('totalPoints').textContent = totalPoints;
}

function addToLeaderboard(discordHandle, showcaseLink, totalPoints) {
    // Simulated leaderboard update
    let leaderboard = [];
    for (let i = 1; i <= 10; i++) {
        let player = {
            discordHandle: `Player ${i}`,
            showcaseLink: '#',
            points: Math.floor(Math.random() * 1000) // Random points for demonstration
        };
        leaderboard.push(player);
    }

    // Add the current submission to the leaderboard
    leaderboard.push({
        discordHandle: discordHandle,
        showcaseLink: showcaseLink,
        points: totalPoints
    });

    // Sort the leaderboard by points in descending order
    leaderboard.sort((a, b) => b.points - a.points);

    // Update the leaderboard display
    const leaderboardDiv = document.getElementById('leaderboard-info');
    leaderboardDiv.innerHTML = '';
    leaderboard.slice(0, 10).forEach((entry, index) => {
        const link = document.createElement('a');
        link.href = entry.showcaseLink;
        link.textContent = entry.discordHandle;

        const p = document.createElement('p');
        p.textContent = `${index + 1}. `;
        p.appendChild(link);
        p.append(`: ${entry.points} points`);

        leaderboardDiv.appendChild(p);
    });
}

// Countdown timer
const countdownTimer = document.getElementById('countdown-timer');
const targetDate = new Date().getTime() + (28 * 24 * 60 * 60 * 1000); // 28 days from now

const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        clearInterval(interval);
        countdownTimer.textContent = "Contest Ended";
    } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownTimer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}, 1000);
