//load first
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get("eventTag", (data) => {
    document.getElementById("tagInput").value = data.eventTag || "";
  });
  chrome.storage.sync.get("calendar", (data) => {
    document.getElementById("calendarInput").value = data.calendar || "";
  });
  chrome.storage.sync.get("debug", (data) => {
    document.getElementById("debug").checked = data.debug ?? false;
  });
});

//save on button press
document.getElementById("saveBtn").addEventListener("click", () => {
  //this might need some improvements, seems silly to call this like this
  //tag
  const tagValue = document.getElementById("tagInput").value.trim();
  chrome.storage.sync.set({ eventTag: tagValue }, () => {
    const s = document.getElementById("status");
    s.textContent = "Saved!";
    setTimeout(() => (s.textContent = ""), 1500);
  });
  //calendar
  const calValue = document.getElementById("calendarInput").value.trim();
  chrome.storage.sync.set({ calendar: calValue }, () => {
    const s = document.getElementById("status");
    s.textContent = "Saved!";
    setTimeout(() => (s.textContent = ""), 1500);
  });
  //calendar
  const debugValue = document.getElementById("debug").checked;
  chrome.storage.sync.set({ debug: debugValue }, () => {
    const s = document.getElementById("status");
    s.textContent = "Saved!";
    setTimeout(() => (s.textContent = ""), 1500);
  });


});

