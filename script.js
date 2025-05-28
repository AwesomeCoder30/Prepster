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

// Modal Logic DOMContentLoaded block - THIS IS THE ONE WE ARE TESTING
document.addEventListener("DOMContentLoaded", () => {
    console.log("MODAL SCRIPT BLOCK EXECUTING"); // VERY FIRST LINE FOR TESTING

    const modal = document.getElementById("free-trial-modal");
    const modalContent = document.getElementById("modal-content");
    const closeModal = document.getElementById("close-modal");
    const closeModalSecondary = document.getElementById("close-modal-secondary");
    const modalJoinButton = document.getElementById("modal-join-button");

    console.log("Attempting to find Modal Join Button. Element found:", modalJoinButton);

    const hideModal = () => {
        if (modalContent) {
            modalContent.classList.add("scale-90", "opacity-0");
        }
        setTimeout(() => {
            if (modal) {
                modal.classList.add("hidden");
            }
        }, 300);
    };

    if (modal) {
        setTimeout(() => {
            modal.classList.remove("hidden");
            if (modalContent) {
                setTimeout(() => {
                    modalContent.classList.remove("scale-90", "opacity-0");
                    modalContent.classList.add("scale-100", "opacity-100");
                }, 100);
            }
        }, 7000);

        if (closeModal) {
            closeModal.addEventListener("click", hideModal);
        }
        if (closeModalSecondary) {
            closeModalSecondary.addEventListener("click", hideModal);
        }
        if (modalJoinButton) {
            console.log("Modal Join Button found and listener being attached.");
            modalJoinButton.addEventListener("click", (event) => {
                console.log("Modal Join Button clicked.");
                event.preventDefault();
                console.log("Default scroll prevented.");
                hideModal();
                console.log("hideModal() function called.");
                const targetId = modalJoinButton.getAttribute('href');
                console.log("Target ID for scroll:", targetId);
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    console.log("Target element for scroll found:", targetElement);
                    setTimeout(() => {
                        console.log("Executing scrollToView.");
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }, 150);
                } else {
                    console.error("Target element for scroll NOT found:", targetId);
                }
            });
        } else {
            console.error("ERROR: Modal Join Button with ID 'modal-join-button' was NOT found by getElementById.");
        }
    }
});

document.addEventListener("scroll", () => {
    const cards = document.querySelectorAll(".testimonial-card");
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const offset = (rect.top - window.innerHeight / 2) * 0.05;
        card.style.setProperty('--scroll-amount', `${offset}px`);
    });
});

// Scroll List Duplication
const scrollList = document.querySelector(".scroll-list");
if (scrollList) { // Check if scrollList exists
    const items = Array.from(scrollList.children);
    // Ensure this runs after the DOM is ready and images (if any) are loaded for proper height calculation if needed, though here it's mainly for DOM manipulation.
    window.addEventListener("load", () => {
        items.forEach((item) => {
            const clone = item.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            scrollList.appendChild(clone);
        });
    });
}

// Nav Toggle
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('menu-active');
        this.classList.toggle('active');
    });

    // Get all links within the mobile menu
    const mobileMenuLinks = mobileMenu.querySelectorAll("a[href^='#']");

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Only close if the menu is actually active
            if (mobileMenu.classList.contains('menu-active')) {
                mobileMenu.classList.remove('menu-active');
                navToggle.classList.remove('active');
            }
            // Allow default anchor behavior to scroll to section
        });
    });
}

// Scrollspy for Navbar Highlight (Keep this one active for now, as it was working)
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

    // Add null checks for robustness, in case these elements don't exist on a page
    if (aiSection && roadmapSection && showBtn && hideBtn) {
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
    }

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

