document.addEventListener("DOMContentLoaded", () => {
    const fadeInElements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeInElements.forEach(el => observer.observe(el));

    const loginToggle = document.getElementById("login-toggle");
    const loginForm = document.getElementById("login-form");
    const loginClose = document.getElementById("login-close");
    const toggleBtn = document.getElementById("toggle-form");
    const togglePrompt = document.getElementById("toggle-prompt");
    const formTitle = document.getElementById("form-title");
    const formSlider = document.getElementById("form-slider");

    let isVisible = false;
    let isSignup = false;

    if (loginToggle) {
        loginToggle.addEventListener("click", () => {
            isVisible = !isVisible;
            if (loginForm) {
                loginForm.classList.toggle("hidden", !isVisible);
                loginForm.classList.toggle("opacity-0", !isVisible);
                loginForm.classList.toggle("translate-x-10", !isVisible);
                loginForm.classList.toggle("opacity-100", isVisible);
                loginForm.classList.toggle("translate-x-0", isVisible);
            }
        });
    }

    if (loginClose) {
        loginClose.addEventListener("click", () => {
            isVisible = false;
            if (loginForm) {
                loginForm.classList.add("hidden");
                loginForm.classList.add("opacity-0");
                loginForm.classList.add("translate-x-10");
                loginForm.classList.remove("opacity-100");
                loginForm.classList.remove("translate-x-0");
            }
        });
    }

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            isSignup = !isSignup;
            if (formTitle) formTitle.textContent = isSignup ? "Sign Up" : "Sign In";
            if (toggleBtn) toggleBtn.textContent = isSignup ? "Login" : "Sign Up";
            if (togglePrompt) togglePrompt.textContent = isSignup ?
                "Already have an account?" :
                "Don't have an account?";
            if (formSlider) formSlider.style.transform = isSignup ? "translateX(-100%)" : "translateX(0)";
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("medicalCanvas");
    const ctx = canvas.getContext("2d");
    const hero = document.getElementById("hero");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = hero.offsetHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    let t = 0;
    let mouseX = 0;
    let mouseY = 0;

    const particles = Array.from({ length: 160 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseR: Math.random() * 2 + 1,
        r: 0,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
    }));

    function drawCells() {
        particles.forEach((p, index) => {
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                p.x -= dx * 0.02;
                p.y -= dy * 0.02;
            }
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

            // Pulse animation
            const pulse = Math.sin(t * 2 + index) * 0.5 + 1;
            p.r = p.baseR * pulse;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(5, 106, 36, 0.3)";
            ctx.fill();
        });
    }

    canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCells();
        t += 0.03;
        requestAnimationFrame(animate);
    }
    animate();
});

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("free-trial-modal");
    const modalContent = document.getElementById("modal-content");
    const closeModal = document.getElementById("close-modal");
    const closeModalSecondary = document.getElementById("close-modal-secondary");

    setTimeout(() => {
        modal.classList.remove("hidden");
        setTimeout(() => {
            modalContent.classList.remove("scale-90", "opacity-0");
            modalContent.classList.add("scale-100", "opacity-100");
        }, 100);
    }, 7000);

    closeModal.addEventListener("click", () => {
        modalContent.classList.add("scale-90", "opacity-0");
        setTimeout(() => {
            modal.classList.add("hidden");
        }, 300);
    });

    closeModalSecondary.addEventListener("click", () => {
        modalContent.classList.add("scale-90", "opacity-0");
        setTimeout(() => {
            modal.classList.add("hidden");
        }, 300);
    });
});

document.addEventListener("scroll", () => {
    const cards = document.querySelectorAll(".testimonial-card");
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const offset = (rect.top - window.innerHeight / 2) * 0.05;
        card.style.setProperty('--scroll-amount', `${offset}px`);
    });
});

const scrollList = document.querySelector(".scroll-list");
const items = Array.from(scrollList.children);

window.addEventListener("load", () => {
    items.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        scrollList.appendChild(clone);
    });
});

