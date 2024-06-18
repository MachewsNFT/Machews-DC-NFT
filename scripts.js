document.getElementById('submissionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const discordHandle = formData.get('discordHandle');
    const showcaseLink = formData.get('showcaseLink');
    const comicRarity = formData.get('comicRarity');
    const mintNumber = formData.get('mintNumber');

    document.getElementById('currentShowcaseHeader').textContent = discordHandle;
    document.getElementById('current-showcase').innerHTML = `
        <p>Showcase Link: ${showcaseLink}</p>
        <p>Comic Rarity: ${comicRarity}</p>
        <p>Mint Number: ${mintNumber}</p>
        <p>Total Points: ...</p> <!-- Placeholder for points calculation -->
    `;

    // Placeholder for leaderboard update logic
    alert('Submission received');
});

function loadCountdown() {
    const countdownElement = document.getElementById('countdown-timer');
    const endTime = new Date(Date.now() + 28 * 24 * 60 * 60 * 1000); // 28 days from now

    function updateCountdown() {
        const now = new Date();
        const remainingTime = endTime - now;

        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (remainingTime < 0) {
            clearInterval(interval);
            countdownElement.textContent = 'Contest Ended';
        }
    }

    const interval = setInterval(updateCountdown, 1000);
}

loadCountdown();
