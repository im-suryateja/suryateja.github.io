document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  fetch("https://contact-form-2hea.onrender.com/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      message
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("✅ Message sent successfully!");
      document.getElementById("contact-form").reset();
    } else {
      alert("❌ Failed to send message: " + data.error);
    }
  })
  .catch(error => {
    alert("❌ Error: " + error.message);
  });
});
