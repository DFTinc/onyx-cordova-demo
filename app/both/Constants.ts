export class Constants {
    public static EMPTY_STRING = "";

    public static SESSION:any = {
        LANGUAGE: "language",
        LOADING: "isLoading",
        PLATFORM_READY: "platformReady",
        TRANSLATIONS_READY: "translationsReady",
        PATH: "path",
        URL_PARAMS: "urlParams",
        INCORRECT_PASSWORD: "incorrectPassword",
        FORGOT_PASSWORD: "forgotPassword",
        CREATE_ACCOUNT: "createAccount",
        RESET_PASSWORD: "resetPassword",
        REGISTERED_ERROR: "registeredError",
        NOT_REGISTERED_ERROR: "notRegisteredError",
        RESET_PASSWORD_ERROR: "resetPasswordError",
        RESET_PASSWORD_ERROR_MESSAGE: "resetPasswordErrorMessage",
        RESET_PASSWORD_TOKEN: "resetPasswordToken",
        WAS_PASSWORD_RESET: "wasPasswordReset",
        EMAIL: "email",
        IS_IPHONE_X_LAYOUT: "isIPhoneXLayout",
        ENROLLED_FINGERPRINT_TEMPLATE: "enrolledFingerprintTemplate"
    };

    public static DEVICE:any = {
        IOS: "iOS",
        ANDROID: "Android"
    };

    public static STYLE:any = {
        IOS: "ios",
        MD: "md"
    };

    public static ENVIRONMENT:any = {
        DEVELOPMENT: "DEVELOPMENT",
        TEST: "TEST",
        PRODUCTION: "PRODUCTION"
    };

    public static METEOR_ERRORS:any = {
        TIMEDOUT: "ETIMEDOUT",
        SIGN_IN: "sign-in",
        ACCOUNT_NOT_FOUND: "account-not-found",
        NO_PASSWORD: "User has no password set",
        USER_NOT_FOUND: "User not found",
        INCORRECT_PASSWORD: "Incorrect password",
        EMAIL_EXISTS: "Email already exists.",
        ALREADY_EXISTS: 'already-exists',
        TOKEN_EXPIRED: "Token expired"
    };

    public static ADD_IMAGE_PLACEHOLDER_URI:string = "/images/add_image_camera_photo.png";
    public static IMAGE_URI_PREFIX:string = "data:image/jpeg;base64,";

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