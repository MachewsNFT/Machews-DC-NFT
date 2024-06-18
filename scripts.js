document.getElementById('addComic').addEventListener('click', function() {
    const discordHandle = document.getElementById('discordHandle').value;
    const comicRarity = document.getElementById('comicRarity').value;
    const mintNumber = document.getElementById('mintNumber').value;

    if (discordHandle && comicRarity && mintNumber) {
        let points = calculatePoints(comicRarity, mintNumber);
        let currentPoints = document.getElementById(comicRarity.toLowerCase() + 'Points');
        currentPoints.textContent = points;

        updateTotalPoints();

        document.getElementById('current-showcase-title').textContent = discordHandle;
    }
});

document.getElementById('submitShowcase').addEventListener('click', function() {
    const discordHandle = document.getElementById('current-showcase-title').textContent;
    const showcaseLink = document.getElementById('showcaseLink').value;
    const totalPoints = document.getElementById('totalPoints').textContent;

    if (discordHandle && showcaseLink) {
        addToLeaderboard(discordHandle, showcaseLink, totalPoints);
    }
});

document.getElementById('submissionForm').addEventListener('submit', function(event) {
    event.preventDefault();
});

function calculatePoints(rarity, mintNumber) {
    // Implement your logic for calculating points
    return parseInt(mintNumber); //
