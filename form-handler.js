// Simple form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    
    if (!form) {
        console.error('Form not found');
        return;
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const company = document.getElementById('company').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (!name || !email || !phone || !message) {
            alert('Please fill all required fields');
            return;
        }
        
        // Show loading
        const btn = form.querySelector('.submit-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;
        
        // Build form data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('company', company || '');
        formData.append('message', message);
        
        // Submit
        fetch('https://script.google.com/macros/s/AKfycbzfXcqhn2Qjq-K-Vs3dOq8H1APBzE_t4BhbaXIIKp3cusuo6WLkV-2TM6szOh4X5hAG/exec', {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        })
        .then(() => {
            // Success
            form.reset();
            
            // Show notification
            const notif = document.createElement('div');
            notif.style.cssText = 'position:fixed;top:20px;right:20px;background:#28a745;color:white;padding:15px 20px;border-radius:5px;z-index:9999;font-weight:bold;box-shadow:0 4px 6px rgba(0,0,0,0.1)';
            notif.textContent = '✅ Thank you! Your inquiry has been received.';
            document.body.appendChild(notif);
            
            btn.textContent = originalText;
            btn.disabled = false;
            
            setTimeout(() => notif.remove(), 5000);
        })
        .catch(err => {
            console.error('Error:', err);
            alert('Error submitting form');
            btn.textContent = originalText;
            btn.disabled = false;
        });
    });
});
