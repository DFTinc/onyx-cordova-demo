# Installation
* Clone this repository

```
git clone https://github.com/DFTinc/onyx-cordova-demo
```

* Install the node dependencies

```
npm install
```

* Add your Onyx license key to `config/development/settings.json` as the value for the `onyxLicense` key.

* Run the app to build the project.  The `start` script will run the app for an iOS device.

```
npm start
```

* Install the OnyxCamera CocoaPod

```
^C // to stop running the app

cd .meteor/local/cordova-build/platforms/ios/

pod install
```

* Open the project `.xcworkspace` file to run the app on an iOS device from XCode. 