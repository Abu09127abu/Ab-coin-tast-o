document.addEventListener("DOMContentLoaded", () => {
    // Check if `c.html` has been visited before
    const hasVisited = localStorage.getItem("hasVisitedCPage");

    if (hasVisited) {
        // If already visited, redirect to home.html
        window.location.href = "home.html";
    } else {
        // Mark `c.html` as visited in local storage
        localStorage.setItem("hasVisitedCPage", "true");
    }
});