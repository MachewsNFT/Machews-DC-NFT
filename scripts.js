document.addEventListener('DOMContentLoaded', function () {
    function calculatePoints(rarity, mintNumber) {
        let points = 0;
        switch (rarity) {
            case "Lego":
                points = 5;
                break;
            case "Epic":
                points = 4;
                break;
            case "Rare":
                points = 3;
                break;
            case "UC":
                points = 2;
                break;
            case "Core":
                points = 1;
                break;
        }
        return points + parseInt(mintNumber);
    }

    function updateShowcase(discordHandle, showcaseLink, rarity, mintNumber) {
        const showcaseTitle = document.getElementById('current-showcase-title');
        const showcaseInfo = document.getElementById('showcase-info');

        showcaseTitle.textContent = discordHandle;
        document.getElementById('showcaseLink').value = showcaseLink;

        const points = calculatePoints(rarity, mintNumber);
        document.getElementById(rarity.toLowerCase() + 'Points').textContent = points;

        let totalPoints = 0;
        document.querySelectorAll('#showcase-info span').forEach(span => {
            totalPoints += parseInt(span.textContent);
        });
        document.getElementById('totalPoints').textContent = totalPoints;
    }

    function addToLeaderboard(discordHandle, showcaseLink, totalPoints) {
        const leaderboardInfo = document.getElementById('leaderboard-info');
        const entry = document.createElement('div');
        entry.innerHTML = `<a href="${showcaseLink}" target="_blank">${discordHandle}</a>: ${totalPoints} points`;
        leaderboardInfo.appendChild(entry);
    }

    document.getElementById('addButton').addEventListener('click', function () {
        const discordHandle = document.getElementById('discordHandle').value;
        const showcaseLink = document.getElementById('showcaseLink').value;
        const comicRarity = document.getElementById('comicRarity').value;
        const mintNumber = document.getElementById('mintNumber').value;

        if (discordHandle && showcaseLink && comicRarity && mintNumber) {
            updateShowcase(discordHandle, showcaseLink, comicRarity, mintNumber);

            let totalPoints = 0;
            document.querySelectorAll('#showcase-info span').forEach(span => {
                totalPoints += parseInt(span.textContent);
            });
            addToLeaderboard(discordHandle, showcaseLink, totalPoints);
        }
    });

    // Countdown Timer
    function updateTimer() {
        const countdown = document.getElementById('countdown-timer');
        const endTime = new Date('2024-07-16T12:00:00').getTime();
        const now = new Date().getTime();
        const timeLeft = endTime - now;

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            countdown.textContent = "Contest has ended";
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
});
