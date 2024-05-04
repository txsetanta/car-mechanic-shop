// // Store status
function storeStatus() {
  const timeZone = "America/New_York";
  const now = new Date();
  const localTime = new Date(
    now.toLocaleString("en-US", {
      timeZone: timeZone
    })
  );
  // Days ---------------------------
  const options = { weekday: "long" };
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: timeZone,
  });
  const orangeCityDayToday = new Intl.DateTimeFormat("en-US", options).format(localTime);
  const outputDay = `${orangeCityDayToday} ${formattedTime}`;

  // Time --------------------------
  const hours = localTime.getHours();
  const dayOfWeek = localTime.toLocaleString("en-US", {
    timeZone,
    weekday: "long",
  });
  const isOpeningHours =
    (dayOfWeek === "Sunday" && hours >= 9 && hours < 17) ||
    (dayOfWeek !== "Sunday" && hours >= 8 && hours < 19);

  const outputTime = isOpeningHours
    ? '<span class="open text-success fw-bold">Open</span> come on down'
    : '<span class="closed text-danger fw-bold">Closed</span> see you tomorrow. 🙂';

  return `${outputDay}, We are ${outputTime}`;
}

function updateStatusRealtime() {
  document.getElementById("storestatus").innerHTML =
    `${storeStatus()}`;
}
updateStatusRealtime();
setInterval(updateStatusRealtime, 15000);



// JavaScript form submission
const form = document.getElementById('homepage-contact-form');
const nameInput = document.getElementById('contact-form-name');
const emailInput = document.getElementById('contact-form-email');
const messageInput = document.getElementById('contact-form-message');
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
const validateForm = () => {
  if (nameInput.value.trim() === '') {
    alert('Please enter your name.');
    return false;
  }
  if (emailInput.value.trim() === '' || !validateEmail(emailInput.value)) {
    alert('Please enter a valid email address.');
    return false;
  }
  if (messageInput.value.trim() === '') {
    alert('Please enter a message.');
    return false;
  }
  return true;
}

form.addEventListener("submit", function (event) {
  // Prevent default form submission
  if (!validateForm()) {
    event.preventDefault();
  } else {
    const nameInput = document.getElementById("contact-form-name");
    const emailInput = document.getElementById("contact-form-email");
    const messageInput = document.getElementById("contact-form-message");
    const receiveEmail = "fazaldinsons@gmail.com";
    const emailButton = document.querySelector("button.form-submit-button");

    // Compose email message
    const subject = `[Contact-Form] ${nameInput.value}`;
    const body = `${messageInput.value}\n\n${nameInput.value}\n${emailInput.value}`;

    // Open default email app and fill in appropriate fields
    const mailtoUrl = `mailto:${encodeURIComponent(
      receiveEmail
    )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    // Open Email client on click
    window.open(mailtoUrl);
  }
});