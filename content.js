// Find all <article class="event"> elements
const events = document.querySelectorAll("article.event");

if (events.length === 0) {
  console.log("No <article class='event'> elements found.");
} else {
  //console.log(`Found ${events.length} events:`, events);
}

function openGoogleCalendarEvent(datetimeValue, title, venueAddr) {
  // Convert start datetime to a Date object
  const start = new Date(datetimeValue);

  // Default end time = +1 hour
  const end = new Date(start.getTime() + 60 * 60 * 1000);

  // Format to Google Calendar's required format: YYYYMMDDTHHMMSSZ
  const formatForCalendar = (dateObj) => {
    return dateObj.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const startStr = formatForCalendar(start);
  const endStr = formatForCalendar(end);

  // Build Google Calendar URL
  const url =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent(title) +
    "&dates=" + startStr + "/" + endStr +
    "&location=" + encodeURIComponent(venueAddr);

  // Open in a new tab
  window.open(url, "_blank");
}



events.forEach((eventEl, idx) => {
  const tag = "[gig]" //feel free to change to yours
  //console.log(`--- Event ${idx + 1} ---`);
  let venueEl, venueName, venueAddr, datetimeValue, humanText; 
  if (idx < 1 || 1) { // only used for testing, always on bypass now
    eventEl.style.border = "3px solid red";
    console.log(idx);
  
    // ical 
    // title = optional_tag <band.short()> at <venue.short()> 
    // with address on: <venue address>
    // time = timestamp, with chicago as zone

    // Get <div class="venue"> to get venue info
    venueEl = eventEl.querySelector("div.venue");
    venueName = venueEl.querySelector("span.venue-name").innerText.trim()
    venueAddr = venueEl.querySelector("span.venue-address").innerText.trim()
    //venueEl ? venueEl.innerText.trim() : "(no venue found)";
    console.log("Venue:", venueName);
    console.log("  Addr:", venueAddr);

    const timeEl = eventEl.querySelector("time.event-time-start");
    if (timeEl) {
      datetimeValue = timeEl.getAttribute("datetime");
      console.log(datetimeValue);
      humanText = timeEl.innerText.trim();
      console.log("time-start:", humanText);
    }
    const descEl = eventEl.querySelector("div.event-title-description");
      console.log(datetimeValue);
    if (descEl) {
      const title = descEl.querySelector("h3.event-title")
      if (title) {
        const titleValue = title.innerText.trim();
        console.log(titleValue);
      }
      const description = descEl.querySelector("ol.event-description").innerText.trim();
      console.log(description);
    const ical_title = tag + " " + description + " at: " + venueName
    //now the real deal (optional_tag <band.short()> at <venue.short()>)
    // you can uncomment this next line of code to test
    //openGoogleCalendarEvent(datetimeValue, ical_title , venueAddr)

    // Instead, add the button at the end of the div
    const btn = document.createElement("button");
    btn.innerText = "Add gCal";
    btn.style.marginTop = "10px";
    btn.style.padding = "6px 12px";
    btn.style.cursor = "pointer";

    // Add click handler for *that event*
    btn.addEventListener("click", () => {
      openGoogleCalendarEvent(datetimeValue, ical_title, venueAddr);
    });

    // Append the button to the event element
    eventEl.appendChild(btn);

    } 



  }
});
