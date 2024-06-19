document.getElementById('addButton').addEventListener('click', function() {
    const discordHandle = document.getElementById('discordHandle').value;
    const showcaseLink = document.getElementById('showcaseLink').value;
    const comicRarity = document.getElementById('comicRarity').value;
    const mintNumber = document.getElementById('mintNumber').value;

    if (discordHandle && showcaseLink && comicRarity && mintNumber) {
        let points = calculatePoints(comicRarity, mintNumber);
        let currentPoints = document.getElementById(comicRarity.toLowerCase() + 'Points');
        currentPoints.textContent = points;

        updateTotalPoints();

        document.getElementById('current-showcase-title').textContent = discordHandle;

        // Update showcase info with the current comic data
        let showcaseInfo = document.getElementById('showcase-info');
        showcaseInfo.innerHTML += `<p>${comicRarity}: ${points} points</p>`;
    }
});

document.getElementById('submitShowcase').addEventListener('click', function() {
    const discordHandle = document.getElementById('current-showcase-title').textContent;
    const showcaseLink = document.getElementById('showcaseLink').value;
    const totalPoints = document.getElementById('totalPoints').textContent;

    if (discordHandle && showcaseLink) {
        addToLeaderboard(discordHandle, showcaseLink, totalPoints);
    }
});

function calculatePoints(rarity, mintNumber) {
    // Implement your logic for calculating points
    return parseInt(mintNumber); // Example logic, replace with actual logic
}

function updateTotalPoints() {
    let total = 0;
    document.querySelectorAll('#showcase-info span').forEach(span => {
        total += parseInt(span.textContent);
    });
    document.getElementById('totalPoints').textContent = total;
}

function addToLeaderboard(discordHandle, showcaseLink, totalPoints) {
    // Implement your logic for adding to the leaderboard
    const leaderboardInfo = document.getElementById('leaderboard-info');
    const newEntry = document.createElement('div');
    newEntry.innerHTML = `<p>${discordHandle}: ${totalPoints} points</p>`;
    leaderboardInfo.appendChild(newEntry);
}

function loadLeaderboard() {
    // Simulated leaderboard data
    const leaderboard = [
        { discordHandle: 'Player 1', showcaseLink: '#', points: 1000 },
        { discordHandle: 'Player 2', showcaseLink: '#', points: 950 },
        { discordHandle: 'Player 3', showcaseLink: '#', points: 900 },
        { discordHandle: 'Player 4', showcaseLink: '#', points: 850 },
        { discordHandle: 'Player 5', showcaseLink: '#', points: 800 },
        { discordHandle: 'Player 6', showcaseLink: '#', points: 750 },
        { discordHandle: 'Player 7', showcaseLink: '#', points: 700 },
        { discordHandle: 'Player 8', showcaseLink: '#', points: 650 },
        { discordHandle: 'Player 9', showcaseLink: '#', points: 600 },
        { discordHandle: 'Player 10', showcaseLink: '#', points: 550 }
    ];

    const leaderboardDiv = document.getElementById('leaderboard-info');
    leaderboardDiv.innerHTML = '';
    leaderboard.forEach((entry, index) => {
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

loadLeaderboard();

function startCountdown(endDate) {
    const timer = document.getElementById('countdown-timer');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(interval);
            timer.textContent = 'Contest Ended';
        }
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
}

const endDate = new Date('2024-07-16T12:00:00').getTime();
startCountdown(endDate);
