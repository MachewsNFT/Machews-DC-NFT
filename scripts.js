// Function to calculate and display the countdown timer
function startCountdown(endTime) {
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endTime - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown-timer').textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown-timer').textContent = 'Contest Ended';
        }
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    const endTime = new Date();
    endTime.setDate(endTime.getDate() + 28); // Set the end time 28 days from now
    endTime.setHours(12, 0, 0); // Set the end time to 12 PM

    startCountdown(endTime);

    document.getElementById('addButton').addEventListener('click', function() {
        const discordHandle = document.getElementById('discordHandle').value;
        const showcaseLink = document.getElementById('showcaseLink').value;
        const comicRarity = document.getElementById('comicRarity').value;
        const mintNumber = document.getElementById('mintNumber').value;

        if (discordHandle && showcaseLink && comicRarity && mintNumber) {
            // Add your functionality to handle the submission
            // Example: Add the current showcase to the leaderboard
            addToLeaderboard(discordHandle, showcaseLink, comicRarity, mintNumber);
        }
    });

    function addToLeaderboard(discordHandle, showcaseLink, comicRarity, mintNumber) {
        const leaderboard = document.getElementById('leaderboard-info');
        const newEntry = document.createElement('p');
        newEntry.textContent = `${discordHandle} - ${comicRarity} - ${mintNumber}`;
        leaderboard.appendChild(newEntry);
    }
});