const faqData = [{
        category: "general",
        question: "What is PrepsterAI and how does it work?",
        answer: "PrepsterAI is an AI-powered platform designed specifically for pre-med students. Our AI analyzes your unique profile, academic background, interests, and target medical schools to create a personalized roadmap for your pre-med journey. We provide customized study plans, MCAT strategies, research opportunities, clinical experience recommendations, and application guidance tailored to your specific goals and timeline."
    },
    {
        category: "general",
        question: "Who can benefit from using PrepsterAI?",
        answer: "PrepsterAI is perfect for undergraduate students planning to apply to medical school, gap year students preparing their applications, career changers pursuing medicine, and anyone who wants structured, personalized guidance for their pre-med journey. Whether you're a freshman just starting out or a senior preparing applications, our platform adapts to your current stage and needs."
    },
    {
        category: "features",
        question: "How does the AI create personalized recommendations?",
        answer: "Our AI uses a comprehensive analysis of multiple factors including your academic performance, extracurricular interests, geographic location, target medical schools, available time commitments, and career goals. We combine this with data from successful medical school applicants, AAMC guidelines, and insights from experienced pre-med advisors to generate highly personalized recommendations that evolve as you progress."
    },
    {
        category: "features",
        question: "What makes PrepsterAI different from other pre-med resources?",
        answer: "Unlike generic pre-med advice, PrepsterAI provides hyper-personalized guidance that adapts to your unique situation. We offer real-time progress tracking, location-based opportunities, AI-powered MCAT study plans, and connections to research labs and clinical experiences that match your specific interests. Our platform consolidates everything you need in one place, eliminating the overwhelm of scattered resources."
    },
    {
        category: "mcat",
        question: "How does the MCAT study planner work?",
        answer: "Our AI creates a personalized MCAT study timeline based on your target test date, current knowledge level, study availability, and learning style. The planner includes weekly goals, recommended resources, curated Anki decks, practice test schedules, and adaptive adjustments based on your progress. It integrates with your overall pre-med timeline to ensure optimal preparation without conflicting with other commitments."
    },
    {
        category: "mcat",
        question: "Can PrepsterAI help me choose the best MCAT test date?",
        answer: "Yes! Our AI analyzes your academic schedule, application timeline, target schools' deadlines, and preparation needs to recommend optimal MCAT test dates. We consider factors like when you'll complete prerequisite courses, your availability for intensive study periods, and application cycle timing to help you choose a date that maximizes your chances of success."
    },
    {
        category: "application",
        question: "Does PrepsterAI help with medical school applications?",
        answer: "Absolutely! We provide comprehensive application support including guidance on school selection based on your profile, help with personal statement development, timeline management for primary and secondary applications, interview preparation resources, and strategies for demonstrating your unique value to admissions committees."
    },
    {
        category: "application",
        question: "How does PrepsterAI help me find research opportunities?",
        answer: "Our AI matches you with research opportunities based on your interests, location, academic level, and career goals. We provide information about labs at your institution and nearby research centers, help you craft effective outreach emails to professors, and suggest research experiences that align with your target medical specialties and strengthen your application profile."
    },
    {
        category: "features",
        question: "Can PrepsterAI help me find clinical experiences and shadowing opportunities?",
        answer: "Yes! We help you discover clinical opportunities that match your schedule, interests, and location. This includes hospital volunteer programs, clinical research positions, shadowing opportunities with physicians in your areas of interest, and community health initiatives. Our recommendations are tailored to your availability and designed to provide meaningful experiences that strengthen your application."
    },
    {
        category: "pricing",
        question: "How much does PrepsterAI cost?",
        answer: "We're currently in development and building our waitlist! Pricing details will be announced closer to launch. We're committed to making PrepsterAI accessible to students from all backgrounds and are exploring various pricing models including student discounts and need-based options. Join our waitlist to be the first to know about pricing and early access opportunities."
    },
    {
        category: "pricing",
        question: "Will there be a free trial or free version available?",
        answer: "We're planning to offer a free trial period so you can experience the full power of PrepsterAI before committing. We may also provide some basic features for free to ensure all students have access to essential pre-med guidance. Details about free offerings will be shared with our waitlist members first."
    },
    {
        category: "general",
        question: "When will PrepsterAI be available?",
        answer: "We're working hard to launch PrepsterAI as soon as possible! We're currently in the development and testing phase, refining our AI algorithms and building comprehensive databases of opportunities and resources. Waitlist members will be the first to know about our launch date and will receive early access to the platform."
    },
    {
        category: "features",
        question: "Does PrepsterAI work for students at any college or university?",
        answer: "Yes! PrepsterAI is designed to work for students at any institution. Our AI takes into account your specific school's resources, local opportunities, and regional medical schools. Whether you're at a large research university or a small liberal arts college, we'll help you maximize the opportunities available to you and connect you with external resources when needed."
    },
    {
        category: "application",
        question: "Can PrepsterAI help me choose which medical schools to apply to?",
        answer: "Definitely! Our AI analyzes your academic stats, experiences, personal preferences, geographic preferences, and career goals to recommend medical schools where you'll be competitive. We help you build a balanced school list with reach, target, and safety schools, and provide insights into each school's mission, culture, and what they look for in applicants."
    },
    {
        category: "general",
        question: "How do I join the waitlist?",
        answer: "Simply scroll down to our 'Join the Waitlist' section and fill out the form with your name, email, and current academic year. You'll be added to our priority list and will receive updates about our development progress, launch timeline, and exclusive early access opportunities. Joining the waitlist is completely free and you can unsubscribe at any time."
    }
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const faqContainer = document.getElementById('faqContainer');
const noResults = document.getElementById('noResults');
const categoryFilters = document.querySelectorAll('.category-filter');

let currentCategory = 'all';
let currentSearchTerm = '';

// Initialize FAQ
function initializeFAQ() {
    // Hide no results initially
    hideNoResults();
    renderFAQ();
    setupEventListeners();
}

// Setup Event Listeners
function setupEventListeners() {
    // Search input
    searchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value.toLowerCase();
        renderFAQ();
    });

    // Category filters
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            // Update active filter
            categoryFilters.forEach(f => f.classList.remove('active'));
            e.target.classList.add('active');

            currentCategory = e.target.dataset.category;
            renderFAQ();
        });
    });
}

