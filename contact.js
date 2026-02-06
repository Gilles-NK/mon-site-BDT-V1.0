// Contact Form Handling with Mailto and WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const nom = document.getElementById('nom').value.trim();
            const email = document.getElementById('email').value.trim();
            const telephone = document.getElementById('telephone').value.trim();
            const sujet = document.getElementById('sujet').value;
            const message = document.getElementById('message').value.trim();

            // Validate form
            if (!nom || !email || !sujet || !message) {
                showMessage('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Veuillez entrer une adresse e-mail valide.', 'error');
                return;
            }

            const formData = {
                nom: nom,
                email: email,
                telephone: telephone,
                sujet: sujet,
                message: message
            };

            // Ask user to choose sending method
            showSendMethodChoice(formData);
        });
    }

    function showSendMethodChoice(formData) {
        // Create custom modal for better UX
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;

        modal.innerHTML = `
            <div style="
                background: white;
                padding: 2.5rem;
                border-radius: 12px;
                max-width: 500px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                text-align: center;
            ">
                <h3 style="
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 1.8rem;
                    color: #1a1a2e;
                    margin-bottom: 1rem;
                ">Comment souhaitez-vous envoyer votre message ?</h3>
                
                <p style="
                    color: #666;
                    margin-bottom: 2rem;
                    font-size: 1rem;
                ">Choisissez votre méthode d'envoi préférée</p>
                
                <div style="display: flex; gap: 1rem; flex-direction: column;">
                    <button id="btnEmail" style="
                        background: linear-gradient(135deg, #0066cc, #00a3e0);
                        color: white;
                        padding: 1.2rem 2rem;
                        border: none;
                        border-radius: 8px;
                        font-size: 1.1rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: transform 0.2s;
                    ">
                        📧 Envoyer par Email
                    </button>
                    
                    <button id="btnWhatsApp" style="
                        background: #25D366;
                        color: white;
                        padding: 1.2rem 2rem;
                        border: none;
                        border-radius: 8px;
                        font-size: 1.1rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: transform 0.2s;
                    ">
                        💬 Envoyer par WhatsApp
                    </button>
                    
                    <button id="btnCancel" style="
                        background: transparent;
                        color: #666;
                        padding: 0.8rem;
                        border: none;
                        font-size: 0.95rem;
                        cursor: pointer;
                    ">
                        Annuler
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add hover effects
        const buttons = modal.querySelectorAll('button');
        buttons.forEach(btn => {
            if (btn.id !== 'btnCancel') {
                btn.addEventListener('mouseenter', () => btn.style.transform = 'translateY(-3px)');
                btn.addEventListener('mouseleave', () => btn.style.transform = 'translateY(0)');
            }
        });

        // Event listeners
        modal.querySelector('#btnEmail').addEventListener('click', () => {
            document.body.removeChild(modal);
            sendViaEmail(formData);
        });

        modal.querySelector('#btnWhatsApp').addEventListener('click', () => {
            document.body.removeChild(modal);
            sendViaWhatsApp(formData);
        });

        modal.querySelector('#btnCancel').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    function sendViaWhatsApp(data) {
        // Format message for WhatsApp
        const whatsappMessage = 
            `*NOUVEAU MESSAGE - BDT*\n\n` +
            `*Nom:* ${data.nom}\n` +
            `*Email:* ${data.email}\n` +
            `*Téléphone:* ${data.telephone || 'Non fourni'}\n` +
            `*Sujet:* ${data.sujet}\n\n` +
            `*Message:*\n${data.message}`;
        
        // WhatsApp Business number
        const whatsappNumber = '237689665893';
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Show confirmation
        showMessage('✅ Redirection vers WhatsApp... Votre message va s\'ouvrir dans WhatsApp.', 'success');
        
        // Open WhatsApp after 1 second
        setTimeout(() => {
            window.open(whatsappURL, '_blank');
            
            // Reset form after 2 seconds
            setTimeout(() => {
                contactForm.reset();
                showMessage('💬 Message WhatsApp ouvert ! Cliquez sur Envoyer dans WhatsApp pour finaliser.', 'success');
            }, 2000);
        }, 1000);
    }

    function sendViaEmail(formData) {
        // Prepare email content
        const emailSubject = `${formData.sujet} - ${formData.nom}`;
        
        const emailBody = formatEmailBody(formData);
        
        // Create mailto link
        const mailtoLink = `mailto:gillesngomkap@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Show confirmation message
        showMessage('✅ Ouverture de votre client email... Votre message est prêt à être envoyé.', 'success');
        
        // Open email client
        setTimeout(() => {
            window.location.href = mailtoLink;
            
            // Show additional message
            setTimeout(() => {
                showMessage('📧 Email ouvert ! Vérifiez le contenu et cliquez sur Envoyer dans votre client email.', 'success');
            }, 1500);
        }, 500);
    }

    function formatEmailBody(data) {
        let body = `NOUVEAU MESSAGE - BDT\n`;
        body += `${'='.repeat(60)}\n\n`;
        
        body += `INFORMATIONS DE CONTACT\n`;
        body += `${'-'.repeat(60)}\n`;
        body += `Nom : ${data.nom}\n`;
        body += `Email : ${data.email}\n`;
        body += `Téléphone : ${data.telephone || 'Non fourni'}\n`;
        body += `Sujet : ${data.sujet}\n\n`;
        
        body += `MESSAGE\n`;
        body += `${'-'.repeat(60)}\n`;
        body += `${data.message}\n\n`;
        
        body += `${'='.repeat(60)}\n`;
        body += `Email envoyé depuis le formulaire de contact BDT\n`;
        body += `Site web : www.brondigitaltech.com\n`;
        
        return body;
    }

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';

        // Auto-hide message after 8 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 8000);

        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Real-time validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '';
            }
        });
    }

    // Phone number formatting
    const phoneInput = document.getElementById('telephone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            // Format: +237 6XX XX XX XX
            if (value.length > 0) {
                if (!value.startsWith('237')) {
                    value = '237' + value;
                }
            }
            e.target.value = value ? '+' + value : '';
        });
    }
});