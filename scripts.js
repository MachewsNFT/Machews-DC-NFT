document.getElementById('submissionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const discordHandle = formData.get('discordHandle');
    const showcaseLink = formData.get('showcaseLink');
    const comicRarity = formData.get('comicRarity');
    const mintNumber = formData.get('mintNumber');

    const showcaseInfo = document.getElementById('current-showcase');
    showcaseInfo.innerHTML += `
        <div>
            <p>Rarity: ${comicRarity}</p>
            <p>Mint Number: ${mintNumber}</p>
        </div>
    `;

    const currentShowcaseTitle = document.getElementById('current-showcase-title');
    currentShowcaseTitle.textContent = discordHandle;

    alert('Comic added to your showcase!');
});
