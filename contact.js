(function () {
  var ENDPOINT = "https://formspree.io/f/mrpeqoqq";
  var form = document.getElementById("contact-form");
  if (!form) return;

  var button = document.getElementById("submit-btn");
  var status = document.getElementById("form-status");
  var fallback = " Email suryateja.9902@gmail.com instead.";

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
    show("Sending...");

    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function (res) {
        if (res.ok) {
          show("Message sent. I'll reply by email.", "ok");
          form.reset();
          return;
        }
        return res.json().then(function (result) {
          var detail = result && result.errors && result.errors[0] && result.errors[0].message;
          show("The message didn't send" + (detail ? ": " + detail + "." : ".") + fallback, "error");
        });
      })
      .catch(function () {
        show("The message didn't send." + fallback, "error");
      })
      .finally(function () {
        button.disabled = false;
      });
  });
})();
