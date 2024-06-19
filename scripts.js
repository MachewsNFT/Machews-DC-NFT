document.getElementById('submissionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {
        discordHandle: formData.get('discordHandle'),
        showcaseLink: formData.get('showcaseLink'),
        comics: [{
            rarity: formData.get('comicRarity'),
            mint: formData.get('mintNumber')
        }]
    };

    addSubmission(data);
});

document.getElementById('addButton').addEventListener('click', function() {
    const discordHandle = document.getElementById('discordHandle').value;
    const showcaseLink = document.getElementById('showcaseLink').value;
    const comicRarity = document.getElementById('comicRarity').value;
    const mintNumber = document.getElementById('mintNumber').value;

    if (discordHandle && showcaseLink && comicRarity && mintNumber) {
        const data = {
            discordHandle,
            showcaseLink,
            comics: [{
                rarity: comicRarity,
                mint: mintNumber
            }]
        };

        addSubmission(data);
    } else {
        alert('Please fill in all fields.');
    }
});

function addSubmission(data) {
    let submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    const points = calculatePoints(data.comics[0].rarity, data.comics[0].mint);
    data.points = points;

    submissions.push(data);
    submissions.sort((a, b) => b.points - a.points);
    submissions = submissions.slice(0, 5); // Keep top 5 submissions

    localStorage.setItem('submissions', JSON.stringify(submissions));
    updateCurrentShowcase(data);
    updateLeaderboard(submissions);
}

function calculatePoints(rarity, mintNumber) {
    // Implement your points calculation logic here
    // For example:
    const rarityPoints = {
        Lego: 100,
        Epic: 80,
        Rare: 60,
        UC: 40,
        Core: 20
    };
    return rarityPoints[rarity] + parseInt(mintNumber, 10);
}

function updateCurrentShowcase(data) {
    document.getElementById('current-showcase-title').textContent = data.discordHandle;
    document.getElementById('legoPoints').textContent = data.comics.find(comic => comic.rarity === 'Lego')?.mint || 0;
    document.getElementById('epicPoints').textContent = data.comics.find(comic => comic.rarity === 'Epic')?.mint || 0;
    document.getElementById('rarePoints').textContent = data.comics.find(comic => comic.rarity === 'Rare')?.mint || 0;
    document.getElementById('ucPoints').textContent = data.comics.find(comic => comic.rarity === 'UC')?.mint || 0;
    document.getElementById('corePoints').textContent = data.comics.find(comic => comic.rarity === 'Core')?.mint || 0;
    document.getElementById('totalPoints').textContent = data.points;
}

function updateLeaderboard(submissions) {
    const leaderboardDiv = document.getElementById('leaderboard-info');
    leaderboardDiv.innerHTML = '';
    submissions.forEach((entry, index) => {
        const link = document.createElement('a');
        link.href = entry.showcaseLink;
        link.textContent = entry.discordHandle;
        link.target = '_blank';

        const p = document.createElement('p');
        p.textContent = `${index + 1}. `;
        p.appendChild(link);
        p.append(`: ${entry.points} points`);

        leaderboardDiv.appendChild(p);
    });
}

function loadLeaderboard() {
    const submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    updateLeaderboard(submissions);
}

// Countdown timer
const countdownDate = new Date().getTime() + 28 * 24 * 60 * 60 * 1000; // 28 days from now
const countdownTimer = document.getElementById('countdown-timer');
const countdownInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownTimer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
        clearInterval(countdownInterval);
        countdownTimer.textContent = 'EXPIRED';
    }
}, 1000);

loadLeaderboard();
