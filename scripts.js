document.getElementById('submissionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const discordHandle = document.getElementById('discordHandle').value;
    const showcaseLink = document.getElementById('showcaseLink').value;
    const comicRarity = document.getElementById('comicRarity').value;
    const mintNumber = document.getElementById('mintNumber').value;

    const currentShowcaseTitle = document.getElementById('current-showcase-title');
    const currentShowcaseContent = document.getElementById('current-showcase-content');

    if (discordHandle && showcaseLink && comicRarity && mintNumber) {
        currentShowcaseTitle.textContent = discordHandle;
        
        const comicInfo = document.createElement('p');
        comicInfo.textContent = `Rarity: ${comicRarity}, Mint Number: ${mintNumber}`;
        currentShowcaseContent.appendChild(comicInfo);

        // Here you can handle the leaderboard update
    }

    console.log('Form Data:', { discordHandle, showcaseLink, comicRarity, mintNumber });
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
