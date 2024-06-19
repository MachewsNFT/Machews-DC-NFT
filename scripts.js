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
    const legoPoints = parseInt(document.getElementById('legoPoints').textContent);
    const epicPoints = parseInt(document.getElementById('epicPoints').textContent);
    const rarePoints = parseInt(document.getElementById('rarePoints').textContent);
    const ucPoints = parseInt(document.getElementById('ucPoints').textContent);
    const corePoints = parseInt(document.getElementById('corePoints').textContent);

    const totalPoints = legoPoints + epicPoints + rarePoints + ucPoints + corePoints;
    document.getElementById('totalPoints').textContent = totalPoints;
}

function addToLeaderboard(discordHandle, showcaseLink, totalPoints) {
    const leaderboardInfo = document.getElementById('leaderboard-info');
    const newEntry = document.createElement('p');
    const link = document.createElement('a');
    link.href = showcaseLink;
    link.textContent = discordHandle;
    link.style.color = '#F9EB00'; // Adjust color to stand out

    newEntry.textContent = `${leaderboardInfo.childNodes.length + 1}. `;
    newEntry.appendChild(link);
    newEntry.append(`: ${totalPoints} points`);

    leaderboardInfo.appendChild(newEntry);
}

function startCountdown() {
    const countdownElement = document.getElementById('countdown-timer');
    const endTime = new Date();
    endTime.setDate(endTime.getDate() + 28); // Set end time to 28 days from now
    endTime.setHours(12, 0, 0); // Set to end at 12 PM

    function updateCountdown() {
        const now = new Date();
        const timeRemaining = endTime - now;

        if (timeRemaining <= 0) {
            countdownElement.textContent = "Contest ended";
            return;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    setInterval(updateCountdown, 1000);
}

startCountdown();
