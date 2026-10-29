(() => {
  "use strict";

  const form = document.getElementById("application-form");
  if (!form) return;

  const status = document.getElementById("form-status");
  const errorSummary = document.getElementById("form-error-summary");
  const errorList = document.getElementById("form-error-list");
  const fields = Array.from(form.querySelectorAll(".form-control, input[type='checkbox'][required]"));
  let touchedFields = new WeakSet();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const messages = {
    fullName: {
      valueMissing: "Enter your full name.",
      tooShort: "Your name must be at least 2 characters long.",
      tooLong: "Your name must be no more than 100 characters.",
      custom: "Enter a name using at least two letters.",
    },
    email: {
      valueMissing: "Enter your email address.",
      typeMismatch: "Enter an email address in a valid format, such as name@example.com.",
      tooLong: "Your email address must be no more than 254 characters.",
      patternMismatch: "Check the email address format and try again.",
    },
    role: { valueMissing: "Choose the area of work that interests you." },
    demoAcknowledgement: { valueMissing: "Confirm that you understand this is a demo form." },
  };

  const fieldLabels = {
    fullName: "Full name",
    email: "Email address",
    role: "Area of interest",
    demoAcknowledgement: "Demo acknowledgement",
  };

  function customError(field) {
    const value = field.value.trim();
    if (field.name === "fullName" && value && !/[\p{L}]/u.test(value)) {
      return messages.fullName.custom;
    }
    if (field.name === "fullName" && !value) {
      return messages.fullName.valueMissing;
    }
    if (field.name === "email" && value && !emailPattern.test(value)) {
      return messages.email.typeMismatch;
    }
    return "";
  }

  function getError(field) {
    if (field.name === "demoAcknowledgement") {
      return field.checked ? "" : messages.demoAcknowledgement.valueMissing;
    }

    const custom = customError(field);
    if (custom) return custom;

    if (field.validity.valueMissing) return messages[field.name]?.valueMissing || "Complete this required field.";
    if (field.validity.typeMismatch) return messages[field.name]?.typeMismatch || "Enter a value in the requested format.";
    if (field.validity.tooShort) return messages[field.name]?.tooShort || `Enter at least ${field.minLength} characters.`;
    if (field.validity.tooLong) return messages[field.name]?.tooLong || `Enter no more than ${field.maxLength} characters.`;
    if (field.validity.badInput) return messages[field.name]?.badInput || "Enter a valid value.";
    if (field.validity.rangeUnderflow) return messages[field.name]?.rangeUnderflow || `Enter a value of ${field.min} or more.`;
    if (field.validity.rangeOverflow) return messages[field.name]?.rangeOverflow || `Enter a value of ${field.max} or less.`;
    if (field.validity.stepMismatch) return messages[field.name]?.stepMismatch || "Enter a valid increment for this field.";
    if (field.validity.patternMismatch) return messages[field.name]?.patternMismatch || "Check the value format and try again.";
    return "";
  }

  function renderField(field, showWhenUntouched = false) {
    const error = getError(field);
    const shouldShow = Boolean(error) && (touchedFields.has(field) || showWhenUntouched);
    const errorElement = document.getElementById(`${field.id}-error`);

    field.setAttribute("aria-invalid", shouldShow ? "true" : "false");
    field.classList.toggle("border-red-600", shouldShow);
    field.classList.toggle("bg-red-50", shouldShow);
    field.classList.toggle("focus:border-red-700", shouldShow);

    if (errorElement) {
      errorElement.textContent = shouldShow ? error : "";
      errorElement.classList.toggle("hidden", !shouldShow);
    }

    return shouldShow ? error : "";
  }

  function hideStatus() {
    status.textContent = "";
    status.className = "hidden rounded-2xl border px-4 py-4 text-sm font-semibold";
  }

  function hideErrorSummary() {
    errorSummary.classList.add("hidden");
    errorList.replaceChildren();
  }

  function showErrors(errors) {
    errorList.replaceChildren();
    for (const error of errors) {
      const item = document.createElement("li");
      item.textContent = `${fieldLabels[error.field.name] || "Field"}: ${error.message}`;
      errorList.append(item);
    }
    errorSummary.classList.remove("hidden");
    errorSummary.focus();
  }

  function clearFieldState() {
    touchedFields = new WeakSet();
    fields.forEach((field) => {
      if (field.type === "checkbox") {
        field.checked = false;
      } else if (field.tagName === "SELECT") {
        field.selectedIndex = 0;
      } else {
        field.value = "";
      }
      field.removeAttribute("aria-invalid");
      field.classList.remove("border-red-600", "bg-red-50", "focus:border-red-700");
      const errorElement = document.getElementById(`${field.id}-error`);
      if (errorElement) {
        errorElement.textContent = "";
        errorElement.classList.add("hidden");
      }
    });
  }

  fields.forEach((field) => {
    field.addEventListener("blur", () => {
      touchedFields.add(field);
      renderField(field);
      hideStatus();
    });
    field.addEventListener("input", () => {
      touchedFields.add(field);
      hideStatus();
      renderField(field);
    });
    field.addEventListener("change", () => {
      touchedFields.add(field);
      hideStatus();
      renderField(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    hideStatus();
    hideErrorSummary();

    fields.forEach((field) => touchedFields.add(field));
    const errors = fields
      .map((field) => ({ field, message: renderField(field, true) }))
      .filter((item) => item.message);

    if (errors.length > 0) {
      showErrors(errors);
      return;
    }

    status.textContent = "Thanks — your form passed validation. This is a demo, so nothing has been sent or saved. Your answers have been cleared.";
    status.className = "rounded-2xl border border-forest/20 bg-mint px-4 py-4 text-sm font-semibold text-forest";
    clearFieldState();
    status.focus();
  });

  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      clearFieldState();
      hideStatus();
      hideErrorSummary();
    }, 0);
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
