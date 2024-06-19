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

document.getElementById('submitShowcase').addEventListener('click', function() {
    const discordHandle = document.getElementById('current-showcase-title').textContent;
    const showcaseLink = document.getElementById('showcaseLink').value;
    const totalPoints = document.getElementById('totalPoints').textContent;

    if (discordHandle && showcaseLink) {
        addToLeaderboard(discordHandle, showcaseLink, totalPoints);
    }
});

document.getElementById('clearButton').addEventListener('click', function() {
    let code = prompt('Enter the code to clear the leaderboard:');
    if (code === '6969') {
        clearLeaderboard();
    } else {
        alert('Incorrect code');
    }
});

function calculatePoints(rarity, mintNumber) {
    // Implement your logic for calculating points
    return parseInt(mintNumber); // Example logic, replace with your own
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
    let leaderboard = document.getElementById('leaderboard-info');
    let newEntry = document.createElement('div');
    newEntry.innerHTML = `<a href="${showcaseLink}">${discordHandle}</a>: ${totalPoints} points`;
    leaderboard.appendChild(newEntry);
}

function clearLeaderboard() {
    document.getElementById('leaderboard-info').innerHTML = '';
}

function loadLeaderboard() {
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

document.getElementById('submissionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {
        discordHandle: formData.get('discordHandle'),
        showcaseLink: formData.get('showcaseLink'),
        comics: []
    };

    for (let i = 0; i < 5; i++) {
        data.comics.push({
            rarity: formData.get(`comics[${i}][rarity]`),
            mint: formData.get(`comics[${i}][mint]`)
        });
    }

    console.log('Form Data:', data);
    alert('Submission received');
    // Here you can update the leaderboard for demonstration purposes
});

function showRaffleTicket(discordHandle, totalPoints) {
    alert(`Raffle Ticket\nDiscord: ${discordHandle}\nPoints: ${totalPoints}`);
}

loadLeaderboard();

// Countdown timer
const endDate = new Date(Date.now() + 28 * 24 * 60 * 60 * 1000); // 28 days from now
function updateCountdown() {
    const now = new Date();
    const timeRemaining = endDate - now;

    if (timeRemaining <= 0) {
        document.getElementById('countdown-timer').textContent = 'Contest Ended';
        clearInterval(timerInterval);
    } else {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById('countdown-timer').textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}

const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();
