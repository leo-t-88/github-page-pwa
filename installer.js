/*
 *  PWA Display Test. Copyright (c) 2018-2021 Tecdrop. MIT License.
 *  https://www.tecdrop.com
 */

/* eslint-disable no-console */

let installPromptEvent;
const installink = document.querySelector(".install-link");

// Install App functionality
window.addEventListener("beforeinstallprompt", event => {
    console.log("beforeinstallprompt Event");

    // Suppress automatic prompting
    event.preventDefault();

    // Stash the event so it can be triggered later.
    installPromptEvent = event;

    // Show the (hidden-by-default) install link
    installink.hidden = false;
});

installink.addEventListener("click", event => {
    console.log("Install App Link Click Event");
    event.preventDefault();

    // Show the modal add to home screen dialog
    installPromptEvent.prompt();

    // Wait for the user to respond to the prompt
    installPromptEvent.userChoice.then(choice => {
        if (choice.outcome === "accepted") {
            console.log("User accepted the A2HS prompt");
        } else {
            console.log("User dismissed the A2HS prompt");
        }
        // Clear the saved prompt since it can't be used again
        installPromptEvent = null;
    });
});
