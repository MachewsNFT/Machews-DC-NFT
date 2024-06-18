document.getElementById('submissionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {
        discordHandle: formData.get('discordHandle'),
        showcaseLink: formData.get('showcaseLink'),
        comics: [
            {
                rarity: formData.get('comic_rarity'),
                mint: formData.get('comic_mint')
            }
        ]
    };

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

// Countdown Timer
const countdownTimer = document.getElementById('countdown-timer');
const endDate = new Date('2024-07-01T00:00:00').getTime(); // Set the end date for the countdown

function updateCountdown() {
    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance < 0) {
        countdownTimer.innerHTML = 'Contest has ended';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownTimer.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown(
