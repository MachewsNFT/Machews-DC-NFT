document.getElementById('addButton').addEventListener('click', function () {
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

document.getElementById('submitShowcase').addEventListener('click', function () {
    const discordHandle = document.getElementById('current-showcase-title').textContent;
    const showcaseLink = document.getElementById('showcaseLink').value;
    const totalPoints = document.getElementById('totalPoints').textContent;

    if (discordHandle && showcaseLink) {
        addToLeaderboard(discordHandle, showcaseLink, totalPoints);
        showRaffleTicket(discordHandle, totalPoints);
    }
});

function calculatePoints(rarity, mintNumber) {
    // Implement your logic for calculating points
    return parseInt(mintNumber); // Example logic, replace with your own
}

function updateTotalPoints() {
    const legoPoints = parseInt(document.getElementById('legoPoints').textContent) || 0;
    const epicPoints = parseInt(document.getElementById('epicPoints').textContent) || 0;
    const rarePoints = parseInt(document.getElementById('rarePoints').textContent) || 0;
    const ucPoints = parseInt(document.getElementById('ucPoints').textContent) || 0;
    const corePoints = parseInt(document.getElementById('corePoints').textContent) || 0;

    const totalPoints = legoPoints + epicPoints + rarePoints + ucPoints + corePoints;
    document.getElementById('totalPoints').textContent = totalPoints;
}

function addToLeaderboard(discordHandle, showcaseLink, totalPoints) {
    const leaderboard = document.getElementById('leaderboard-info');
    const entry = document.createElement('p');
    entry.innerHTML = `<a href="${showcaseLink}" target="_blank">${discordHandle}</a>: ${totalPoints} points`;
    leaderboard.appendChild(entry);

    // Sort leaderboard
    const entries = Array.from(leaderboard.getElementsByTagName('p'));
    entries.sort((a, b) => {
        const pointsA = parseInt(a.textContent.split(': ')[1]);
        const pointsB = parseInt(b.textContent.split(': ')[1]);
        return pointsB - pointsA;
    });

    // Clear and re-add sorted entries
    leaderboard.innerHTML = '';
    entries.forEach((entry, index) => {
        if (index < 10) { // Only display top 10
            leaderboard.appendChild(entry);
        }
    });
}

function showRaffleTicket(discordHandle, totalPoints) {
    alert(`Raffle Ticket\n\nDiscord Handle: ${discordHandle}\nTotal Points: ${totalPoints}`);
}

// Clear leaderboard function
document.getElementById('clearLeaderboard').addEventListener('click', function () {
    const code = prompt('Enter the code to clear the leaderboard:');
    if (code === '6969') {
        document.getElementById('leaderboard-info').innerHTML = '';
    } else {
        alert('Incorrect code.');
    }
});

// Countdown timer function
function countdown() {
    const endDate = new Date('July 17, 2024 12:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = endDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('countdown-timer').textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (timeLeft < 0) {
        clearInterval(x);
        document.getElementById('countdown-timer').textContent = 'EXPIRED';
    }
}

const x = setInterval(countdown, 1000);
