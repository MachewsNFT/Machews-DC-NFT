document.getElementById('submissionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const discordHandle = document.getElementById('discordHandle').value;
    const showcaseLink = document.getElementById('showcaseLink').value;
    const comicRarity = document.getElementById('comicRarity').value;
    const mintNumber = document.getElementById('mintNumber').value;

    const currentShowcaseTitle = document.getElementById('current-showcase-title');
    const currentShowcaseContent = document.getElementById('showcase-info');

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
        { discordHandle: 'Player 3', showcaseLink: '#', points: 900 },
        { discordHandle: 'Player 4', showcaseLink: '#', points: 850 },
        { discordHandle: 'Player 5', showcaseLink: '#', points: 800 },
        { discordHandle: 'Player 6', showcaseLink: '#', points: 750 },
        { discordHandle: 'Player 7', showcaseLink: '#', points: 700 },
        { discordHandle: 'Player 8', showcaseLink: '#', points: 650 },
        { discordHandle: 'Player 9', showcaseLink: '#', points: 600 },
        { discordHandle: 'Player 10', showcaseLink: '#', points: 550 }
    ];

    const leaderboardDiv = document.getElementById('leaderboard-info');
    leaderboardDiv.innerHTML = '';
    leaderboard.forEach((entry, index) => {
        const link = document.createElement('a
