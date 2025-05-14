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

    loginToggle.addEventListener("click", () => {
        isVisible = !isVisible;
        loginForm.classList.toggle("hidden", !isVisible);
        loginForm.classList.toggle("opacity-0", !isVisible);
        loginForm.classList.toggle("translate-x-10", !isVisible);
        loginForm.classList.toggle("opacity-100", isVisible);
        loginForm.classList.toggle("translate-x-0", isVisible);
    });

    loginClose.addEventListener("click", () => {
        isVisible = false;
        loginForm.classList.add("hidden");
        loginForm.classList.add("opacity-0");
        loginForm.classList.add("translate-x-10");
        loginForm.classList.remove("opacity-100");
        loginForm.classList.remove("translate-x-0");
    });

    toggleBtn.addEventListener("click", () => {
        isSignup = !isSignup;
        formTitle.textContent = isSignup ? "Sign Up" : "Sign In";
        toggleBtn.textContent = isSignup ? "Login" : "Sign Up";
        togglePrompt.textContent = isSignup ?
            "Already have an account?" :
            "Don't have an account?";
        formSlider.style.transform = isSignup ? "translateX(-100%)" : "translateX(0)";
    });
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