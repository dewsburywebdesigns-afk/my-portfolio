document.addEventListener("DOMContentLoaded", () => {

    // 1. DYNAMIC TYPING EFFECT
    const typingElement = document.querySelector(".typing-text");
    const phrases = ["Digital Experiences.", "Scalable Platforms.", "High-Converting UI/UX."];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            speed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 400;
        }

        setTimeout(typeLoop, speed);
    }
    typeLoop();

    // 2. SCROLL REVEAL OBSERVER
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach((el) => revealObserver.observe(el));

    // 3. THEME TOGGLE (DARK / LIGHT)
    const themeBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const body = document.body;

    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "light") {
        body.classList.add("light-theme");
        themeIcon.innerHTML = "&#9790;";
    }

    themeBtn.addEventListener("click", () => {
        body.classList.toggle("light-theme");
        const isLight = body.classList.contains("light-theme");
        themeIcon.innerHTML = isLight ? "&#9790;" : "&#9788;";
        localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
    });

    // 4. MOBILE NAVBAR TOGGLE
    const mobileToggle = document.getElementById("mobile-toggle");
    const navMenu = document.getElementById("nav-menu");

    mobileToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => navMenu.classList.remove("active"));
    });

    // 5. ENHANCED CANVAS PARTICLES ANIMATION
    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.6 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = `rgba(56, 189, 248, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 45; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Current Year Update
    document.getElementById("year").innerText = new Date().getFullYear();

    // 6. FORMSPREE AJAX SUBMISSION HANDLER
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");

    if (contactForm) {
        contactForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            submitBtn.disabled = true;
            submitBtn.innerText = "Sending...";
            formStatus.style.color = "var(--accent-blue)";
            formStatus.innerText = "Submitting your message...";

            const formData = new FormData(contactForm);

            try {
                const response = await fetch("https://formspree.io/f/mzezvgrn", {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.style.color = "#10b981";
                    formStatus.innerText = "Thank you! Your message has been sent successfully to samuelsonelias125@gmail.com.";
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.style.color = "#ef4444";
                        formStatus.innerText = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.style.color = "#ef4444";
                        formStatus.innerText = "Oops! There was a problem submitting your form.";
                    }
                }
            } catch (error) {
                formStatus.style.color = "#ef4444";
                formStatus.innerText = "Connection error. Please check your network and try again.";
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = "Send Inquiry";
            }
        });
    }
});

// 7. EXPANDED MODAL CASE STUDY ENGINE (MULTIPLE IMAGES + DEEP BRAND STORIES)
const demoData = {
    jewelry: `
        <div class="demo-window">
            <div class="modal-gallery-grid">
                <div class="modal-img-container featured">
                    <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80" alt="Aurelia Fine Jewelry Main Banner">
                </div>
                <div class="modal-img-container">
                    <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80" alt="Diamond Ring Collection Detail">
                </div>
                <div class="modal-img-container">
                    <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80" alt="Gold Craftsmanship Showcase">
                </div>
            </div>
            <div class="demo-details-box">
                <h3>Aurelia Fine Jewelry</h3>
                <p><strong>Brand Story:</strong> Aurelia was crafted for a boutique luxury brand seeking to translate high-end brick-and-mortar elegance into a digital ecommerce showcase. The interface highlights artisan craftsmanship using dark, regal gold accents, ultra-responsive grid layouts, and high-definition macro imagery.</p>
                <p><strong>Design Philosophy:</strong> Focuses on minimal friction, allowing customer focus to remain purely on piece radiance, carat specifications, and custom consultation booking.</p>
                
                <h4 class="modal-section-title">Key Architectural Features</h4>
                <div class="feature-highlights">
                    <span class="feature-tag">✨ High-Res Macro Product Galleries</span>
                    <span class="feature-tag">✨ Interactive Ring Size Estimator</span>
                    <span class="feature-tag">✨ VIP Private Fitting Scheduler</span>
                    <span class="feature-tag">✨ Gold & Diamond Authenticity Badging</span>
                </div>
            </div>
        </div>
    `,
    realestate: `
        <div class="demo-window">
            <div class="modal-gallery-grid">
                <div class="modal-img-container featured">
                    <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" alt="Lumina Luxury Estates">
                </div>
                <div class="modal-img-container">
                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" alt="Villa Interior Architecture">
                </div>
                <div class="modal-img-container">
                    <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" alt="Luxury Pool Terrace View">
                </div>
            </div>
            <div class="demo-details-box">
                <h3>Lumina Luxury Estates</h3>
                <p><strong>Brand Story:</strong> Lumina Estates provides premier architectural listings to international high-net-worth buyers. Built with an ultra-clean glassmorphic UI, it presents sprawling estate photography alongside key metric breakdowns like acreage, interior square footage, and neighborhood ratings.</p>
                <p><strong>Design Philosophy:</strong> Light, airy aesthetic paired with instant client filtering engines to make property discovery effortless on mobile and desktop devices alike.</p>
                
                <h4 class="modal-section-title">Key Architectural Features</h4>
                <div class="feature-highlights">
                    <span class="feature-tag">🏛️ Dynamic Property Range Filtering</span>
                    <span class="feature-tag">🏛️ Lightbox Interior Photography</span>
                    <span class="feature-tag">🏛️ Interactive Floorplan Viewers</span>
                    <span class="feature-tag">🏛️ Direct Private Tour Request System</span>
                </div>
            </div>
        </div>
    `,
    health: `
        <div class="demo-window">
            <div class="modal-gallery-grid">
                <div class="modal-img-container featured">
                    <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80" alt="Aura Health Clinic Reception">
                </div>
                <div class="modal-img-container">
                    <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80" alt="Doctor Consultation Room">
                </div>
                <div class="modal-img-container">
                    <img src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80" alt="Medical Diagnostics Technology">
                </div>
            </div>
            <div class="demo-details-box">
                <h3>Aura Health Clinic</h3>
                <p><strong>Brand Story:</strong> Aura Clinic addresses patient friction when scheduling specialized medical appointments online. Designed with welcoming calm gradients, clean typography, and reassuring practitioner bio cards, this interface ensures patients feel at ease from first click.</p>
                <p><strong>Design Philosophy:</strong> Prioritizes user trust, accessibility standard compliance, and instant schedule lookup.</p>
                
                <h4 class="modal-section-title">Key Architectural Features</h4>
                <div class="feature-highlights">
                    <span class="feature-tag">🩺 Real-Time Doctor Availability</span>
                    <span class="feature-tag">🩺 Specialized Treatment Catalogs</span>
                    <span class="feature-tag">🩺 Secure Patient Intake Form Layout</span>
                    <span class="feature-tag">🩺 Mobile-Optimized Location Finder</span>
                </div>
            </div>
        </div>
    `,
    gaming: `
        <div class="demo-window">
            <div class="modal-gallery-grid">
                <div class="modal-img-container featured">
                    <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80" alt="CyberGear Esports Gaming Setup">
                </div>
                <div class="modal-img-container">
                    <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80" alt="Mechanical Keyboard & RGB Mouse">
                </div>
                <div class="modal-img-container">
                    <img src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80" alt="High Performance Custom Rig">
                </div>
            </div>
            <div class="demo-details-box">
                <h3>CyberGear Devices</h3>
                <p><strong>Brand Story:</strong> CyberGear was designed to serve hardware enthusiasts and competitive esports players seeking peak performance gear. Combining electric neon accents with dark slate textures, the site communicates raw power, low latency, and high refresh hardware excellence.</p>
                <p><strong>Design Philosophy:</strong> High visual impact paired with detailed interactive spec sheets so gamers can customize rigs to their exact performance needs.</p>
                
                <h4 class="modal-section-title">Key Architectural Features</h4>
                <div class="feature-highlights">
                    <span class="feature-tag">🎮 Interactive Custom PC Builder UI</span>
                    <span class="feature-tag">🎮 FPS Benchmark Comparators</span>
                    <span class="feature-tag">🎮 RGB Profile Preview Animations</span>
                    <span class="feature-tag">🎮 One-Click Hardware Bundle Add</span>
                </div>
            </div>
        </div>
    `
};

function openDemo(key) {
    const modal = document.getElementById("demo-modal");
    const body = document.getElementById("modal-body");
    body.innerHTML = demoData[key];
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("active"), 10);
}

function closeDemo() {
    const modal = document.getElementById("demo-modal");
    modal.classList.remove("active");
    setTimeout(() => { modal.style.display = "none"; }, 300);
}
