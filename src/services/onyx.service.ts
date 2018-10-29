import {Injectable} from "@angular/core";
import {Constants} from "../app/Constants";
import {Platform} from "ionic-angular";

declare var navigator;

@Injectable()
export class OnyxService {
  private callback: (error: any, result?: any) => {};

  constructor(private platform: Platform) {
  }

  public setCallback(callback: (error: any, result?: any) => {}): void {
    this.callback = callback;
  }

  public execOnyx(options) {
    if (this.platform.is(Constants.PLATFORM.CORDOVA)) {
      options.onyxLicense = "your-onyx-license-here";
      navigator.onyx.exec(
        options,
        this.successCallback.bind(this),
        this.errorCallback.bind(this)
      );
    } else {
      if (this.callback) {
        this.callback("Cordova Only");
      }
    }
  }

  private successCallback(result): void {
    if (this.callback) {
      this.callback(null, result);
    }
  }

  private errorCallback(error): void {
    if (this.callback) {
      this.callback(error);
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
  showManualCaptureText?: boolean,
  manualCaptureText?: string,
  backButtonText?: string,
  infoText?: string,
  infoTextColorHexString?: string,
  base64ImageData?: string,
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
