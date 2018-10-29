# Installation
* Clone this repository

```
git clone https://github.com/DFTinc/onyx-cordova-demo
```

* Install the node dependencies

```
npm install
```

* Add your Onyx license key to `src/services/onyx.service.ts` as the value for the `onyxLicense` key.

* Run the app to build the Android Studio project

```angular2html
ionic cordova run android
```

* Open the Android Studio project and update to use Gradle 4.4
