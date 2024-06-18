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

        addToLeaderboard(discordHandle, showcaseLink, document.getElementById('totalPoints').textContent);
    }
});

function calculatePoints(rarity, mintNumber) {
    // Implement your logic for calculating points
    return parseInt(mintNumber); // Example logic, replace with your own
}

function updateTotalPoints() {
    let totalPoints = 0;
    totalPoints += parseInt(document.getElementById('legoPoints').textContent);
    totalPoints += parseInt(document.getElementById('epicPoints').textContent);
   
