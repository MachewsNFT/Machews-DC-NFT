document.addEventListener('DOMContentLoaded', function() {
    const countdownTimer = document.getElementById('countdown-timer');
    const submissionForm = document.getElementById('submissionForm');
    const showcaseInfo = document.getElementById('showcase-info');
    const totalPointsElem = document.getElementById('totalPoints');
    const leaderboardInfo = document.getElementById('leaderboard-info');
    const addButton = document.getElementById('addButton');
    const submitButton = document.getElementById('submitButton');
    const clearButton = document.getElementById('clearButton'); // New clear button

    let totalPoints = 0;
    let leaderboard = [];

    function updateLeaderboard() {
        leaderboardInfo.innerHTML = leaderboard.map((entry, index) => `
            <p>${index + 1}. <a href="${entry.showcaseLink}" target="_blank">${entry.discordHandle}</a>: ${entry.points} points</p>
        `).join('');
    }

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

        if (!discordHandle || !showcaseLink || !comicRarity || !mintNumber) {
            alert('Please fill out all fields.');
            return;
        }

        let points = calculatePoints(comicRarity, mintNumber);
        totalPoints += points;

        let currentPoints = document.getElementById(comicRarity.toLowerCase() + 'Points');
        currentPoints.textContent = points;

        totalPointsElem.textContent = totalPoints;

        document.getElementById('current-showcase-title').textContent = discordHandle;
    });

    submitButton.addEventListener('click', function() {
        const discordHandle = document.getElementById('discordHandle').value;
        const showcaseLink = document.getElementById('showcaseLink').value;

        if (!discordHandle || !showcaseLink) {
            alert('Please fill out all fields.');
            return;
        }

        leaderboard.push({
            discordHandle,
            showcaseLink,
            points: totalPoints
        });

        leaderboard.sort((a, b) => b.points - a.points);
        leaderboard = leaderboard.slice(0, 10);

        updateLeaderboard();
    });

    clearButton.addEventListener('click', function() { // Clear button functionality
        const code = prompt('Enter the code to clear the leaderboard:');
        if (code === '6969') {
            leaderboard = [];
            updateLeaderboard();
            alert('Leaderboard has been cleared.');
        } else {
            alert('Incorrect code.');
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
});
