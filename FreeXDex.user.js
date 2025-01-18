// ==UserScript==
// @name         Codex Key System Bypasser
// @namespace    https://github.com/falpearx
// @version      1.0
// @description  Bypass the Codex Key System with ease!
// @updateURL    https://github.com/falpearx/FreeXDex/raw/main/FreeXDex.meta.js
// @downloadURL  https://github.com/falpearx/FreeXDex/raw/main/FreeXDex.user.js
// @author       Falpearx; https://github.com/falpearx
// @match        *://loot-links.com/*
// @match        *://linkvertise.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=codex.lol
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    // Define sites and their redirects
    const sites = [
        { url: "https://loot-links.com/s?mK6Z", redirect: "https://mobile.codex.lol/?page=tasks" },
        { url: "https://linkvertise.com/654032/codex-gateway-2", redirect: "https://mobile.codex.lol/?page=tasks" },
        { url: "https://loot-link.com/s?oiQO", redirect: "https://mobile.codex.lol/?page=tasks" }
    ];

    // Get the current URL
    const currentURL = window.location.href;

    // Check for a matching site
    const match = sites.find(site => currentURL === site.url || currentURL.includes(site.url));

    if (match) {
        // Create confirmation div
        const confirmationDiv = document.createElement('div');
        confirmationDiv.style.position = 'fixed';
        confirmationDiv.style.top = '50%';
        confirmationDiv.style.left = '50%';
        confirmationDiv.style.transform = 'translate(-50%, -50%)';  // Center the div
        confirmationDiv.style.backgroundColor = '#f0f0f0';
        confirmationDiv.style.padding = '20px';
        confirmationDiv.style.border = '2px solid #ccc';
        confirmationDiv.style.zIndex = '2147483647';  // Highest z-index to ensure it appears above everything
        confirmationDiv.style.textAlign = 'center';
        confirmationDiv.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
        confirmationDiv.style.borderRadius = '10px';
        confirmationDiv.style.maxWidth = '90%';  // Prevent it from being too wide on smaller screens
        confirmationDiv.style.boxSizing = 'border-box';
        confirmationDiv.innerHTML = `
            <p style="font-size: 16px; font-weight: bold; margin-bottom: 15px;">Do you want to be redirected to a new page?</p>
            <button id="redirectYes" style="margin: 10px; padding: 12px 20px; background-color: #4CAF50; color: white; border: none; cursor: pointer; border-radius: 5px;">Yes</button>
            <button id="redirectNo" style="margin: 10px; padding: 12px 20px; background-color: #f44336; color: white; border: none; cursor: pointer; border-radius: 5px;">No</button>
        `;
        document.body.appendChild(confirmationDiv);

        let countdownStarted = false; // Flag to ensure countdown starts only once
        let countdownInterval = null; // Store the countdown interval to clear it later

        // Event listeners for the buttons
        document.getElementById('redirectYes').addEventListener('click', function () {
            if (!countdownStarted) {
                countdownStarted = true; // Set the flag to true so countdown won't start again
                let countdown = 15;
                const countdownDisplay = document.createElement('p');
                countdownDisplay.style.fontSize = '18px';
                countdownDisplay.style.fontWeight = 'bold';
                countdownDisplay.innerText = `Redirecting in ${countdown} seconds...`;
                confirmationDiv.appendChild(countdownDisplay);

                // Skip button
                const skipButton = document.createElement('button');
                skipButton.innerText = "Skip";
                skipButton.style.margin = '10px';
                skipButton.style.padding = '12px 20px';
                skipButton.style.backgroundColor = '#f39c12';
                skipButton.style.color = 'white';
                skipButton.style.border = 'none';
                skipButton.style.cursor = 'pointer';
                skipButton.style.borderRadius = '5px';
                confirmationDiv.appendChild(skipButton);

                // Skip button event listener
                skipButton.addEventListener('click', function () {
                    clearInterval(countdownInterval);
                    window.open(match.redirect, "_blank");
                    confirmationDiv.remove();
                });

                // Countdown logic
                countdownInterval = setInterval(function () {
                    countdown--;
                    countdownDisplay.innerText = `Redirecting in ${countdown} seconds...`;

                    if (countdown === 0) {
                        clearInterval(countdownInterval);
                        window.open(match.redirect, "_blank");
                        confirmationDiv.remove();
                    }
                }, 1000);
            }
        });

        document.getElementById('redirectNo').addEventListener('click', function () {
            // Remove confirmation div and clear countdown interval if it's running
            clearInterval(countdownInterval);
            confirmationDiv.remove();
        });
    }
})();