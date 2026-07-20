/* =========================================================
   Contact form:
   - client-side validation (no empty fields, valid email, digits-only phone)
   - submits to Web3Forms (https://web3forms.com), which relays the
     message to Samuel's inbox — this is a static site with no
     backend, so a drop-in form-to-email service does the actual
     delivery. The access key below is safe to expose client-side by
     design (scoped to this form, rate-limited by Web3Forms), unlike
     a real SMTP credential.
   ========================================================= */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\d+$/;
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = '0ba30a50-f6a6-4271-a882-13e88966ec22';

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    message: document.getElementById('message'),
  };
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener('submit', async event => {
    event.preventDefault();

    const errors = validate(fields);
    showErrors(errors);

    if (Object.keys(errors).length > 0) {
      showStatus('error', 'Please fix the highlighted fields and try again.');
      return;
    }

    if (WEB3FORMS_ACCESS_KEY === '{{WEB3FORMS_ACCESS_KEY}}') {
      showStatus('error', 'Contact form isn\'t configured yet — email s.austin9897@miva.edu.ng directly for now.');
      return;
    }

    setSubmitting(true);

    try {
      // FormData avoids a CORS preflight (unlike a JSON body), matching
      // Web3Forms' own recommended AJAX submission pattern.
      const formData = new FormData();
      formData.append('access_key', WEB3FORMS_ACCESS_KEY);
      formData.append('subject', `New message from ${fields.name.value.trim()} via the portfolio site`);
      formData.append('name', fields.name.value.trim());
      formData.append('email', fields.email.value.trim());
      formData.append('phone', fields.phone.value.trim());
      formData.append('message', fields.message.value.trim());

      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        showStatus('success', `Thanks, ${fields.name.value.trim()}! Your message has been sent.`);
        contactForm.reset();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch {
      showStatus('error', 'Something went wrong sending your message. Please try again, or email s.austin9897@miva.edu.ng directly.');
    } finally {
      setSubmitting(false);
    }
  });

  function setSubmitting(isSubmitting) {
    submitBtn.disabled = isSubmitting;
    submitBtn.textContent = isSubmitting ? 'Sending…' : 'Send Message';
  }
}

function validate({ name, email, phone, message }) {
  const errors = {};

  if (!name.value.trim()) errors.name = 'Name is required.';

  if (!email.value.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(email.value.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!phone.value.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!PHONE_PATTERN.test(phone.value.trim())) {
    errors.phone = 'Phone number must contain digits only.';
  }

  if (!message.value.trim()) errors.message = 'Message cannot be empty.';

  return errors;
}

function showErrors(errors) {
  ['name', 'email', 'phone', 'message'].forEach(key => {
    const fieldWrapper = document.getElementById(`field-${key}`);
    const errorEl = document.getElementById(`error-${key}`);
    if (errors[key]) {
      fieldWrapper.classList.add('error');
      errorEl.textContent = errors[key];
    } else {
      fieldWrapper.classList.remove('error');
      errorEl.textContent = '';
    }
  });
}

function showStatus(type, text) {
  const status = document.getElementById('form-status');
  status.textContent = text;
  status.className = `form-status show ${type}`;
}
