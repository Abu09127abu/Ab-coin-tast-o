document.addEventListener("DOMContentLoaded", () => {
    // Function to replace all URLs with 'ABCoin'
    const replaceUrlsWithText = () => {
        // Find all anchor tags and replace href and text content
        const links = document.querySelectorAll("a");
        links.forEach((link) => {
            link.removeAttribute("href");
            link.textContent = "ABCoin";
        });

        // Replace any direct URL text in elements
        const elementsWithUrl = document.querySelectorAll("[data-url]");
        elementsWithUrl.forEach((el) => {
            el.textContent = "ABCoin";
        });
    };

    // Call the function to hide URLs
    replaceUrlsWithText();
});
