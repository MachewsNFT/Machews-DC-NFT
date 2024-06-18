document.getElementById('addComic').addEventListener('click', function() {
    const discordHandle = document.getElementById('discordHandle').value;
    const showcaseLink = document.getElementById('showcaseLink').value;
    const comicRarity = document.getElementById('comicRarity').value;
    const mintNumber = document.getElementById('mintNumber').value;

    if (discordHandle && showcaseLink && comicRarity && mintNumber) {
        let points = calculatePoints(comicRarity, mintNumber);
        let currentPoints = document.getElementById(comicRarity.toLowerCase() + 'Points');
        currentPoints.textContent = points;

        updateTotalPoints();

        document.getElementById('current-showcase-title').textContent = discordHandle;

        // Update leaderboard
        addToLeaderboard(discordHandle, showcaseLink, document.getElementById('totalPoints').textContent);
    }
});

document.getElementById('submissionForm').addEventListener('submit', function(event) {
    event.preventDefault();
});

function calculatePoints(rarity, mintNumber) {
    // Implement your logic for calculating points
    return parseInt(mintNumber); // Example logic: points equal to mint number
}

function updateTotalPoints() {
    const rarities = ['lego', 'epic', 'rare', 'uc', 'core'];
    let totalPoints = 0;

    rarities.forEach(rarity => {
        totalPoints += parse
