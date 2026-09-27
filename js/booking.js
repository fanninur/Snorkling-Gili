const bookingForm = document.querySelector("[data-booking-form]");

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(bookingForm);
  const message = [
  "Hello Snorkeling Gili,",
    "I would like to book:",
    `Package: ${formData.get("package") || "-"}`,
    `Date: ${formData.get("date") || "-"}`,
    `Guests: ${formData.get("guests") || "-"}`,
    `Name: ${formData.get("name") || "-"}`,
    `Email: ${formData.get("email") || "-"}`,
    `WhatsApp: ${formData.get("whatsapp") || "-"}`,
    `Message: ${formData.get("message") || "-"}`
  ].join("\n");

  window.location.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
});
