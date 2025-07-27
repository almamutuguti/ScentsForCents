(function () {
    emailjs.init("XIYJYRSNGhi7SPFTX");
})();

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const statusMessage = document.getElementById('statusMessage')
    
    const form = this;
    emailjs.sendForm('service_06t4jsu', "template_il7bwee", this) //service id and template id
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);

            const firstName = form.elements['firstName'].value;
            const lastName = form.elements['lastName'].value;
            form.reset();

            statusMessage.textContent = `Thank you ${firstName} ${lastName} for contacting us. We will get back to you soon`;
            statusMessage.style.color = 'green';

            setTimeout(() => {
                statusMessage.textContent = '';
            }, 2000);
        }, function (error) {
            console.error('FAILED...', error)

            statusMessage.textContent = 'Failed to send message. Please Try again';
            statusMessage.style.color = 'red';

            setTimeout(() => {
                statusMessage.textContent = '';
            }, 2000);
        })
})