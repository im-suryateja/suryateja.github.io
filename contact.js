(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var button = document.getElementById("submit-btn");
  var status = document.getElementById("form-status");

  function show(message, type) {
    status.textContent = message;
    status.className = "form-status " + (type || "");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim()
    };

    if (!data.name || !data.email || !data.message) {
      show("Fill in your name, email and message, then send again.", "error");
      return;
    }

    button.disabled = true;
    show("Sending. The first message can take up to a minute while the server wakes up.");

    fetch("https://contact-form-2hea.onrender.com/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function (res) { return res.json(); })
      .then(function (result) {
        if (result.success) {
          show("Message sent. I'll reply by email.", "ok");
          form.reset();
        } else {
          show("The message didn't send" + (result.error ? ": " + result.error : ".") + " Email suryateja.9902@gmail.com instead.", "error");
        }
      })
      .catch(function () {
        show("The message didn't send. Email suryateja.9902@gmail.com instead.", "error");
      })
      .finally(function () {
        button.disabled = false;
      });
  });
})();
