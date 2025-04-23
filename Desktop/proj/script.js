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