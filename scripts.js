dbody {
    font-family: 'Open Sans', sans-serif;
    background: linear-gradient(
        to bottom,
        #F9EB00 25%,
        #C5D600 25%,
        #007AFF 25%,
        #FF0064 25%
    );
    background-size: cover;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    color: white;
    font-size: 1.4em; /* Increased font size by 20% */
}

.container {
    background-color: rgba(0, 0, 0, 0.8);
    padding: 28px; /* Increased padding by 20% */
    border-radius: 8px;
    text-align: center;
    width: 80%;
    max-width: 960px; /* Increased max-width by 20% */
    position: relative;
}

header, main, .logos-row {
    margin-bottom: 20px;
}

header img {
    width: 100%;
    border-radius: 8px;
}

.countdown-timer {
    font-size: 1.6em; /* Increased font size */
    color: yellow; /* Changed color */
    background-color: black;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
}

form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
}

label {
    margin: 10px 0 5px;
}

input, select, button {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 1em;
    border-radius: 4px;
}

.form-group {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.form-group label,
.form-group input[type="text"],
.form-group input[type="url"] {
    width: 45%;
}

.form-group select,
.form-group input[type="number"] {
    width: 45%;
    margin: 0;
}

button {
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #45a049;
}

.small-button {
    width: auto;
    padding: 10px 20px;
    margin-bottom: 10px;
}

.clear-button {
    width: auto;
    padding: 10px 20px;
    background-color: #FF0000;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    display: block;
    margin-top: 20px;
}

.clear-button:hover {
    background-color: #CC0000;
}

.logos-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.logo-container {
    flex: 1;
    padding: 10px;
    text-align: center;
}

.logo-container img {
    width: 80%;
    max-width: 200px;
    border-radius: 8px;
    border: 2px solid gold;
}

.wiki-logo {
    margin-top: 20px;
    width: 100%; /* Increased size */
    max-width: 240px; /* Increased max-width */
}

.sidebar {
    background-color: #000;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    border: 2px solid #007AFF;
    color: white;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 240px; /* Adjusted width */
}

.sidebar-left {
    left: -270px; /* Adjusted to move to the left */
}

.sidebar-right {
    right: -270px; /* Adjusted to move to the right */
}

#current-showcase-title, #leaderboard h3 {
    font-size: 1.4em; /* Increased font size by 20% */
}

/* Media Queries */
@media (max-width: 768px) {
    .container {
        width: 100%;
    }

    .sidebar-left, .sidebar-right {
        position: static;
        transform: none;
        width: 100%;
        margin: 10px 0;
    }

    .form-group {
        flex-direction: column;
    }

    .form-group label,
    .form-group input,
    .form-group select {
        width: 100%;
        margin-bottom: 10px;
    }

    .small-button {
        position: static; /* Reset position in mobile view */
        transform: none;
        margin: 0 auto;
    }
}
