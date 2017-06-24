Flickr APP
=====================

## Using this App

This app is built with ionic framework, on top of Apache Cordova.

First, clone the repo and make surte the `ionic` utility is installed.

After that, inside the repository folder run:

```bash
$ cordova prepare
```

Once it finished, run:

```bash
$ npm install (it may require sudo)
```

If you have any trouble with this commands, check config.xml and package.json files and delete the next lines:

```bash
<plugin name="de.appplant.cordova.plugin.local-notification" spec="git+https://github.com/katzer/cordova-plugin-local-notifications.git" />
"cordova-plugin-app-event": "file:node_modules/cordova-plugin-app-event"
"de.appplant.cordova.plugin.local-notification": "git+https://github.com/katzer/cordova-plugin-local-notifications.git",
"de.appplant.cordova.plugin.local-notification": {},
```