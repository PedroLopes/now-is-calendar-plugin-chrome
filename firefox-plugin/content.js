//V1.1 added settings
let settings = {
  debug: true,
  pluginName: "NowIs.Org > Calendar",
  pluginVersion: "1.1",
  tag: "",
  calendar: ""
};

function debugLog(...args) {
  if (!settings.debug) return;
  const prefix = `[DEBUG from ${settings.pluginName}/${settings.pluginVersion}]`;
  console.log(prefix, ...args);
}

// Load settings (Firefox uses Promises!)
browser.storage.sync.get(["debug", "eventTag", "calendar"])
  .then((data) => {
    settings.tag = data.eventTag || "";
    settings.debug = data.debug || false;
    settings.calendar = data.calendar || "";
    debugLog("Settings loaded from Firefox:\nTAG:" + settings.tag + "\nDEBUG:" + settings.debug + "\nCALENDAR:" + settings.calendar);
    injectButtons();
  });

// watch for changes to settings
browser.storage.onChanged.addListener((changes) => {
  if (changes.eventTag) settings.tag = changes.eventTag.newValue;
  if (changes.debug) settings.debug = changes.debug.newValue;
  if (changes.calendar) settings.calendar = changes.calendar.newValue;

  debugLog("Settings updated to:\nTAG:" + settings.tag + "\nDEBUG:" + settings.debug + "\nCALENDAR:" + settings.calendar);
});

// observer for dynamically added events
const observer = new MutationObserver(() => injectButtons());
observer.observe(document.body, { childList: true, subtree: true });

// Inject "Add gCal" button
function injectButtons() {
  const events = document.querySelectorAll("article.event");

  events.forEach((eventEl) => {
    if (eventEl.querySelector(".gcal-btn")) return;

    const btn = document.createElement("button");
    btn.innerText = "Add gCal";
    btn.className = "gcal-btn";
    btn.style.marginTop = "10px";
    btn.style.padding = "6px 12px";
    btn.style.cursor = "pointer";

    btn.addEventListener("click", () => handleEventClick(eventEl));
    eventEl.appendChild(btn);
  });
}

// Process single event
function handleEventClick(eventEl) {
  const venueEl = eventEl.querySelector("div.venue");
  const venueName =
    venueEl?.querySelector("span.venue-name")?.innerText.trim() || "";
  const venueAddr =
    venueEl?.querySelector("span.venue-address")?.innerText.trim() || "";

  debugLog(venueName, venueAddr);

  const timeEl = eventEl.querySelector("time.event-time-start");
  const datetimeValue = timeEl?.getAttribute("datetime");

  const descEl = eventEl.querySelector("div.event-title-description");
  const description =
    descEl?.querySelector("ol.event-description")?.innerText.trim() || "";

  debugLog(description);

  const ical_title =
    settings.tag + " " + clipText(description, 30) + " at: " + venueName;

  openGoogleCalendarEvent(datetimeValue, ical_title, venueAddr);
}

function clipText(text, maxChars) {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars) + "...";
}

function openGoogleCalendarEvent(datetimeValue, title, venueAddr) {
  const start = new Date(datetimeValue);
  const end = new Date(start.getTime() + 60 * 60 * 1000);

  const formatForCalendar = (d) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const startStr = formatForCalendar(start);
  const endStr = formatForCalendar(end);

  let url =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent(title) +
    "&dates=" + startStr + "/" + endStr +
    "&location=" + encodeURIComponent(venueAddr);

  if (settings.calendar && settings.calendar.trim() !== "") {
    url += "&src=" + encodeURIComponent(settings.calendar.trim());
  }

  window.open(url, "_blank");
}

