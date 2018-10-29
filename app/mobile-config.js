App.info({
    id: 'com.dft.onyx.cordova.demo',
    name: 'Onyx Cordova',
    description: 'Demo for cordova-plugin-onyx using Ionic and Meteor frameworks',
    author: 'Matthew Wheatley',
    email: 'mattjwheatley@gmail.com',
    version: '5.0.0'
});

App.icons({
    // iOS
    'iphone_2x': 'resources/ios/icon/icon-60@2x.png', // 120x120
    'iphone_3x': 'resources/ios/icon/icon-60@3x.png', // 180x180
    'ipad': 'resources/ios/icon/icon-76.png', // 76x76
    'ipad_2x': 'resources/ios/icon/icon-76@2x.png', // 152x152
    'ipad_pro': 'resources/ios/icon/icon-83.5@2x.png', // 167x167
    'ios_settings': 'resources/ios/icon/icon-small.png', // 29x29
    'ios_settings_2x': 'resources/ios/icon/icon-small@2x.png', // 58x58
    'ios_settings_3x': 'resources/ios/icon/icon-small@3x.png', // 87x87

    // Android
    'android_mdpi': 'resources/android/icon/drawable-mdpi-icon.png', // 48x48
    'android_hdpi': 'resources/android/icon/drawable-hdpi-icon.png', // 72x72
    'android_xhdpi': 'resources/android/icon/drawable-xhdpi-icon.png', // 96x96
    'android_xxhdpi': 'resources/android/icon/drawable-xxhdpi-icon.png', // 144x144
    'android_xxxhdpi': 'resources/android/icon/drawable-xxxhdpi-icon.png' // 192x192
});

App.launchScreens({
    // iOS
    'iphone_2x': 'resources/ios/splash/Default@2x~iphone.png', // 640x960
    'iphone5': 'resources/ios/splash/Default-568h@2x~iphone.png', // 640x1136
    'iphone6': 'resources/ios/splash/Default-667h.png', // 750x1334
    'iphone6p_portrait': 'resources/ios/splash/Default-736h.png', // 1242x2208
    'iphone6p_landscape': 'resources/ios/splash/Default-Landscape-736h.png', // 2208x1242

    'ipad_portrait': 'resources/ios/splash/Default-Portrait~ipad.png', // 768x1024
    'ipad_portrait_2x': 'resources/ios/splash/Default-Portrait@2x~ipad.png', // 1536x2048
    'ipad_landscape': 'resources/ios/splash/Default-Landscape~ipad.png', // 1024x768
    'ipad_landscape_2x': 'resources/ios/splash/Default-Landscape@2x~ipad.png', // 2048x1536

    // Android
    'android_mdpi_portrait': 'resources/android/splash/drawable-port-mdpi-screen.png', // 320x480
    'android_mdpi_landscape': 'resources/android/splash/drawable-land-mdpi-screen.png', // 480x320
    'android_hdpi_portrait': 'resources/android/splash/drawable-port-hdpi-screen.png', // 480x800
    'android_hdpi_landscape': 'resources/android/splash/drawable-land-hdpi-screen.png', // 800x480
    'android_xhdpi_portrait': 'resources/android/splash/drawable-port-xhdpi-screen.png', // 720x1280
    'android_xhdpi_landscape': 'resources/android/splash/drawable-land-xhdpi-screen.png' // 1280x720
});

App.setPreference('BackupWebStorage', 'local');
App.setPreference('StatusBarOverlaysWebView', 'true');
//App.setPreference('StatusBarBackgroundColor', '#000000');

App.configurePlugin('cordova-plugin-camera', {
    CAMERA_USAGE_DESCRIPTION: "This application will use your phone's camera to take a selfie for your profile picture.",
    PHOTOLIBRARY_USAGE_DESCRIPTION: "This application will access your photo library to select a photo for your profile picture."
});

App.configurePlugin('cordova-android-support-gradle-release', {
    ANDROID_SUPPORT_VERSION: "27.+"
});

App.appendToConfig(`
    <platform name="android">
        <custom-config-file target="AndroidManifest.xml" parent="/*">
            <uses-feature android:name="android.hardware.camera" android:required="true" xmlns:android="http://schemas.android.com/apk/res/android" />
            <uses-feature android:name="android.hardware.camera.autofocus" xmlns:android="http://schemas.android.com/apk/res/android" />
            <uses-permission android:name="android.permission.CAMERA" xmlns:android="http://schemas.android.com/apk/res/android" />
            <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" xmlns:android="http://schemas.android.com/apk/res/android" />
        </custom-config-file>
    </platform>
    <platform name="ios"> 
        <config-file platform="ios" target="*-Info.plist" parent="UILaunchStoryboardName">
            <string>CDVLaunchScreen</string>
        </config-file>
      </platform>
`);

App.accessRule('http://localhost:3000/*');
App.accessRule('https://localhost:3000/*');
App.accessRule('http://meteor.local');
App.accessRule('http://localhost:12664/');
App.accessRule('http://10.0.2.2:3000/*');
App.accessRule('http://10.35.3.197:3000/*');
App.accessRule('http://10.35.2.163:3000/*');
App.accessRule('http://192.168.2.4:3000/*');
App.accessRule('*.google.com/*');
App.accessRule('*.googleapis.com/*');
App.accessRule('*.gstatic.com/*');