# React Native Webfills

Webfills for useful packages of React Native so they can be used on [React Native Web](https://github.com/necolas/react-native-web)

## Collaboration

Feel free to make PRs to fix stuff or add new supported packaged

## Currently supported
 - react-native-blur (Stub, doing nothing)
 - react-native-drawer-layout (Fully working)
 - react-native-linear-gradient (Fully working)
 - react-native-maps (A bit glitchy, MapView, Marker, Circle and Polylines implemented)
 
NOTE: Add this line to your index.html before your bundle.js :
```html
<script src="//maps.google.com/maps/api/js?key=MYGOOGLEAPIKEY" type="text/javascript"></script>
```
 - react-native-i18n (Working, just install i18n-js)
 - react-native-photo-view (Stub, doing nothing)
 - react-native-modal-datetime-picker (Stub, doing nothing)
 - react-native-vector-icons (only MaterialIcons and MaterialCommunityIcons)
 
  NOTE: Respective instructions can be found in each index.js file
 - react-native-view-pager (Fully Working without swipe gestures`obviously)

## Usage
This module is made to be cloned as a submodule named webfills in your webpack project.
```sh
git submodule add https://github.com/VinceBT/react-native-webfills.git webfills
git submodule update --init --recursive
```

Then add this to your webpack.config.js :

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
```

## License

MIT
