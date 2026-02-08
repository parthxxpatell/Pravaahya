// Form submission handler for contact and partner forms

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
console.log('Form handler loaded. Contact form:', contactForm);
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Contact form submitted!');

        const formData = {
            name: contactForm.querySelector('[name="name"]').value,
            email: contactForm.querySelector('[name="email"]').value,
            subject: contactForm.querySelector('[name="subject"]').value,
            inquiry_type: contactForm.querySelector('[name="inquiry_type"]').value,
            message: contactForm.querySelector('[name="message"]').value
        };

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        console.log('Sending to backend:', formData);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log('Response status:', response.status);
            const result = await response.json();
            console.log('Response data:', result);

            if (result.success) {
                alert('✅ Message sent successfully! We\'ll get back to you within 24 hours.');
                contactForm.reset();
            } else {
                alert('❌ Failed to send message. Please try again or email us directly at pravaahya@gmail.com');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Network error. Please check your connection or email us directly at pravaahya@gmail.com');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Partner Form Handler
const partnerForm = document.getElementById('partnerForm');
if (partnerForm) {
    partnerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            business_name: partnerForm.querySelector('[name="business_name"]').value,
            contact_person: partnerForm.querySelector('[name="contact_person"]').value,
            email: partnerForm.querySelector('[name="email"]').value,
            phone: partnerForm.querySelector('[name="phone"]').value,
            business_type: partnerForm.querySelector('[name="business_type"]').value,
            location: partnerForm.querySelector('[name="location"]').value,
            details: partnerForm.querySelector('[name="details"]').value
        };

        const submitBtn = partnerForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('/api/partner', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                alert('✅ Partnership inquiry sent! Our team will contact you within 24 hours.');
                partnerForm.reset();
            } else {
                alert('❌ Failed to send inquiry. Please try again or email us directly at pravaahya@gmail.com');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Network error. Please check your connection or email us directly at pravaahya@gmail.com');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Team Form Handler
const teamForm = document.getElementById('teamForm');
if (teamForm) {
    teamForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: teamForm.querySelector('[name="name"]').value,
            email: teamForm.querySelector('[name="email"]').value,
            phone: teamForm.querySelector('[name="phone"]').value,
            role: teamForm.querySelector('[name="role"]').value,
            portfolio: teamForm.querySelector('[name="portfolio"]').value,
            skills: teamForm.querySelector('[name="skills"]').value,
            motivation: teamForm.querySelector('[name="motivation"]').value
        };

        const submitBtn = teamForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('/api/team', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                alert('✅ Application submitted! We\'ll review your application and get back to you soon.');
                teamForm.reset();
            } else {
                alert('❌ Failed to submit application. Please try again or email us directly at pravaahya@gmail.com');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Network error. Please check your connection or email us directly at pravaahya@gmail.com');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}
