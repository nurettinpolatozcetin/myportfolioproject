import React from "react";
import { useState } from "react";
import "./ContactForm.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_VALUES = {
  name: "",
  email: "",
  message: "",
};

/**
 * Validates a single field's valueq and returns an error message, or an
 * empty string when the value is valid.
 */
function validateField(field, value) {
  const trimmed = value.trim();

  if (field === "name") {
    if (!trimmed) return "Name is required.";
    return "";
  }

  if (field === "email") {
    if (!trimmed) return "Email is required.";
    if (!EMAIL_PATTERN.test(trimmed)) {
      return "Please enter a valid email address.";
    }
    return "";
  }

  if (field === "message") {
    if (!trimmed) return "Message is required.";
    return "";
  }

  return "";
}

function validateAll(values) {
  return {
    name: validateField("name", values.name),
    email: validateField("email", values.email),
    message: validateField("message", values.message),
  };
}

/**
 * Reusable, accessible contact form.
 *
 * onSubmitSuccess(values) is called with the submitted values after
 * client-side validation passes. There is no network call here — the
 * caller can wire one up via onSubmitSuccess if needed.
 */
function ContactForm({ onSubmitSuccess } = {}) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prev) => ({ ...prev, [name]: value }));

    // Re-validate as the user types only once a field has already
    // shown an error, so the error can disappear as soon as it's fixed
    // without flashing errors on the very first keystroke.
    setErrors((prev) => {
      if (!prev[name]) return prev;
      return { ...prev, [name]: validateField(name, value) };
    });

    if (submitted) setSubmitted(false);
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateAll(values);
    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) {
      setSubmitted(false);
      return;
    }

    onSubmitSuccess?.({
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    });

    setValues(INITIAL_VALUES);
    setErrors({});
    setSubmitted(true);
  };

  return (
    <form
      className="contact-form"
      noValidate
      onSubmit={handleSubmit}
      aria-label="Contact form"
    >
      <div className="contact-form__field">
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-required="true"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errors.name && (
          <p
            className="contact-form__error"
            id="contact-name-error"
            role="alert"
          >
            {errors.name}
          </p>
        )}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-required="true"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {errors.email && (
          <p
            className="contact-form__error"
            id="contact-email-error"
            role="alert"
          >
            {errors.email}
          </p>
        )}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
        />
        {errors.message && (
          <p
            className="contact-form__error"
            id="contact-message-error"
            role="alert"
          >
            {errors.message}
          </p>
        )}
      </div>

      <button type="submit" className="contact-form__submit">
        Send message
      </button>

      {submitted && (
        <p className="contact-form__success" role="status">
          Thanks! Your message has been sent.
        </p>
      )}
    </form>
  );
}

export default ContactForm;
