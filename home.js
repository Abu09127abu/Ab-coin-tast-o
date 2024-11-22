document.addEventListener("DOMContentLoaded", () => {
    let isBackPressed = false;

    // Handle the Android back button event
    window.addEventListener("popstate", () => {
        if (!isBackPressed) {
            isBackPressed = true;
            alert("Press back again to exit the game."); // Optional: Provide a warning message
            setTimeout(() => {
                isBackPressed = false;
            }, 2000); // Reset the back press flag after 2 seconds
        } else {
            closeGame();
        }
    });

    // Function to exit the game
    function closeGame() {
        if (navigator.app) {
            navigator.app.exitApp(); // For Cordova/PhoneGap apps
        } else if (navigator.device) {
            navigator.device.exitApp(); // For older device APIs
        } else {
            window.close(); // For web browsers (may not always work)
        }
    }

    // Push a state to make sure back button press is registered
    history.pushState(null, null, location.href);
});