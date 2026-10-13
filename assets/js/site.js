// Progressive enhancement only — every page works without this file.
// Turns the spelled-out email on /contact/ into a working mailto link and copy button,
// so the address never appears as a plain mailto in the HTML source.
(function () {
  var holder = document.querySelector("[data-email-user]");
  if (!holder) return;

  var address = holder.getAttribute("data-email-user") + "@" + holder.getAttribute("data-email-domain");

  var link = document.createElement("a");
  link.href = "mailto:" + address;
  link.textContent = address;
  holder.textContent = "";
  holder.appendChild(link);

  var mailBtn = document.getElementById("email-btn");
  if (mailBtn) mailBtn.href = "mailto:" + address;

  var copyBtn = document.getElementById("copy-email");
  var status = document.getElementById("copy-status");
  if (!copyBtn || !navigator.clipboard) return;

  copyBtn.hidden = false;
  copyBtn.addEventListener("click", function () {
    navigator.clipboard.writeText(address).then(
      function () {
        if (status) status.textContent = "Email address copied.";
      },
      function () {
        if (status) status.textContent = "Couldn't copy — please select the address above.";
      }
    );
  });
})();
