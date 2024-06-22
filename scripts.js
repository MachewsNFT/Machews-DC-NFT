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

document.getElementById('submitButton').addEventListener('click', function() {
    const discordHandle = document.getElementById('current-showcase-title').textContent;
    const showcaseLink = document.getElementById('showcaseLink').value;
    const totalPoints = document.getElementById('totalPoints').textContent;

    if (discordHandle && showcaseLink) {
        addToLeaderboard(discordHandle, showcaseLink, totalPoints);
        displayRaffleTicket(discordHandle, totalPoints);
    }
});

document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('leaderboard-info').innerHTML = '';
});

function calculatePoints(rarity, mintNumber) {
    let points = parseInt(mintNumber); // Basic points based on mint number

    // Add bonus points for special mint numbers
    if (mintNumber === '1') {
        points += 50; // First Mint
    } else if (mintNumber === '1000') { // Example last mint number, replace with actual last mint number
        points += 30; // Last Mint
    } else if (mintNumber === rarity) {
        points += 20; // Edition Matching Mint
    }

    return points;
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
    const leaderboardInfo = document.getElementById('leaderboard-info');
    const newEntry = document.createElement('p');
    newEntry.textContent = `${discordHandle}: ${totalPoints} points`;
    leaderboardInfo.appendChild(newEntry);
}

function displayRaffleTicket(discordHandle, totalPoints) {
    const raffleTicketContainer = document.getElementById('raffle-ticket-container');
    const raffleTicket = `
        <div style="border: 2px solid gold; padding: 10px; margin-top: 10px; text-align: center;">
            <h2>Raffle Ticket</h2>
            <p>Discord Handle: ${discordHandle}</p>
            <p>Total Points: ${totalPoints}</p>
            <p>Good luck in the raffle!</p>
        </div>
    `;
    raffleTicketContainer.innerHTML = raffleTicket;
}

// Load the initial leaderboard
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

    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = '';
    leaderboard.forEach((entry, index) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = entry.showcaseLink;
        link.textContent = entry.discordHandle;

        listItem.appendChild(link);
        listItem.append(`: ${entry.points} points`);

        leaderboardList.appendChild(listItem);
    });
}

loadLeaderboard();
