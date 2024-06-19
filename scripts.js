document.addEventListener('DOMContentLoaded', function() {
    const countdownTimer = document.getElementById('countdown-timer');
    const addButton = document.getElementById('addButton');
    const submitButton = document.getElementById('submitButton');
    const clearButton = document.getElementById('clearButton');

    let totalPoints = 0;
    let leaderboard = [];

    function updateCountdown() {
        const endTime = new Date('2024-07-17T12:00:00Z').getTime();
        const now = new Date().getTime();
        const distance = endTime - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownTimer.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownTimer.innerHTML = 'Contest Ended';
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    addButton.addEventListener('click', function() {
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

    submitButton.addEventListener('click', function() {
        const discordHandle = document.getElementById('current-showcase-title').textContent;
        const showcaseLink = document.getElementById('showcaseLink').value;
        const totalPoints = document.getElementById('totalPoints').textContent;

        if (discordHandle && showcaseLink) {
            addToLeaderboard(discordHandle, showcaseLink, totalPoints);
        }
    });

    clearButton.addEventListener('click', function() {
        const password = prompt("Enter the password to clear the leaderboard:");
        if (password === '6969') {
            clearLeaderboard();
        } else {
            alert("Incorrect password!");
        }
    });

    function calculatePoints(rarity, mintNumber) {
        let points = parseInt(mintNumber);
        switch (rarity) {
            case 'Lego':
                points += 500;
                break;
            case 'Epic':
                points += 400;
                break;
            case 'Rare':
                points += 300;
                break;
            case 'UC':
                points += 200;
                break;
            case 'Core':
                points += 100;
                break;
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
        let entries = Array.from(leaderboardInfo.children);

        const newEntry = document.createElement('div');
        newEntry.innerHTML = `<a href="${showcaseLink}" target="_blank">${discordHandle}</a>: ${totalPoints} points`;

        leaderboardInfo.appendChild(newEntry);

        entries = entries.concat(newEntry);
        entries.sort((a, b) => {
            const pointsA = parseInt(a.textContent.split(': ')[1].split(' ')[0]);
            const pointsB = parseInt(b.textContent.split(': ')[1].split(' ')[0]);
            return pointsB - pointsA;
        });

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

    loadLeaderboard();
});
