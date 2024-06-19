<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delta Charlie DC3 Contest</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <script src="scripts.js" defer></script>
</head>
<body>
    <div class="container">
        <header>
            <div class="name-tape">
                <img src="nametape.jpg" alt="Name Tape">
                <h1>Delta Charlie</h1>
            </div>
            <div id="countdown-timer" class="countdown-timer"></div>
            <img src="comicbanner.jpg" alt="Comic Banner" class="banner-image">
            <h2>JLA The Nail Lowest Mint Set Contest</h2>
        </header>

        <main>
            <form id="submissionForm">
                <div class="form-group">
                    <label for="discordHandle">Discord Handle:</label>
                    <input type="text" id="discordHandle" name="discordHandle" placeholder="Enter your handle" required>
                    
                    <label for="showcaseLink">Showcase Link:</label>
                    <input type="url" id="showcaseLink" name="showcaseLink" placeholder="Drop showcase link here" required>
                </div>

                <div class="form-group">
                    <label for="comicRarity">Comic Rarity:</label>
                    <select id="comicRarity" name="comicRarity" required>
                        <option value="">Select Rarity</option>
                        <option value="Lego">Lego</option>
                        <option value="Epic">Epic</option>
                        <option value="Rare">Rare</option>
                        <option value="UC">UC</option>
                        <option value="Core">Core</option>
                    </select>

                    <label for="mintNumber">Mint Number:</label>
                    <input type="number" id="mintNumber" name="mintNumber" placeholder="Enter mint number" required>
                </div>
            </form>

            <div class="logos-row">
                <div class="logo-container">
                    <img src="DC3JAL.jpg" alt="DC3JAL Logo">
                </div>
                <div class="logo-container">
                    <img src="dc3_wiki_logo.jpg" alt="DC3 Wiki Logo" class="wiki-logo">
                </div>
                <div class="logo-container">
                    <img src="dc.jpg" alt="DC Logo">
                </div>
            </div>

            <button type="button" id="addButton" class="small-button">Add</button>
        </main>

        <aside class="sidebar sidebar-left" id="current-showcase">
            <h3 id="current-showcase-title">Current Showcase</h3>
            <div id="showcase-info">
                <p>Lego: <span id="legoPoints">0</span></p>
                <p>Epic: <span id="epicPoints">0</span></p>
                <p>Rare: <span id="rarePoints">0</span></p>
                <p>UC: <span id="ucPoints">0</span></p>
                <p>Core: <span id="corePoints">0</span></p>
                <p>Total Points: <span id="totalPoints">0</span></p>
            </div>
        </aside>

        <aside class="sidebar sidebar-right" id="leaderboard">
            <h3>Leaderboard</h3>
            <div id="leaderboard-info">
                <!-- Leaderboard entries will be populated here -->
            </div>
        </aside>
    </div>
</body>
</html>
