# NowIs to Calendar (Chrome Plugin)

This is a Google Chrome plugin that finds events at the amazing
[Now Is Calendar](https://now-is.org) and adds a button so that you can add them to your calendar (currently only supports google calendar API). 

Once you click on the ``add gCal`` button below any event, it will open a new tab in your browser to handle a new google calendar event corresponding to this event.

![How to use](user-guide.png)

## How to install? 

This is not being offered in the Chrome store or anything. So yo should install it manually by: 

1. Open chrome://extensions/
2. On the corner enable "developer mode"
3. Now you can do "Load unpacked"
4. And select the directory containing the code of this repository. 
5. It will now appear on your chrome "All Extensions" tab.
6. If needed, enable it as you would a normal extension. 
7. It only operates on the ``https://now-is.org/`` URL, so navigate to the [Now Is Calendar](https://now-is.org) page and you should see the buttons. 
8. Test it by pressing one.

## TODO

1. add options page so you can tweak settings. Currently, settings are tweaked via code. 
