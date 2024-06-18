document.getElementById('submissionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const discordHandle = formData.get('discordHandle');
    const showcaseLink = formData.get('showcaseLink');
    const comicRarity = formData.get('comicRarity');
    const mintNumber = formData.get('mintNumber');

    // Update Current Showcase
    document.getElementById('currentShowcaseHeader').textContent = discordHandle;
    document.getElementById('current-showcase').innerHTML = `
        <p>Showcase Link: <a href="${showcaseLink}" target="_blank">${showcaseLink}</a></p>
        <p>Comic Rarity: ${comicRarity}</p>
        <p>Mint Number: ${mintNumber}</p>
        <p>Total Points: ...</p> <!-- Placeholder for points calculation -->
    `;

    // Update Leaderboard
    updateLeaderboard(discordHandle, showcaseLink, calculatePoints(comicRarity, mintNumber));
    alert('Submission received');
});

function calculatePoints(rarity, mintNumber) {
    // Placeholder function for points calculation
    return Math.floor(Math.random() * 1000); // Random points for demonstration
}

function updateLeaderboard(discordHandle, showcaseLink, points) {
    const leaderboard = document.getElementById('leaderboard');
    const newEntry = document.createElement('p');
    newEntry.innerHTML = `<a href="${showcaseLink}" target="_blank">${discordHandle}</a>: ${points} points`;
    leaderboard.appendChild(newEntry);

    // Sort and keep only top 3
    const entries = Array.from(leaderboard.getElementsByTagName('p'));
    entries.sort((a, b) => {
        const pointsA = parseInt(a.textContent.split(': ')[1].split(' ')[0]);
        const pointsB = parseInt(b.textContent.split(': ')[1].split(' ')[0]);
        return pointsB - pointsA;
    });
    leaderboard.innerHTML = '';
    entries.slice(0, 3).forEach(entry => leaderboard.appendChild(entry));
}

function loadCountdown() {
    const countdownElement = document.getElementById('countdown-timer');
    const endTime = new Date(Date.now() + 28 * 24 * 60 * 60 * 1000); // 28 days from now

    function updateCountdown() {
        const now = new Date();
        const remainingTime = endTime - now;

        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math
