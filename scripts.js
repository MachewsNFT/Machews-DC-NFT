document.getElementById('submissionForm').addEventListener('submit', function (event) {
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

function loadLeaderboard() {
    // Simulated leaderboard data
    const leaderboard = [
        { discordHandle: 'Player 1', showcaseLink: '#', points: 1000 },
        { discordHandle: 'Player 2', showcaseLink: '#', points: 950 },
        { discordHandle: 'Player 3', showcaseLink: '#', points: 900 }
    ];

    const leaderboardDiv = document.getElementById('leaderboard');
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

function updateCurrentShowcase(data) {
    const currentShowcaseDiv = document.getElementById('current-showcase');
    currentShowcaseDiv.innerHTML = '';

    data.comics.forEach((comic, index) => {
        const div = document.createElement('div');
        div.textContent = `Comic ${index + 1}: ${comic.rarity} - Mint ${comic.mint}`;
        currentShowcaseDiv.appendChild(div);
    });

    const totalPointsDiv = document.getElementById('total-points');
    totalPointsDiv.textContent = calculatePoints(data.comics);
}

function calculatePoints(comics) {
    let totalPoints = 0;

    comics.forEach((comic) => {
        let points = 0;

        switch (comic.rarity) {
            case 'Lego':
                points += 50;
                break;
            case 'Epic':
                points += 40;
                break;
            case 'Rare':
                points += 30;
                break;
            case 'UC':
                points += 20;
                break;
            case 'Core':
                points += 10;
                break;
            default:
                points += 0;
                break;
        }

        points += 1000 / comic.mint;
        totalPoints += points;
    });

    return totalPoints;
}
