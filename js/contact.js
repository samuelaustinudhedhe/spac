/* =========================================================
   Contact form validation:
   - no field left empty
   - email must match a valid email pattern
   - phone must contain digits only
   ========================================================= */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\d+$/;

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    message: document.getElementById('message'),
  };
  const status = document.getElementById('form-status');

  contactForm.addEventListener('submit', event => {
    event.preventDefault();

    const errors = validate(fields);
    showErrors(errors);

    if (Object.keys(errors).length === 0) {
      showStatus('success', `Thanks, ${fields.name.value.trim()}! Your message has been received.`);
      contactForm.reset();
    } else {
      showStatus('error', 'Please fix the highlighted fields and try again.');
    }
  });
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
