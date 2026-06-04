// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Form Submission - Use iframe to submit without page redirect
console.log('Script loaded - looking for contact form...');

const contactForm = document.querySelector('.contact-form');
console.log('Contact form found:', contactForm);

if (contactForm) {
    console.log('Setting up form submit listener...');
    contactForm.addEventListener('submit', (e) => {
        console.log('Form submit event triggered!');
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const company = document.getElementById('company').value.trim();
        const message = document.getElementById('message').value.trim();

        console.log('Form data collected:', {name, email, phone, company, message});

        // Validate form
        if (!name || !email || !phone || !message) {
            alert('Please fill in all required fields (marked with *).');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Validate phone
        const cleanedPhone = phone.replace(/\D/g, ''); // remove non-digits
        const phoneRegex = /^\d{10}$/; // exactly 10 digits
        if (!phoneRegex.test(cleanedPhone)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }


        console.log('Validation passed, preparing to submit...');

        // Show sending status
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Create or get hidden iframe
        let iframe = document.getElementById('formFrame');
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'formFrame';
            iframe.name = 'formFrame';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            console.log('Created hidden iframe');
        }

        // Create hidden form
        let hiddenForm = document.getElementById('hiddenForm');
        if (hiddenForm) hiddenForm.remove();

        hiddenForm = document.createElement('form');
        hiddenForm.id = 'hiddenForm';
        hiddenForm.method = 'POST';
        hiddenForm.action = 'https://script.google.com/macros/s/AKfycbzfXcqhn2Qjq-K-Vs3dOq8H1APBzE_t4BhbaXIIKp3cusuo6WLkV-2TM6szOh4X5hAG/exec';
        hiddenForm.target = 'formFrame';
        hiddenForm.style.display = 'none';

        // Add form fields
        const fields = {name, email, phone, company, message};
        Object.keys(fields).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = fields[key];
            hiddenForm.appendChild(input);
        });

        document.body.appendChild(hiddenForm);

        console.log('Submitting form with data:', fields);
        hiddenForm.submit();

        // Show success notification after 800ms
        setTimeout(() => {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #28a745;
                color: white;
                padding: 15px 20px;
                border-radius: 5px;
                z-index: 9999;
                font-weight: bold;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                animation: slideIn 0.5s ease;
            `;
            notification.textContent = '✅ Thank you! Your inquiry has been received.';
            document.body.appendChild(notification);

            // Reset form
            contactForm.reset();

            // Restore button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            console.log('Form submitted and notification shown');

            // Remove notification after 5 seconds
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.5s ease';
                setTimeout(() => notification.remove(), 500);
            }, 5000);
        }, 800);
    });
} else {
    console.error('Contact form not found!');
}

// Create a single style element for animations + active link styling
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
    .nav-link.active {
        color: var(--primary-color);
    }
`;
document.head.appendChild(style);

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe product cards, industry cards, and testimonial cards
document.querySelectorAll('.product-card, .industry-card, .benefit-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Sticky navigation highlighting
window.addEventListener('scroll', () => {
    let current = '';

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Add smooth fade-in for hero content
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'slideInUp 0.8s ease forwards';
    }
});

// Product card click handlers
document.querySelectorAll('.product-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const productName = e.target.parentElement.querySelector('h3').textContent;
        const messageField = document.getElementById('message');
        messageField.value = `I am interested in: ${productName}\n\nPlease provide more information about this product.`;
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                e.target.value = value;
            } else if (value.length <= 6) {
                e.target.value = value.slice(0, 3) + '-' + value.slice(3);
            } else if (value.length <= 10) {
                e.target.value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
            } else {
                e.target.value = '+91-' + value.slice(0, 5) + '-' + value.slice(5, 10);
            }
        }
    });
}

// Log initialization
console.log('Ind Mach Junction Website Loaded Successfully! 🚀');
console.log('Contact Form: Ready for submissions');
console.log('Smooth Scrolling: Enabled');
console.log('Mobile Menu: Active');
