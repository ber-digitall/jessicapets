document.addEventListener('DOMContentLoaded', function() {
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

    let slideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonialCount;
        updateSlider();
    }, 5000);

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

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    const phoneNumber = '5511986386054';

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
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
});