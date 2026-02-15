// Add .reveal to everything we want animated
document.addEventListener("DOMContentLoaded", () => {
    const revealEls = document.querySelectorAll(
        "section, .team_card, .sponsor_card, .about_container, .hero_container, .text_section, img, h2, h3, p"
    );

    // Add .reveal to targets
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

    // ------- Hamburger menu dropdown (NO nested DOMContentLoaded) -------
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("show");
            menuToggle.classList.toggle("active"); // animates bars into X
        });

        // Optional: close menu when a link is clicked
        const links = navLinks.querySelectorAll("a");
        for (let i = 0; i < links.length; i++) {
            links[i].addEventListener("click", () => {
                navLinks.classList.remove("show");
                menuToggle.classList.remove("active");
            });
        }
    }

    // ------- Values card flip interaction -------
    const valuesCardWrappers = document.querySelectorAll(".values_card_wrapper");
    for (let i = 0; i < valuesCardWrappers.length; i++) {
        valuesCardWrappers[i].addEventListener("click", () => {
            valuesCardWrappers[i].classList.toggle("flipped");
        });
    }

    // -------- Gallery slider --------
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    let currentSlide = 0;
    const items = document.querySelectorAll(".item");
    const totalSlides = items.length;

    // Hide all items except the first one initially
    function hideAllItems() {
        items.forEach((item, index) => {
            item.style.display = index === currentSlide ? "flex" : "none";
        });
    }

    // Create gallery dots
    const dotsContainer = document.getElementById("galleryDots");
    if (dotsContainer) {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement("div");
            dot.classList.add("gallery_dot");
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", () => {
                goToSlide(i);
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = document.querySelectorAll(".gallery_dot");
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSlide);
        });
    }

    function goToSlide(n) {
        currentSlide = n;
        hideAllItems();
        updateDots();
    }

    // Initialize - hide all except first
    hideAllItems();

    if (prev && next) {
        prev.addEventListener("click", () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            goToSlide(currentSlide);
        });

        next.addEventListener("click", () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        });
    }

    // Optional: Auto-advance gallery every 7 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }, 7000);

    // -------- Event Calendar --------
    let currentDate = new Date();
    
    // Event data for Semester 1 2026
    const events = [
        { date: '2026-02-18', title: 'Market Day', time: '8am-3pm', location: 'UQ Great Court' },
        { date: '2026-02-25', title: 'Launch Party', time: '6pm-9pm', location: 'TBD' },
        { date: '2026-03-02', title: 'Mentorship Program - Mentor Induction', time: '6pm-8pm', location: 'TBC' },
        { date: '2026-03-04', title: 'Simon Lake: Quality Reflections', time: '6pm-9pm', location: 'Abel Smith Theatre' },
        { date: '2026-03-06', title: 'Employability Development Series #1', time: '6pm-9pm', location: 'Abel Smith Theatre' },
        { date: '2026-03-11', title: 'Mentorship - Industry Mentor Session #1', time: '6pm-8pm', location: 'TBC' },
        { date: '2026-03-12', title: 'Majors Night', time: '6pm-9pm', location: 'UQ ModWest Room' },
        { date: '2026-03-13', title: 'Biomanufacturing Masterclass', time: '6pm-9pm', location: 'TBD' },
        { date: '2026-03-16', title: 'Southern RNA Lab Tour', time: 'TBC', location: 'Gold Coast Site' },
        { date: '2026-03-17', title: 'Patheon Lab Tour', time: 'TBC', location: 'TBC' },
        { date: '2026-03-18', title: 'Frazer Institute Lab Tour', time: 'TBC', location: 'Frazer Institute' },
        { date: '2026-03-18', title: 'Mentorship - Industry Mentor Session #3', time: '6pm-8pm', location: 'TBC' },
        { date: '2026-03-23', title: 'TRI Tour', time: 'TBC', location: 'TRI' },
        { date: '2026-03-24', title: 'MedTech Career Panel', time: '6pm-8pm', location: 'TBC' },
        { date: '2026-03-25', title: 'Mentorship - Industry Mentor Session #2', time: '6pm-7pm', location: 'TBC' },
        { date: '2026-03-26', title: 'AIBN / PEF Lab Tour', time: 'TBC', location: 'AIBN/PEF' },
        { date: '2026-03-31', title: 'Industry Night', time: '6pm-9pm', location: 'ModWest' }
    ];
    
    function getEventsForDate(year, month, day) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.filter(event => event.date === dateStr);
    }
    
    function generateCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        
        // Update month display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        document.getElementById('calendarMonth').textContent = `${monthNames[month]} ${year}`;
        
        // Clear previous calendar
        const calendarGrid = document.getElementById('calendarGrid');
        calendarGrid.innerHTML = '';
        
        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const header = document.createElement('div');
            header.className = 'calendar_header';
            header.textContent = day;
            calendarGrid.appendChild(header);
        });
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar_day empty';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar_day';
            dayCell.textContent = day;
            
            // Check if this day has events
            const dayEvents = getEventsForDate(year, month, day);
            if (dayEvents.length > 0) {
                dayCell.classList.add('has_event');
                
                // Create tooltip with event details
                const tooltip = document.createElement('div');
                tooltip.className = 'event_tooltip';
                
                dayEvents.forEach(event => {
                    const eventInfo = document.createElement('div');
                    eventInfo.className = 'tooltip_event';
                    eventInfo.innerHTML = `
                        <strong>${event.title}</strong><br>
                        <span>⏰ ${event.time}</span><br>
                        <span>📍 ${event.location}</span>
                    `;
                    tooltip.appendChild(eventInfo);
                });
                
                dayCell.appendChild(tooltip);
            }
            
            calendarGrid.appendChild(dayCell);
        }
    }
    
    // Initialize calendar
    generateCalendar(currentDate);
    
    // Calendar navigation
    const prevMonthBtn = document.querySelector('.prev_month');
    const nextMonthBtn = document.querySelector('.next_month');
    
    if (prevMonthBtn && nextMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            generateCalendar(currentDate);
        });
        
        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            generateCalendar(currentDate);
        });
    }

    // ------- Counter animation for statistics -------
    let counterStarted = false;
    window.addEventListener("scroll", () => {
        if (counterStarted) return;
        
        const highlightSection = document.querySelector(".about_highlights");
        if (!highlightSection) return;
        
        const rect = highlightSection.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            counterStarted = true;
            animateCounters();
        }
    });

    function animateCounters() {
        const counters = document.querySelectorAll(".highlight_number");
        const duration = 2000; // 2 seconds
        const start = Date.now();

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute("data-target"));
            
            function update() {
                const now = Date.now();
                const progress = Math.min((now - start) / duration, 1);
                const current = Math.floor(progress * target);
                counter.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            }
            
            update();
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
