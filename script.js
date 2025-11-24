// Add .reveal to everything we want animated
document.addEventListener("DOMContentLoaded", () => {
    const revealEls = document.querySelectorAll(
        "section, .team_card, .sponsor_card, .about_container, .hero_container, .text_section, img, h2, h3, p"
    );

    // Use a simple loop instead of NodeList.forEach (works on older mobile browsers)
    for (let i = 0; i < revealEls.length; i++) {
        revealEls[i].classList.add("reveal");
    }

    // Run once on load so things already in view (like the hero) fade in
    handleScrollReveal();

    // Fade-in navbar on load
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        navbar.classList.add("visible");
    }

    // ------- Hamburger menu dropdown -------
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        // Open/close menu when hamburger clicked
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("show");
        });

        // Optional: close menu when a link is clicked
        const links = navLinks.querySelectorAll("a");
        for (let i = 0; i < links.length; i++) {
            links[i].addEventListener("click", () => {
                navLinks.classList.remove("show");
            });
        }
    }

    // -------- Gallery slider --------
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");

    if (prev && next) {
        prev.addEventListener("click", () => {
            const items = document.querySelectorAll(".item");
            const slide = document.querySelector(".slide");
            if (items.length && slide) {
                slide.prepend(items[items.length - 1]);
            }
        });

        next.addEventListener("click", () => {
            const items = document.querySelectorAll(".item");
            const slide = document.querySelector(".slide");
            if (items.length && slide) {
                slide.append(items[0]);
            }
        });
    }
});

// Run on scroll as well
window.addEventListener("scroll", handleScrollReveal);

function handleScrollReveal() {
    const revealEls = document.querySelectorAll(".reveal");
    for (let i = 0; i < revealEls.length; i++) {
        const el = revealEls[i];
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            el.classList.add("visible");
        }
    }
}
