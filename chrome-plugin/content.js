//V1.1 added settings
let settings = {
  debug: false,
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

// get data on load, then start injectButtons
chrome.storage.sync.get(["debug", "eventTag", "calendar"], (data) => {
  settings.tag = data.eventTag ? `${data.eventTag}` : "";
  settings.debug = data.debug ? `${data.debug}` : false;
  settings.calendar = data.calendar ? `${data.calendar}` : "";
  debugLog("Settings loaded from chrome:\nTAG:" + settings.tag +"\nDEBUG:" + settings.debug + "\nCALENDAR:" + settings.calendar);
  injectButtons(); // run once we know settings
});

// watch for changes to settings
chrome.storage.onChanged.addListener((changes) => {
  if (changes.eventTag) {
    settings.tag = changes.eventTag.newValue;
  }
  if (changes.debug) {
    settings.debug = changes.debug.newValue;
  }
  if (changes.calendar) {
    settings.calendar = changes.calendar.newValue;
  }
  debugLog("Settings updated to:\nTAG:" + settings.tag +"\nDEBUG:" + settings.debug + "\nCALENDAR:" + settings.calendar);
});

// observe for dynamically added events, then inject
//  note: stackoverflow mentions this, does not seem to work?
//        as in if you remove inject above, no dynamic loading happens
const observer = new MutationObserver(() => injectButtons());
observer.observe(document.body, { childList: true, subtree: true });

// Inject "Add gCal" button into each <article.event>
function injectButtons() {
  const events = document.querySelectorAll("article.event");

  events.forEach((eventEl) => {
    // Skip if button already exists
    if (eventEl.querySelector(".gcal-btn")) return;

    const btn = document.createElement("button");
    btn.innerText = "Add gCal";
    btn.className = "gcal-btn"; // id of new buttons
    btn.style.marginTop = "10px";
    btn.style.padding = "6px 12px";
    btn.style.cursor = "pointer";

    // Attach click handler
    btn.addEventListener("click", () => handleEventClick(eventEl));

    // Append button inside the article
    eventEl.appendChild(btn);
  });
}

// Process a single now-is event when the user clicks the button
function handleEventClick(eventEl) {
  //const tag = "[gig]"; //now loaded dynamically

  // Venue info
  const venueEl = eventEl.querySelector("div.venue");
  const venueName = venueEl?.querySelector("span.venue-name")?.innerText.trim() || "";
  const venueAddr = venueEl?.querySelector("span.venue-address")?.innerText.trim() || "";
  debugLog(venueName);
  debugLog(venueAddr);

  // Time info
  const timeEl = eventEl.querySelector("time.event-time-start");
  const datetimeValue = timeEl?.getAttribute("datetime");

  // Description
  const descEl = eventEl.querySelector("div.event-title-description");
  const description = descEl?.querySelector("ol.event-description")?.innerText.trim() || "";
 
  debugLog(description)
    
  const ical_title = settings.tag + " " + clipText(description, 30) + " at: " + venueName;

  // Open Google Calendar
  openGoogleCalendarEvent(datetimeValue, ical_title, venueAddr);
}

// --------------------
// clip text
function clipText(text, maxChars) {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars) + "...";
}

// --------------------
// open Google Calendar event
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
  
  // Add calendar if user specified one
  if (settings.calendar && settings.calendar.trim() !== "") {
    url += "&src=" + encodeURIComponent(settings.calendar.trim());
  }

  window.open(url, "_blank");
}

