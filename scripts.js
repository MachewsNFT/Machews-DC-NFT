document.addEventListener('DOMContentLoaded', function() {
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

    const totalSupplyMap = {
        'Legendary': 750,
        'Epic': 1800,
        'Rare': 2700,
        'Uncommon': 4800,
        'Core': 4950
    };

    const editionMap = {
        'Legendary': 2,
        'Epic': 1,
        'Rare': 3,
        'Uncommon': 2,
        'Core': 1
    };

    function calculatePoints(mintNumber, totalSupply, editionNumber, isLastMint) {
        let basePoints;

        if (mintNumber === 1) {
            basePoints = totalSupply;
        } else if (mintNumber === editionNumber) {
            basePoints = totalSupply * 2;
        } else if (isLastMint) {
            basePoints = totalSupply / 2;
        } else {
            basePoints = totalSupply - mintNumber + 1;
        }

        return Math.round(basePoints);
    }

    function updateCurrentShowcase() {
        document.getElementById('current-showcase-title').textContent = currentShowcase.discordHandle || 'Current Showcase';
        document.getElementById('legoPoints').textContent = currentShowcase.comics.find(c => c.rarity === 'Legendary')?.points || 0;
        document.getElementById('epicPoints').textContent = currentShowcase.comics.find(c => c.rarity === 'Epic')?.points || 0;
        document.getElementById('rarePoints').textContent = currentShowcase.comics.find(c => c.rarity === 'Rare')?.points || 0;
        document.getElementById('ucPoints').textContent = currentShowcase.comics.find(c => c.rarity === 'Uncommon')?.points || 0;
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
        const mintNumber = parseInt(document.getElementById('mintNumber').value);

        if (discordHandle && showcaseLink && comicRarity && mintNumber) {
            const totalSupply = totalSupplyMap[comicRarity];
            const editionNumber = editionMap[comicRarity];
            const isLastMint = (mintNumber === totalSupply);

            let points = calculatePoints(mintNumber, totalSupply, editionNumber, isLastMint);
            if (mintNumber === 1 && mintNumber === editionNumber) {
                points += 1000; // Bonus points for mint #1 matching the edition number
            }
            if (mintNumber === 1998) {
                points += 5000; // Secret bonus points for mint number 1998
            }

            currentShowcase.discordHandle = discordHandle;
            currentShowcase.showcaseLink = showcaseLink;

            const existingComic = currentShowcase.comics.find(c => c.rarity === comicRarity);
            if (existingComic) {
                existingComic.points = points;
                existingComic.mintNumber = mintNumber;
            } else {
                currentShowcase.comics.push({ rarity: comicRarity, mintNumber, points });
            }

            currentShowcase.totalPoints = currentShowcase.comics.reduce((total, comic) => total + comic.points, 0);

            // Check for Ultimate Set (all matching mint numbers)
            const matchingMints = currentShowcase.comics.map(c => c.mintNumber);
            const isUltimateSet = currentShowcase.comics.length === 5 && new Set(matchingMints).size === 1;
            if (isUltimateSet) {
                currentShowcase.totalPoints += 2000; // Ultimate Set bonus
            }

            // Check for Perfect Set (all five matching mint numbers)
            if (currentShowcase.comics.length === 5 && new Set(matchingMints).size === 1) {
                currentShowcase.totalPoints += 5000; // Perfect Set bonus
            }

            updateCurrentShowcase();
        }
    }

    function submitShowcase() {
        if (currentShowcase.comics.length > 0) {
            leaderboard.push({ ...currentShowcase });
            leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
            updateLeaderboard();

            // Generate raffle ticket
            const raffleTicket = `Raffle Ticket\nDiscord: ${currentShowcase.discordHandle}\nTotal Points: ${currentShowcase.totalPoints}`;
            document.getElementById('raffle-ticket-container').innerText = raffleTicket;

            // Reset current showcase
            currentShowcase = {
                discordHandle: '',
                showcaseLink: '',
                comics: [],
                totalPoints: 0
            };
            updateCurrentShowcase();
        } else {
            alert('Please add at least one comic to the showcase.');
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
    const endTime = new Date('2024-07-15T12:00:00'); // July 15, 2024, at 12:00 PM (noon)
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
