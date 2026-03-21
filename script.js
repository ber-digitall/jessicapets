document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Testimonials Slider
    const slider = document.getElementById('testimonialsSlider');
    const dots = document.querySelectorAll('.slider-dot');
    let currentIndex = 0;
    const testimonialCount = document.querySelectorAll('.testimonial-card').length;

    function updateSlider() {
        if (slider) {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.getAttribute('data-index'));
            updateSlider();
        });
    });

    // Auto slide
    let slideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonialCount;
        updateSlider();
    }, 5000);

    // Pause slider on hover
    const sliderContainer = document.querySelector('.testimonials-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonialCount;
                updateSlider();
            }, 5000);
        });
    }

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const targetId = href;
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission - Envio para WhatsApp
    const contactForm = document.getElementById('contactForm');
    const phoneNumber = '5511986386054';

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            let whatsappMessage = `*Agradecemos por você ter nos deixado uma mensagem. Logo iremos retornar este contato. Atenciosamente, Jessica Pets.*%0A%0A`;
            whatsappMessage += `*Nome:* ${name}%0A`;
            whatsappMessage += `*E-mail:* ${email}%0A`;

            if (phone) {
                whatsappMessage += `*Telefone:* ${phone}%0A`;
            }

            whatsappMessage += `*Assunto:* ${subject}%0A%0A`;
            whatsappMessage += `*Mensagem:*%0A${message}`;

            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            observer.observe(img);
        });
    }
});

const logoSrc = "jessica_pets_favicon_210326.png";

const sizes = [16, 32, 48, 64, 180];

const generateFavicons = () => {
    const img = new Image();
    img.src = logoSrc;

    img.onload = () => {
        sizes.forEach(size => {
            const canvas = document.createElement("canvas");
            canvas.width = size;
            canvas.height = size;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, size, size);

            const link = document.createElement("a");
            link.download = `favicon-${size}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        });

        // manifest
        const manifest = {
            name: "Jessica Pet's",
            short_name: "Pet's",
            icons: sizes.map(size => ({
                src: `favicon-${size}.png`,
                sizes: `${size}x${size}`,
                type: "image/png"
            })),
            theme_color: "#b94754",
            background_color: "#ffe8d8",
            display: "standalone"
        };

        const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "site.webmanifest";
        a.click();
    };
};

generateFavicons();