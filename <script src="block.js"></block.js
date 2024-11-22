document.addEventListener("DOMContentLoaded", () => {
    // Function to detect if opened in Telegram browser
    const isTelegramBrowser = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return userAgent.includes("Telegram");
    };

    // Check if Telegram browser is detected
    if (!isTelegramBrowser()) {
        // Redirect to a 404 or block message page
        document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; background-color: black; color: white; text-align: center;">
                <h1>404 - Page Not Found</h1>
                <p>This page can only be accessed from the Telegram app.</p>
            </div>
        `;
    }
});
