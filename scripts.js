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

    // Calculate total points (example calculation, you need to define your point logic)
    let totalPoints = 0;
    data.comics.forEach(comic => {
        switch (comic.rarity) {
            case 'Lego':
                totalPoints += 100;
                break;
            case 'Epic':
                totalPoints += 80;
                break;
            case 'Rare':
                totalPoints += 60;
                break;
            case 'UC':
                totalPoints += 40;
                break;
            case 'Core':
                totalPoints += 20;
                break;
        }
        totalPoints += (10000 - comic.mint); // Example mint point calculation
    });

    // Display results
    document.getElementById('result-discordHandle').innerText = data.discordHandle;
    document.getElementById('result-points').innerText = totalPoints;

    alert('Submission received');
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
