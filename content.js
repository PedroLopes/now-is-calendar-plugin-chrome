// Immediately inject buttons — DOM is ready in content scripts
// Warning: I spent a while trying to get rid of violations like 'requestIdleCallback' handler took 208ms, but this is the best option, found that it works well
injectButtons();

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
  const tag = "[gig]";

  // Venue info
  const venueEl = eventEl.querySelector("div.venue");
  const venueName = venueEl?.querySelector("span.venue-name")?.innerText.trim() || "";
  const venueAddr = venueEl?.querySelector("span.venue-address")?.innerText.trim() || "";
  //console.log(venueName);
  //console.log(venueAddr);

  // Time info
  const timeEl = eventEl.querySelector("time.event-time-start");
  const datetimeValue = timeEl?.getAttribute("datetime");

  // Description
  const descEl = eventEl.querySelector("div.event-title-description");
  const description = descEl?.querySelector("ol.event-description")?.innerText.trim() || "";
 
  //console.log(description)
    
  const ical_title = tag + " " + clipText(description, 30) + " at: " + venueName;
  //console.log(ical_title);

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

  const url =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent(title) +
    "&dates=" + startStr + "/" + endStr +
    "&location=" + encodeURIComponent(venueAddr);

  window.open(url, "_blank");
}

