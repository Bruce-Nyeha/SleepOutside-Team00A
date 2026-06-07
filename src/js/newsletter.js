import { qs, getLocalStorage, setLocalStorage } from "./utils.mjs";

const STORAGE_KEY = "so-newsletter";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showMessage(messageEl, text, variant) {
  if (!messageEl) return;
  messageEl.textContent = text;
  messageEl.classList.remove("error", "success", "show");
  if (variant) messageEl.classList.add(variant);
  // Re-trigger the CSS animation by forcing a reflow before adding "show".
  void messageEl.offsetWidth;
  messageEl.classList.add("show");
}

export function initNewsletter() {
  const form = qs("#newsletter-form");
  if (!form) return;

  const input = qs("#newsletter-email");
  const messageEl = qs("#newsletter-message");

  const saved = getLocalStorage(STORAGE_KEY);
  if (saved && typeof saved === "string") {
    showMessage(messageEl, `You're subscribed as ${saved}.`, "success");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = (input?.value || "").trim();

    if (!EMAIL_REGEX.test(email)) {
      showMessage(messageEl, "Please enter a valid email address.", "error");
      return;
    }

    setLocalStorage(STORAGE_KEY, email);
    showMessage(messageEl, "Thanks for subscribing!", "success");
    if (input) input.value = "";
  });
}
