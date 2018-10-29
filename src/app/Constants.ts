export class Constants {
  public static EMPTY_STRING = "";

  public static SESSION: any = {
    USER: "user",
    LANGUAGE: "language",
    LOADING: "isLoading",
    PLATFORM_READY: "platformReady",
    TRANSLATIONS_READY: "translationsReady",
    PATH: "path",
    URL_PARAMS: "urlParams",
    IS_IPHONE_X_LAYOUT: "isIPhoneXLayout",
    ASYNC_INVALID: "asyncInvalid",
    IMAGE_URI: "imageUri",
    ON_PAUSE: "onPause",
    ENROLLED_FINGERPRINT_TEMPLATE: "enrolledFingerprintTemplate",
    SAVE_IMAGES_COUNT: "saveImagesCount"
  };

  public static DEVICE: any = {
    IOS: "iOS",
    ANDROID: "Android"
  };

  public static STYLE: any = {
    IOS: "ios",
    MD: "md"
  };

  public static ENVIRONMENT: any = {
    DEVELOPMENT: "DEVELOPMENT",
    TEST: "TEST",
    PRODUCTION: "PRODUCTION"
  };

  public static PLATFORM: any = {
    CORDOVA: "cordova",
    ANDROID: "android",
    IOS: "ios"
  };

  public static IMAGE_URI_PREFIX: string = "data:image/jpeg;base64,";

  public static FLIP:any = {
    HORIZONTAL: "HORIZONTAL",
    VERTICAL: "VERTICAL",
    BOTH: "BOTH",
    NONE: "NONE"
  };

  public static LAYOUT_PREFERENCE:any = {
    UPPER_THIRD: "UPPER_THIRD",
    FULL: "FULL"
  };

  public static RETICLE_ORIENTATION:any = {
    LEFT: "LEFT",
    RIGHT: "RIGHT"
  };

  public static IMAGE_ROTATION:any = {
    "0": "0",
    "90": "90",
    "180": "180",
    "270": "270"

  };
}
