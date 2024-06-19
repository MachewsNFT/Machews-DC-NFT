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
    }
});

document.getElementById('submitButton').addEventListener('click', function() {
    const discordHandle = document.getElementById('current-showcase-title').textContent;
    const showcaseLink = document.getElementById('showcaseLink').value;
    const totalPoints = document.getElementById('totalPoints').textContent;

    if (discordHandle && showcaseLink) {
        addToLeaderboard(discordHandle, showcaseLink, totalPoints);
    }
});

document.getElementById('clearButton').addEventListener('click', function() {
    const password = prompt("Enter the password to clear the leaderboard:");
    if (password === '6969') {
        clearLeaderboard();
    } else {
        alert("Incorrect password!");
    }
});

document.getElementById('printButton').addEventListener('click', function() {
    const discordHandle = document.getElementById('current-showcase-title').textContent;
    const totalPoints = document.getElementById('totalPoints').textContent;

    if (discordHandle && totalPoints) {
        printRaffleTicket(discordHandle, totalPoints);
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
    const leaderboardInfo = document.getElementById('leaderboard-info');
    let entries = Array.from(leaderboardInfo.children);

    // Create new entry
    const newEntry = document.createElement('div');
    newEntry.innerHTML = `<a href="${showcaseLink}" target="_blank">${discordHandle}</a>: ${totalPoints} points`;

    // Add new entry to leaderboard
    leaderboardInfo.appendChild(newEntry);

    // Sort leaderboard
    entries = entries.concat(newEntry);
    entries.sort((a, b) => {
        const pointsA = parseInt(a.textContent.split(': ')[1].split(' ')[0]);
        const pointsB = parseInt(b.textContent.split(': ')[1].split(' ')[0]);
        return pointsB - pointsA;
    });

    // Update leaderboard display
    leaderboardInfo.innerHTML = '';
    entries.slice(0, 10).forEach((entry, index) => {
        entry.innerHTML = `${index + 1}. ` + entry.innerHTML;
        leaderboardInfo.appendChild(entry);
    });
}

function clearLeaderboard() {
    const leaderboardInfo = document.getElementById('leaderboard-info');
    leaderboardInfo.innerHTML = '';
}

function printRaffleTicket(discordHandle, totalPoints) {
    const ticketWindow = window.open('', '_blank');
    ticketWindow.document.write(`
        <html>
        <head>
            <title>Raffle Ticket</title>
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    font-family: 'Open Sans', sans-serif;
                }
                .ticket {
                    border: 2px solid black;
                    padding: 20px;
                    text-align: center;
                    font-size: 1.2em;
                }
            </style>
        </head>
        <body>
            <div class="ticket">
                <p><strong>Discord Handle:</strong> ${discordHandle}</p>
                <p><strong>Total Points:</strong> ${totalPoints}</p>
            </div>
        </body>
        </html>
    `);
    ticketWindow.document.close();
    ticketWindow.print();
}

function loadLeaderboard() {
    // Simulated leaderboard data
    const leaderboard = [
        { discordHandle: 'Player 1', showcaseLink: '#', points: 1000 },
        { discordHandle: 'Player 2', showcaseLink: '#', points: 950 },
        { discordHandle: 'Player 3', showcaseLink: '#', points: 900 }
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
