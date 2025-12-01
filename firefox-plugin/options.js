// Cross-browser: Firefox uses "browser", Chrome uses "chrome"
const api = (typeof browser !== "undefined") ? browser : chrome;

document.addEventListener("DOMContentLoaded", () => {
  // Load all settings in one call
  api.storage.sync.get(["eventTag", "calendar", "debug"])
    .then((data) => {
      document.getElementById("tagInput").value = data.eventTag || "";
      document.getElementById("calendarInput").value = data.calendar || "";
      document.getElementById("debug").checked = data.debug ?? false;
    });
});

document.getElementById("saveBtn").addEventListener("click", () => {
  const tagValue = document.getElementById("tagInput").value.trim();
  const calValue = document.getElementById("calendarInput").value.trim();
  const debugValue = document.getElementById("debug").checked;

  // Save all settings in one atomic write
  api.storage.sync.set({
    eventTag: tagValue,
    calendar: calValue,
    debug: debugValue
  }).then(() => {
    const status = document.getElementById("status");
    status.textContent = "Saved!";
    setTimeout(() => (status.textContent = ""), 1500);
  });
});