document.getElementById('nav-toggle').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('menu-active');
    this.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", () => {
    const detailsElements = document.querySelectorAll("#roadmap details");
    detailsElements.forEach(details => {
        details.addEventListener("toggle", () => {
            if (details.open) {
                details.classList.add("open");
            } else {
                details.classList.remove("open");
            }
        });
    });

    const aiSection = document.getElementById("ai-mvp");
    const roadmapSection = document.getElementById("roadmap");
    const showBtn = document.getElementById("show-roadmap-btn");
    const hideBtn = document.getElementById("hide-roadmap-btn");

    showBtn.addEventListener("click", () => {
        aiSection.classList.add("hidden");
        roadmapSection.classList.remove("hidden");
        roadmapSection.scrollIntoView({ behavior: "smooth" });
    });

    hideBtn.addEventListener("click", () => {
        roadmapSection.classList.add("hidden");
        aiSection.classList.remove("hidden");
        aiSection.scrollIntoView({ behavior: "smooth" });
    });

    // Staggered animation for roadmap cards
    const roadmapCardsContainer = document.getElementById("roadmap-cards-container");
    if (roadmapCardsContainer) {
        const cardObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = roadmapCardsContainer.querySelectorAll(".roadmap-card");
                    cards.forEach((card, index) => {
                        // The CSS handles the delay based on :nth-child, 
                        // but if we wanted JS-based delay, it would be here:
                        // setTimeout(() => {
                        // card.classList.add("is-visible");
                        // }, index * 200); // 200ms delay between cards
                        card.classList.add("is-visible");
                    });
                    observer.unobserve(roadmapCardsContainer); // Stop observing after triggering once
                }
            });
        }, { threshold: 0.2 }); // Trigger when 20% of the container is visible

        cardObserver.observe(roadmapCardsContainer);
    }
});

/* Dark Mode Toggle Functionality - Commented Out
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;

    // Function to apply the theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
            if(darkModeToggle) darkModeToggle.checked = true;
        } else {
            htmlElement.classList.remove('dark');
            if(darkModeToggle) darkModeToggle.checked = false;
        }
    };

    // Check for saved theme in localStorage and apply it
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // If no saved theme, check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }

    // Event listener for the toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                applyTheme('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                applyTheme('light');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Listen for changes in system preference (optional, but good for UX)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newTheme = e.matches ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme); // Update localStorage as well
    });
});
*/

// Scrollspy for Navbar Highlight
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("header nav a[href^='#']"); // Target links in header nav
    const mobileNavLinks = document.querySelectorAll("#mobile-menu a[href^='#']");

    console.log("Sections found:", sections.length, sections);
    console.log("Desktop NavLinks found:", navLinks.length, navLinks);
    console.log("Mobile NavLinks found:", mobileNavLinks.length, mobileNavLinks);

    if (!sections.length || (!navLinks.length && !mobileNavLinks.length)) {
        console.log("Scrollspy: No sections or nav links to observe. Exiting.");
        return; // No sections or nav links to observe
    }

    const activateNavLinks = (currentSectionId) => {
        navLinks.forEach(link => {
            link.classList.remove("text-green-600", "font-bold", "dark:text-green-400");
            const linkHref = link.getAttribute("href");
            // console.log(`Desktop link: ${linkHref}, Current section: #${currentSectionId}`); // Optional: very verbose
            if (linkHref === `#${currentSectionId}`) {
                console.log(`Activating desktop link: ${linkHref}`);
                link.classList.add("text-green-600", "font-bold", "dark:text-green-400");
            }
        });
        mobileNavLinks.forEach(link => {
            link.classList.remove("text-green-600", "font-bold", "dark:text-green-400");
            const linkHref = link.getAttribute("href");
            // console.log(`Mobile link: ${linkHref}, Current section: #${currentSectionId}`); // Optional: very verbose
            if (linkHref === `#${currentSectionId}`) {
                console.log(`Activating mobile link: ${linkHref}`);
                link.classList.add("text-green-600", "font-bold", "dark:text-green-400");
            }
        });
    };

    const onScroll = () => {
        const scrollPosition = window.pageYOffset;
        const headerOffset = 90; // Adjust this based on your fixed header's height
        let newCurrentSectionId = "";

        // Iterate through sections to find the current one
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            // Only consider the section if it's a <SECTION> tag and is currently visible
            if (section.tagName === 'SECTION' && section.offsetParent !== null) {
                const sectionTop = section.offsetTop - headerOffset;

                if (scrollPosition >= sectionTop) {
                    newCurrentSectionId = section.id;
                } else {
                    // If we've passed the section that should be current, stop.
                    // This handles cases where sections are taller than the viewport.
                    break;
                }
            }
        }

        // If after checking all sections, newCurrentSectionId is still empty
        // (e.g., scrolled above the first section), try to set it to the first section if visible.
        if (newCurrentSectionId === "" && sections.length > 0 && sections[0].tagName === 'SECTION') {
            // Check if the top of the first section is visible or nearly visible
            // and ensure the first section itself is visible
            if (sections[0].offsetParent !== null && scrollPosition < (sections[0].offsetTop - headerOffset + sections[0].offsetHeight)) {
                // newCurrentSectionId = sections[0].id; // Optionally highlight first section if scrolled to top
                // For now, let's leave it blank if truly above all sections (or set to hero by default if scrollY is 0)
                if (scrollPosition === 0 && sections[0].id === 'hero') {
                    newCurrentSectionId = 'hero';
                }
            }
        }

        console.log("Current active section ID:", newCurrentSectionId, "ScrollY:", scrollPosition);
        activateNavLinks(newCurrentSectionId);
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // Call on load to set initial state
});