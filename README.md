# add concerts from now-is.org to your calendar (Chrome Plugin, using Google Calendar)

This is a plugin for Chrome or Firefox that finds events at the amazing
[Now Is Calendar](https://now-is.org) and adds a button so that you can add them to your calendar (currently only supports google calendar API). 

Once you click on the ``add gCal`` button below any event, it will open a new tab in your browser to handle a new google calendar event corresponding to this event.

![How to use](user-guide.png)

## How to install? 

This is not being offered in the Chrome store or the Firefox extensions. So you should install it manually via your browser's extenstions.

For Google Chrome
0. You can download our latest zip at ``chrome-plugin/latest.zip`` or use the source code at ``chrome-plugin`` 
1. Then, open ``chrome://extensions/`` on your browser
2. On the corner enable "developer mode"
3. Now you can do "Load unpacked"
4. And select the directory containing the google chrome code ````, in this repository. 
5. It will now appear on your chrome "All Extensions" tab.
6. If needed, enable it as you would a normal extension. 
7. It only operates on the ``https://now-is.org/`` URL, so navigate to the [Now Is Calendar](https://now-is.org) page and you should see the buttons. 
8. Test it by pressing one.

For firefox the extension loading is essentially the same, repeat the steps to load a custom extension but use the code in ``firefox-plugin`` (either the source code or the ``firefox-plugin/latest.zip``). 

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

