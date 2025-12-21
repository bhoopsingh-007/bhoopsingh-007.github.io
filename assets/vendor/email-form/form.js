(function () {
  "use strict";

  // 🔹 Initialize EmailJS
  emailjs.init("-PFYQY_txen1S4UC3"); // 🔴 replace with EmailJS public key

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      // UI elements
      let loading = form.querySelector('.loading');
      let errorMessage = form.querySelector('.error-message');
      let sentMessage = form.querySelector('.sent-message');
      let submitBtn = form.querySelector('button[type="submit"]');

      loading.classList.add('d-block');
      errorMessage.classList.remove('d-block');
      sentMessage.classList.remove('d-block');
      submitBtn.disabled = true;

      // Collect form data
      let templateParams = {
        name: form.querySelector('input[name="name"]').value,
        email: form.querySelector('input[name="email"]').value,
        title: form.querySelector('input[name="subject"]').value,
        message: form.querySelector('textarea[name="message"]').value,
        time: new Date().toLocaleString()
      };

      // 🔹 Send email using EmailJS
      emailjs.send("service_b5k080v", "template_vvhk82h", templateParams).then(function (response) {
          loading.classList.remove('d-block');
          sentMessage.classList.add('d-block');
          submitBtn.disabled = false;
          form.reset();
          console.log("SUCCESS!", response.status, response.text);
      },function (error) {
          loading.classList.remove('d-block');
          errorMessage.innerHTML = "Failed to send message. Please try again.";
          errorMessage.classList.add('d-block');
          submitBtn.disabled = false;
          console.error("FAILED...", error);
      });
    });
  });

})();