// Render FAQ Items
function renderFAQ() {
    const filteredData = filterFAQData();

    if (filteredData.length === 0) {
        showNoResults();
        return;
    }

    hideNoResults();

    const faqHTML = filteredData.map((item, index) => {
        const highlightedQuestion = highlightSearchTerm(item.question, currentSearchTerm);
        const highlightedAnswer = highlightSearchTerm(item.answer, currentSearchTerm);

        return `
        <div class="faq-item bg-white rounded-2xl shadow-lg border border-gray-100" data-index="${index}">
            <div class="faq-header p-6 cursor-pointer flex justify-between items-center" onclick="toggleFAQ(${index})">
                <h3 class="text-lg font-semibold text-gray-900 pr-4">${highlightedQuestion}</h3>
                <div class="faq-toggle w-6 h-6 flex items-center justify-center bg-green-100 rounded-full flex-shrink-0">
                    <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                </div>
            </div>
            <div class="faq-content" id="faq-content-${index}">
                <div class="px-6 pb-6">
                    <p class="text-gray-600 leading-relaxed">${highlightedAnswer}</p>
                </div>
            </div>
        </div>
    `;
    }).join('');

    faqContainer.innerHTML = faqHTML;
}

// Filter FAQ Data
function filterFAQData() {
    return faqData.filter(item => {
        const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
        const matchesSearch = currentSearchTerm === '' ||
            item.question.toLowerCase().includes(currentSearchTerm) ||
            item.answer.toLowerCase().includes(currentSearchTerm);

        return matchesCategory && matchesSearch;
    });
}

// Highlight Search Terms
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// Toggle FAQ Item
function toggleFAQ(index) {
    const content = document.getElementById(`faq-content-${index}`);
    const toggle = content.parentNode.querySelector('.faq-toggle');

    // Close all other FAQ items
    const allContents = document.querySelectorAll('.faq-content');
    const allToggles = document.querySelectorAll('.faq-toggle');

    allContents.forEach((item, i) => {
        if (i !== index) {
            item.classList.remove('active');
            allToggles[i].classList.remove('active');
        }
    });

    // Toggle current item
    content.classList.toggle('active');
    toggle.classList.toggle('active');
}

// Show/Hide No Results - Fixed functions
function showNoResults() {
    console.log('Showing no results message');
    faqContainer.innerHTML = '';
    const noResultsEl = document.getElementById('noResults');
    if (noResultsEl) {
        noResultsEl.classList.remove('hidden');
        noResultsEl.style.display = 'block';
        noResultsEl.style.visibility = 'visible';
        noResultsEl.style.opacity = '1';
    }
}

function hideNoResults() {
    noResults.classList.add('hidden');
    noResults.style.display = 'none';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeFAQ);

// Supabase waitlist form submission
const supabase = window.supabase.createClient(
    'https://dldcwmgyffkzslbmddva.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsZGN3bWd5ZmZrenNsYm1kZHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzOTAzODgsImV4cCI6MjA2Mzk2NjM4OH0.dXv57u4pSbWoNioKV45aNpfGMBGS0txZPcWMi3DOLTU'
);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('waitlistForm');
    if (form) {
        form.addEventListener('submit', async(e) => {
            e.preventDefault();
            const full_name = form.elements['full_name'].value;
            const email = form.elements['email'].value;
            const year = form.elements['year'].value;
            const { error } = await supabase
                .from('waitlist')
                .insert([{ full_name, email, year }]);
            if (error) {
                alert('There was an error joining the waitlist. Please try again.');
            } else {
                alert('Thank you for joining the waitlist!');
                form.reset();
            }
        });
    }
});