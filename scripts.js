document.addEventListener('DOMContentLoaded', function() {
    // Countdown Timer
    function updateCountdown() {
        const endDate = new Date('2024-07-16T12:00:00').getTime();
        const now = new Date().getTime();
        const distance = endDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown-timer').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown-timer').innerHTML = "Contest Ended";
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // Submission and Leaderboard Handling
    const form = document.getElementById('submissionForm');
    const leaderboard = [];

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const discordHandle = document.getElementById('discordHandle').value;
        const showcaseLink = document.getElementById('showcaseLink').value;
        const comicRarity = document.getElementById('comicRarity').value;
        const mintNumber = document.getElementById('mintNumber').value;

        addComicToShowcase(discordHandle, showcaseLink, comicRarity, mintNumber);
    });

    document.getElementById('addButton').addEventListener('click', function() {
        const discordHandle = document.getElementById('discordHandle').value;
        const showcaseLink = document.getElementById('showcaseLink').value;
        const comicRarity = document.getElementById('comicRarity').value;
        const mintNumber = document.getElementById('mintNumber').value;

        addComicToShowcase(discordHandle, showcaseLink, comicRarity, mintNumber);
    });

    function addComicToShowcase(discordHandle, showcaseLink, comicRarity, mintNumber) {
        const showcaseInfo = document.getElementById('showcase-info');
        const currentShowcaseTitle = document.getElementById('current-showcase-title');

        const points = calculatePoints(comicRarity, mintNumber);
        document.getElementById(`${comicRarity.toLowerCase()}Points`).textContent = points;

        updateTotalPoints();
        currentShowcaseTitle.textContent = discordHandle;
    }

    function calculatePoints(rarity, mintNumber) {
        let points = 0;
        switch (rarity) {
            case 'Lego':
                points = 5;
                break;
            case 'Epic':
                points = 4;
                break;
            case 'Rare':
                points = 3;
                break;
            case 'UC':
                points = 2;
                break;
            case 'Core':
                points = 1;
                break;
        }
        return points * parseInt(mintNumber, 10);
    }

    function updateTotalPoints() {
        const legoPoints = parseInt(document.getElementById('legoPoints').textContent, 10);
        const epicPoints = parseInt(document.getElementById('epicPoints').textContent, 10);
        const rarePoints = parseInt(document.getElementById('rarePoints').textContent, 10);
        const ucPoints = parseInt(document.getElementById('ucPoints').textContent, 10);
        const corePoints = parseInt(document.getElementById('corePoints').textContent, 10);

        const totalPoints = legoPoints + epicPoints + rarePoints + ucPoints + corePoints;
        document.getElementById('totalPoints').textContent = totalPoints;
    }

    document.getElementById('submitShowcase').addEventListener('click', function() {
        const discordHandle = document.getElementById('current-showcase-title').textContent;
        const showcaseLink = document.getElementById('showcaseLink').value;
        const totalPoints = document.getElementById('totalPoints').textContent;

        const newEntry = {
            discordHandle,
            showcaseLink,
            points: totalPoints
        };

        leaderboard.push(newEntry);
        leaderboard.sort((a, b) => b.points - a.points);
        if (leaderboard.length > 10) {
            leaderboard.pop();
        }

        updateLeaderboard();
    });

    function updateLeaderboard() {
        const leaderboardDiv = document.getElementById('leaderboard-info');
        leaderboardDiv.innerHTML = '';

        leaderboard.forEach((entry, index) => {
            const playerLink = document.createElement('a');
            playerLink.href = entry.showcaseLink;
            playerLink.textContent = entry.discordHandle;

            const p = document.createElement('p');
            p.innerHTML = `${index + 1}. `;
            p.appendChild(playerLink);
            p.innerHTML += `: ${entry.points} points`;

            leaderboardDiv.appendChild(p);
        });
    }
});
