document.getElementById('addComic').addEventListener('click', function() {
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

        // Update leaderboard
        addToLeaderboard(discordHandle, showcaseLink, document.getElementById('totalPoints').textContent);
    }
});

document.getElementById('submissionForm').addEventListener('submit', function(event) {
    event.preventDefault();
});

function calculatePoints(rarity, mintNumber) {
    // Implement your logic for calculating points
    return parseInt(mintNumber); // Example logic: points equal to mint number
}

function updateTotalPoints() {
    const rarities = ['lego', 'epic', 'rare', 'uc', 'core'];
    let totalPoints = 0;

    rarities.forEach(rarity => {
        totalPoints += parseInt(document.getElementById(rarity + 'Points').textContent);
    });

    document.getElementById('totalPoints').textContent = totalPoints;
}

function addToLeaderboard(discordHandle, showcaseLink, totalPoints) {
    const leaderboardDiv = document.getElementById('leaderboard-info');

    const entry = document.createElement('p');
    const link = document.createElement('a');
    link.href = showcaseLink;
    link.textContent = discordHandle;

    entry.appendChild(link);
    entry.append(`: ${totalPoints} points`);

    leaderboardDiv.appendChild(entry);
}

function loadLeaderboard() {
    // Example leaderboard data
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
