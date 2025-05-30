"use strict";
// State Management
class AppState {
    constructor() {
        this.userProfile = null;
        this.roadmapSteps = [];
    }
    static getInstance() {
        if (!AppState.instance) {
            AppState.instance = new AppState();
        }
        return AppState.instance;
    }
    setUserProfile(profile) {
        this.userProfile = profile;
        this.updateUI();
    }
    setRoadmapSteps(steps) {
        this.roadmapSteps = steps;
        this.updateUI();
    }
    getRoadmapSteps() {
        return this.roadmapSteps;
    }
    updateUI() {
        // Update UI elements based on state changes
        this.updateProfileSection();
        this.updateRoadmapSection();
    }
    updateProfileSection() {
        if (!this.userProfile)
            return;
        const profileSection = document.querySelector('.profile-section');
        if (profileSection) {
            // Update profile UI
            const nameElement = profileSection.querySelector('.profile-name');
            if (nameElement) {
                nameElement.textContent = this.userProfile.name;
            }
        }
    }
    updateRoadmapSection() {
        const roadmapSection = document.querySelector('.roadmap-section');
        if (roadmapSection) {
            // Update roadmap UI
            const stepsList = roadmapSection.querySelector('.roadmap-steps');
            if (stepsList) {
                stepsList.innerHTML = this.roadmapSteps
                    .map(step => `
                        <li class="roadmap-step ${step.status}">
                            <h3>${step.title}</h3>
                            <p>${step.details}</p>
                        </li>
                    `)
                    .join('');
            }
        }
    }
}
// UI Components
class UIComponents {
    static initializeModals() {
        const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                const target = e.currentTarget.dataset.modalTarget;
                if (target) {
                    this.openModal(target);
                }
            });
        });
    }
    static openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    }
    static closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }
}
// Animation Components
class AnimationComponents {
    static initializeCanvas() {
        const canvas = document.getElementById('medicalCanvas');
        if (!canvas)
            return;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        // Initialize Three.js scene
        this.setupThreeJS(canvas);
    }
    static setupThreeJS(canvas) {
        // Three.js setup code
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas });
        // Add some basic geometry
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        camera.position.z = 5;
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();
    }
}
// Form Handling
class FormHandlers {
    static initializeForms() {
        const waitlistForm = document.getElementById('waitlistForm');
        if (waitlistForm) {
            waitlistForm.addEventListener('submit', this.handleWaitlistSubmit);
        }
    }
    static async handleWaitlistSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        try {
            // Handle form submission
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                UIComponents.closeModal('waitlist-modal');
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for joining the waitlist!';
                document.body.appendChild(successMessage);
                setTimeout(() => successMessage.remove(), 3000);
            }
        }
        catch (error) {
            console.error('Form submission error:', error);
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'An error occurred. Please try again.';
            document.body.appendChild(errorMessage);
            setTimeout(() => errorMessage.remove(), 3000);
        }
    }
}
// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize state
    const appState = AppState.getInstance();
    // Set initial state
    appState.setUserProfile({
        name: 'John Doe',
        year: 'Sophomore',
        location: 'New York',
        interests: ['Cardiology', 'Neuroscience'],
        targetSchools: ['Harvard Medical School', 'Johns Hopkins School of Medicine']
    });
    appState.setRoadmapSteps([
        {
            title: 'MCAT Preparation',
            status: 'in-progress',
            details: 'Complete practice tests and review weak areas'
        },
        {
            title: 'Clinical Experience',
            status: 'upcoming',
            details: 'Shadow physicians and gain hands-on experience'
        }
    ]);
    // Initialize UI components
    UIComponents.initializeModals();
    // Initialize animations
    AnimationComponents.initializeCanvas();
    // Initialize form handlers
    FormHandlers.initializeForms();
});
//# sourceMappingURL=script.js.map