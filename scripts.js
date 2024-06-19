document.addEventListener('DOMContentLoaded', function () {
    const submissionForm = document.getElementById('submissionForm');
    const addButton = document.getElementById('addButton');
    const submitButton = document.getElementById('submitButton');
    const clearButton = document.getElementById('clearButton');

    let currentShowcase = {
        discordHandle: '',
        showcaseLink: '',
        comics: [],
        totalPoints: 0
    };

    let leaderboard = [];

    function calculatePoints(rarity, mintNumber) {
        // Implement your logic for calculating points
        return parseInt(mintNumber); // Example logic, replace with your own
    }

    function updateCurrentShowcase() {
        document.getElementById('current-showcase-title').textContent = currentShowcase.discordHandle || 'Current Showcase';
        document.getElementById('legoPoints').textContent = currentShowcase.comics.find(c => c.rarity === 'Lego')?.points || 0;
        document.getElementById('epicPoints').textContent = currentShowcase.comics.find(c => c.rarity === 'Epic')?.points || 0;
        document.getElementById('rarePoints').textContent = currentShowcase.comics.find(c => c.rarity === 'Rare')?.points || 0;
        document.getElementById('ucPoints').textContent = currentShowcase.comics.find(c => c.rarity === 'UC')?.points || 0;
        document.getElementById('corePoints').textContent = currentShowcase.comics.find(c => c.rarity === 'Core')?.points || 0;
        document.getElementById('totalPoints').textContent = currentShowcase.totalPoints;
    }

    function updateLeaderboard() {
        const leaderboardInfo = document.getElementById('leaderboard-info');
        leaderboardInfo.innerHTML = leaderboard.slice(0, 10).map((entry, index) => `
            <p>${index + 1}. <a href="${entry.showcaseLink}" target="_blank">${entry.discordHandle}</a>: ${entry.totalPoints} points</p>
        `).join('');
    }

    function addComicToShowcase() {
        const discordHandle = document.getElementById('discordHandle').value;
        const showcaseLink = document.getElementById('showcaseLink').value;
        const comicRarity = document.getElementById('comicRarity').value;
        const mintNumber = document.getElementById('mintNumber').value;

        if (discordHandle && showcaseLink && comicRarity && mintNumber) {
            const points = calculatePoints(comicRarity, mintNumber);

            currentShowcase.discordHandle = discordHandle;
            currentShowcase.showcaseLink = showcaseLink;

            const existingComic = currentShowcase.comics.find(c => c.rarity === comicRarity);
            if (existingComic) {
                existingComic.points = points;
            } else {
                currentShowcase.comics.push({ rarity: comicRarity, mintNumber, points });
            }

            currentShowcase.totalPoints = currentShowcase.comics.reduce((total, comic) => total + comic.points, 0);

            updateCurrentShowcase();
        }
    }

    function submitShowcase() {
        if (currentShowcase.comics.length === 5) {
            leaderboard.push({ ...currentShowcase });
            leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
            updateLeaderboard();

            // Generate raffle ticket
            alert(`Raffle Ticket\nDiscord: ${currentShowcase.discordHandle}\nTotal Points: ${currentShowcase.totalPoints}`);

            // Reset current showcase
            currentShowcase = {
                discordHandle: '',
                showcaseLink: '',
                comics: [],
                totalPoints: 0
            };
            updateCurrentShowcase();
        } else {
            alert('Please add all 5 comics to the showcase.');
        }
    }

    function clearLeaderboard() {
        const code = prompt('Enter the code to clear the leaderboard:');
        if (code === '6969') {
            leaderboard = [];
            updateLeaderboard();
        } else {
            alert('Incorrect code.');
        }
    }

    addButton.addEventListener('click', addComicToShowcase);
    submitButton.addEventListener('click', submitShowcase);
    clearButton.addEventListener('click', clearLeaderboard);

    // Countdown timer
    const endTime = new Date(Date.now() + 28 * 24 * 60 * 60 * 1000); // 28 days from now
    function updateCountdown() {
        const now = new Date();
        const remainingTime = endTime - now;

        if (remainingTime <= 0) {
            document.getElementById('countdown-timer').textContent = 'Contest has ended';
            clearInterval(countdownInterval);
        } else {
            const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            document.getElementById('countdown-timer').textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
});
