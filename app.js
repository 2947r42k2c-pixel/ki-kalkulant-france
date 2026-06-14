(function () {
  const form = document.querySelector(".lead-form");
  if (!form) return;

  const status = form.querySelector(".form-status");
  const requiredMessages = {
    name: "Veuillez indiquer votre prénom et nom.",
    company: "Veuillez indiquer votre entreprise.",
    email: "Veuillez indiquer un email professionnel valide.",
    volume: "Veuillez sélectionner le nombre d’appels d’offres par mois.",
    team: "Veuillez sélectionner le nombre de personnes impliquées dans le chiffrage.",
  };

  function clearErrors() {
    form.querySelectorAll(".field-error").forEach((error) => error.remove());
    form.querySelectorAll("[aria-invalid]").forEach((field) => {
      field.removeAttribute("aria-invalid");
      field.removeAttribute("aria-describedby");
    });
    status.textContent = "";
    status.className = "form-status";
  }

  function addError(field, message) {
    const id = `${field.name}-error`;
    const error = document.createElement("span");
    error.className = "field-error";
    error.id = id;
    error.textContent = message;
    field.setAttribute("aria-invalid", "true");
    field.setAttribute("aria-describedby", id);
    field.insertAdjacentElement("afterend", error);
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    const fields = Array.from(form.querySelectorAll("[required]"));
    let firstInvalid = null;

    fields.forEach((field) => {
      const value = field.value.trim();
      const invalidEmail = field.type === "email" && !isValidEmail(value);
      if (!value || invalidEmail) {
        addError(field, requiredMessages[field.name] || "Veuillez compléter ce champ.");
        firstInvalid = firstInvalid || field;
      }
    });

    if (firstInvalid) {
      status.textContent = "Certains champs sont à compléter avant l’envoi.";
      status.classList.add("error");
      firstInvalid.focus();
      return;
    }

    form.reset();
    status.textContent = "Merci, votre demande a bien été envoyée. Nous reviendrons vers vous pour évaluer votre processus de chiffrage.";
    status.classList.add("success");
  });
})();
