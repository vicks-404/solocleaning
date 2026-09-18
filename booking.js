// WhatsApp number that receives booking requests (country code + number, no spaces or symbols)
const OWNER_WHATSAPP_NUMBER = "919322698482";

const packageSelect = document.getElementById("package");
const preferenceSelect = document.getElementById("preference");
const totalPrice = document.getElementById("total-price");
const bookingForm = document.getElementById("booking-form");
const formMessage = document.getElementById("form-message");

function updateTotal() {
    const total = Number(packageSelect.value) + Number(preferenceSelect.value);
    totalPrice.textContent = `₹${total.toLocaleString("en-IN")}/-`;
}

packageSelect.addEventListener("change", updateTotal);
preferenceSelect.addEventListener("change", updateTotal);

bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const bookingDate = new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short"
    });
    const preferenceLabel = preferenceSelect.options[preferenceSelect.selectedIndex].text;
    const packageLabel = packageSelect.options[packageSelect.selectedIndex].text;

    const detailsList = [
        "New booking request - Solo Deep Cleaning",
        `• Name: ${formData.get("name")}`,
        `• Contact Number: ${formData.get("contact")}`,
        `• Address: ${formData.get("address")}`,
        `• Package: ${packageLabel}`,
        `• Cleaning Preference: ${preferenceLabel}`,
        `• Estimated Total: ${totalPrice.textContent}`,
        `• Requested On: ${bookingDate}`
    ].join("\n");

    const whatsappUrl = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(detailsList)}`;

    formMessage.textContent = "Opening WhatsApp with your booking details...";
    window.open(whatsappUrl, "_blank");
});

