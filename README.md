# React Native Webfills

Webfills for useful packages of React Native so they can be used on [React Native Web](https://github.com/necolas/react-native-web)

Currently supported :
 - react-native-blur (Stub doing nothing)
 - react-native-drawer-layout (Fully working)
 - react-native-linear-gradient (Fully working)
 - react-native-maps (A bit glitchy, MapView, Marker, Circle and Polylines implemented)
NOTE: Add this line to your index.html before your bundle.js :
```html
<script src="//maps.google.com/maps/api/js?key=MYGOOGLEAPIKEY" type="text/javascript"></script>
```
 - react-native-modal-datetime-picker (Stub doing nothing)
 - react-native-vector-icons (only MaterialIcons)
  NOTE: Add this line to your index.html inside <head> tag :
 ```html
<link href="//fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
 ```
 - react-native-view-pager (Working without swipe gestures)

This module is made to be cloned in a folder named webfills on your webpack project.
Then add this to your config :
```
const fs = require('fs');
const path = require('path');

const webfillsFolder = 'webfills';

const aliases = {
  'react-native': 'react-native-web',
  'react-router-native': 'react-router',
};

fs.readdirSync(webfillsFolder).filter(f => fs.statSync(`${webfillsFolder}/${f}`).isDirectory()).forEach(mod => {
  console.log(`Webfill detected: ${mod}`);
  aliases[mod] = path.join(__dirname, webfillsFolder, mod);
});

...

module.exports = {
  ...
  resolve: {
    alias: aliases,
  },
  ...
}
