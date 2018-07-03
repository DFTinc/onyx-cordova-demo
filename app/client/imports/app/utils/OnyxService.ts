import {Injectable} from "@angular/core";
import {AlertController} from "ionic-angular/es2015";
import {TranslateService} from "@ngx-translate/core";
import {Constants} from "../../../../both/Constants";

declare var Meteor;
declare var navigator;
declare var Onyx;

@Injectable()
export class OnyxService {
    private callback:Function;
    constructor(private alertCtrl:AlertController,
                private translate:TranslateService) {
    }

    public setCallback(callback:Function):void {
        this.callback = callback;
    }

    public execOnyx(options) {
        if (Meteor.isCordova) {
            options.onyxLicense = Meteor.settings.public.onyxLicense;
            navigator.onyx.exec(
                options,
                this.successCallback.bind(this),
                this.errorCallback.bind(this)
            );
        } else {
            console.log("This feature is only available on cordova devices.");
            let alert = this.alertCtrl.create({
                title: "Cordova Only!",
                message: "This feature is only available on cordova devices.",
                buttons: ["OK"]
            });
            alert.present();
        }
    }

    private successCallback(result):void {
        if (this.callback) {
            this.callback(result);
        }
    }

    private errorCallback(message):void {
        console.log("errorCallback(): " + JSON.stringify(message));
        Session.set(Constants.SESSION.LOADING, false);
        if (message !== "Cancelled") {
            let alert = this.alertCtrl.create({
                title: "Onyx Error",
                message: JSON.stringify(message),
                buttons: ["OK"]
            });
            alert.present();
        }
    }
}

export interface IOnyxConfiguration {
    action?: string,
    onyxLicense?: string,
    returnRawImage?: boolean,
    returnGrayRawImage?: boolean,
    returnProcessedImage?: boolean,
    returnEnhancedImage?: boolean,
    returnBlackWhiteProcessedImage?: boolean,
    returnFingerprintTemplate?: boolean,
    returnWSQ?: boolean,
    returnGrayRawWSQ?: boolean,
    shouldSegment?: boolean,
    shouldConvertToISOTemplate?: boolean,
    imageRotation?: number,
    wholeFingerCrop?: boolean,
    useManualCapture?: boolean,
    useOnyxLive?: boolean,
    useFlash?: boolean,
    showLoadingSpinner?: boolean,
    shouldInvert?: boolean,
    reticleOrientation?: string,
    reticleAngle?: number,
    reticleScale?: number,
    backgroundColorHexString?: string,
    showBackButton?: boolean,
    cropFactor?: number,
    cropSize?: { width?: number, height?: number },
    layoutPreference?: string,
    flip?: string,
    probe?: string,
    reference?: string
}

export interface IOnyxResult {
    action?: string,
    rawFingerprintDataUri?: string,
    grayRawFingerprintDataUri?: string,
    processedFingerprintDataUri?: string,
    enhancedFingerprintDataUri?: string,
    blackWhiteProcessedFingerprintDataUri?: string,
    base64EncodedFingerprintTemplate?: string,
    base64EncodedWsqBytes?: string,
    base64EncodedGrayRawWsqBytes?: string,
    captureMetrics?: {
        nfiqMetrics?: {
            nfiqScore?: number,
            mlpScore?: number
        },
        livenessConfidence?: number,
        focusQuality?: number,
        distanceToCenter?: number,
        fillProperties?: {
            heightRatio?: number,
            overlapRatio?: number
        }
    },
    isVerified?: boolean,
    matchScore?: number
}