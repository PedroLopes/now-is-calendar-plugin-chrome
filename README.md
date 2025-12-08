# Plugin to add concerts from now-is.org to your calendar 

This is a plugin for Chrome and/or Firefox that finds events at the amazing
[Now Is Calendar](https://now-is.org) and adds a button so that you can add them to your calendar (currently only supports google calendar API). 

Once you click on the ``add gCal`` button below any event, it will open a new tab in your browser to handle a new google calendar event corresponding to this event.

![How to use](user-guide.png)

## How to install? 

### Chrome install

This is not being offered in the Chrome store. So you should install it **manually** for chrome. 

<details>
  <summary>Click to expand details on Chrome install</summary>

**Manual Chrome install** instructions (install the plugin from code/repository):
0. You can download our latest zip at ``builds/chrome-plugin-latest.zip`` or use the source code at ``chrome-plugin`` 
1. Then, open ``chrome://extensions/`` on your browser
2. On the corner enable "developer mode"
3. Now you can do "Load unpacked"
4. And select the directory containing the google chrome code ``chrome-plugin``, in this repository. 
5. It will now appear on your chrome "All Extensions" tab.
6. If needed, enable it as you would a normal extension. 
7. It only operates on the ``https://now-is.org/`` URL, so navigate to the [Now Is Calendar](https://now-is.org) page and you should see the buttons. 
8. Test it by pressing one.

</details>

### Firefox install

**Recommended:** The [plugin is at the official Firefox add-ons page](https://addons.mozilla.org/en-US/firefox/addon/nowis-org-calendar/?utm_source=addons.mozilla.org), so you can install it as you would any normal extension—just click [here](https://addons.mozilla.org/en-US/firefox/addon/nowis-org-calendar).



<details>
  <summary><b>Manual Firefox install</b> instructions, click to expand</summary>

**Manual Firefox install** instructions (install the plugin from code/repository):
0. You can download our latest zip at ``builds/firefox-plugin-latest.zip`` or use the source code at ``firefox-plugin`` 
1. Then, open ``about:debugging#/runtime/this-firefox`` on your browser
2. Click ``Load temporary Add-on``
3. And select the directory containing the google chrome code ``firefox-plugin``, in this repository. 
5. It will now appear on your firefox ``about:addons`` tab.
6. If needed, enable it as you would a normal extension.
7. It only operates on the ``https://now-is.org/`` URL, so navigate to the [Now Is Calendar](https://now-is.org) page and you should see the buttons. 
8. Test it by pressing one.

</details>

## How to configure?
 
The settings panel (via ``Chrome's extension manager`` at ``chrome://extensions/``, then ``details`` of this extension, then ``Extension options``) allows you to configure:

  * ``tag``: add a tag (e.g., "[gig]") to the title of any of your calendar events.
  * ``calendar``: the ID of a google calendar if you do not want this to add it to your default. To obtain this ID, go to your desired calendar in ``Google Calendar``, then ``settings`` and then search for ``Integrate calendar`` and then copy the ``Calendar ID`` (including the long string of characters and the ``@group.calendar.google.com`` portion).
  * ``debug``: a checkbox to enable debugging on this extension. This log is accessible via Chrome's ``inspector`` ``console``.


# Privacy Policy

**Last updated: Nov 29, 2025**

## Overview
This Chrome extension does **not collect, store, transmit, or share any personal data** from users. It operates entirely on the user’s device and only interacts with publicly available text already visible on the websites the user is visiting. It also only operates on the ``https://now-is.org`` website.

## Data Collection and Use
- The extension **does not collect or store any personal information**, browsing history, cookies, identifiers, or analytics.  
- The extension does **not send any data to external servers**, third parties, or the developer.  
- All processing occurs locally within the user’s browser.

## How the Extension Works
The extension simply:
1. Reads text already present on the active webpage if the URL is ``https://now-is.org`` (which is public and already loaded by the user).  
2. Extracts specific visible elements when the user activates the extension’s buttons.  
3. Uses those extracted fields to **construct a Google Calendar event URL**.  
4. The user chooses whether or not to submit that event to Google Calendar.

No data is uploaded, stored, logged, or transmitted anywhere outside the user’s own Google Calendar flow.

## Third Parties
The extension does not integrate with or communicate with any third-party services except when opening a **Google Calendar URL** in the user’s browser, which is equivalent to clicking any normal link to calendar.google.com.

## Security
Because no data is collected or transmitted, there is no risk of interception or unauthorized access introduced by this extension.

## Changes to This Policy
If the extension’s functionality changes in the future in a way that affects privacy, this policy will be updated accordingly.

## Contact
If you have any questions about this privacy policy, contact the developer at:  
``humancomputerintegration`` AT ``gmail.com``. 


## Planned features

<details>
  <summary>Click to expand</summary>

1. Change button text (status: implemented on Firefox code, not on store, needs to be added to chrome code)
2. Download .ical rather than import to gcal (status: not working, searching for simple implementation/workaround)

</details>
