import {Component, OnInit} from '@angular/core';
import {Alert, AlertController, NavParams, Platform, Toast, ToastController} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";
import {DomSanitizer} from "@angular/platform-browser";
import {IOnyxConfiguration, IOnyxResult, OnyxService} from "../../services/onyx.service";
import {Constants} from "../../app/Constants";
import {Storage} from "@ionic/storage";
import {Base64ToGallery} from "@ionic-native/base64-to-gallery";
import {Clipboard} from "@ionic-native/clipboard";
import {AndroidPermissions} from "@ionic-native/android-permissions";
import {LoadingService} from "../../services/loading.service";

declare var Onyx;

@Component({
  selector: "page-onyx-result",
  templateUrl: "onyx-result.html"
})
export class OnyxResultPage implements OnInit {
  public onyxResult: IOnyxResult;
  private toastMessages: Array<string> = [];
  private currentToast: Toast;

  constructor(public translate: TranslateService,
              public domSanitizer: DomSanitizer,
              private platform: Platform,
              private params: NavParams,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private storage: Storage,
              private onyxService: OnyxService,
              private base64ToGallery: Base64ToGallery,
              private clipboard: Clipboard,
              private permissions: AndroidPermissions,
              private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.onyxResult = this.params.data;
  }

  public doMatch(): void {
    if (this.platform.is(Constants.PLATFORM.CORDOVA)) {
      if (this.onyxResult.base64EncodedFingerprintTemplate) {
        this.onyxService.setCallback(this.onyxSuccessCallback.bind(this));
        this.storage.get(Constants.SESSION.ENROLLED_FINGERPRINT_TEMPLATE).then((value) => {
          let onyxConfig: IOnyxConfiguration = {
            action: Onyx.ACTION.MATCH,
            reference: value || this.onyxResult.base64EncodedFingerprintTemplate,
            probe: this.onyxResult.base64EncodedFingerprintTemplate
          };
          this.onyxService.execOnyx(onyxConfig);
        });
      }
    }
  }

  public saveFingerprintTemplate(): void {
    this.storage.set(Constants.SESSION.ENROLLED_FINGERPRINT_TEMPLATE, this.onyxResult.base64EncodedFingerprintTemplate);
    let toast: Toast = this.toastCtrl.create({
      message: this.translate.instant("page-onyx-result.toast.enrolledFingerprint"),
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }

  public onyxSuccessCallback(error, result: IOnyxResult): void {
    console.log("match result: " + JSON.stringify(result));
    if (error) {
      console.error("Onyx Error: ", error);
      let alert: Alert = this.alertCtrl.create({
        title: this.translate.instant("onyxError.title"),
        message: error,
        buttons: [{text: this.translate.instant("general.ok")}]
      });
      alert.present();
    } else {
      switch (result.action) {
        case Onyx.ACTION.MATCH:
          let alert: Alert = this.alertCtrl.create({
            title: this.translate.instant("page-onyx-result.matchResult"),
            message: this.translate.instant("page-onyx-result.verified") + ": " + result.isVerified + "<br>" +
              this.translate.instant("page-onyx-result.score") + ": " + result.matchScore,
            buttons: [{text: this.translate.instant("general.ok")}]
          });
          alert.present();
          break;
      }
    }
  }

  public saveImagery(): void {
    if (this.platform.is(Constants.PLATFORM.ANDROID)) {
      this.loadingService.setIsLoading(true);
      this.permissions.checkPermission(this.permissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
        .then((result) => {
          console.log("Permission request result: ", result);
          if (!result.hasPermission) {
            this.permissions.requestPermission(this.permissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
              .then((result) => {
                console.log("Request permission result: ", result);
                if (result.hasPermission) {
                  this.saveImages();
                } else {
                  this.loadingService.setIsLoading(false);
                }
              }, (error) => {
                this.loadingService.setIsLoading(false);
                console.error("Error requesting permission: ", error);
              });
          } else {
            this.saveImages();
          }
        }, (error) => {
          this.loadingService.setIsLoading(false);
          console.error("Error checking permission: ", error);
        });
    } else {
      this.saveImages();
    }
  }

  private saveImages(): void {
    this.storage.get(Constants.SESSION.SAVE_IMAGES_COUNT).then((value) => {
      if (!value) {
        value = 0;
      }
      value++;
      if (value <= 10) {
        this.storage.set(Constants.SESSION.SAVE_IMAGES_COUNT, value);
        if (this.onyxResult.rawFingerprintDataUri) {
          this.saveImage(this.getBase64Data(this.onyxResult.rawFingerprintDataUri), "raw_");
        }
        if (this.onyxResult.grayRawFingerprintDataUri) {
          this.saveImage(this.getBase64Data(this.onyxResult.grayRawFingerprintDataUri), "gray_raw_");
        }
        if (this.onyxResult.processedFingerprintDataUri) {
          this.saveImage(this.getBase64Data(this.onyxResult.processedFingerprintDataUri), "processed_");
        }
        if (this.onyxResult.blackWhiteProcessedFingerprintDataUri) {
          this.saveImage(this.getBase64Data(this.onyxResult.blackWhiteProcessedFingerprintDataUri), "bw_processed_");
        }
        if (this.onyxResult.enhancedFingerprintDataUri) {
          this.saveImage(this.getBase64Data(this.onyxResult.enhancedFingerprintDataUri), "enhanced_");
        }
      } else {
        this.loadingService.setIsLoading(false);
        let alert: Alert = this.alertCtrl.create({
          title: this.translate.instant("page-onyx-result.errors.saveImagery.title"),
          message: this.translate.instant("page-onyx-result.errors.saveImagery.limitReached"),
          buttons: [{text: this.translate.instant("general.ok")}]
        });
        alert.present();
      }
    });
  }

  private getBase64Data(imageUri: string): string {
    return imageUri.slice(Constants.IMAGE_URI_PREFIX.length, imageUri.length);
  }


  private saveImage(base64Data: string, prefix: string) {
    this.base64ToGallery.base64ToGallery(base64Data, {prefix: prefix, mediaScanner: true}).then(
      (res) => {
        this.loadingService.setIsLoading(false);
        console.log('Saved image to gallery: ', res);
        this.presentOrQueueToast(this.translate.instant("page-onyx-result.toast.savedImage", {
          path: res
        }));
      },
      (error) => {
        console.error('Error saving image to gallery: ', error);
        this.loadingService.setIsLoading(false);
      }
    );
  }

  public copyToClipboard(value: string): void {
    if (this.platform.is(Constants.PLATFORM.CORDOVA)) {
      this.clipboard.copy(value).then(() => {
        console.log("Successfully copied to clipboard.");
        let toast: Toast = this.toastCtrl.create({
          message: this.translate.instant("page-onyx-result.toast.copiedToClipboard"),
          position: 'bottom',
          duration: 3000
        });
        toast.present();
      });
    }
  }

  private presentOrQueueToast(message?: string): void {
    if (message) {
      this.toastMessages.push(message);
    }
    if (!this.currentToast) {
      if (this.toastMessages.length > 0) {
        this.currentToast = this.toastCtrl.create({
          message: this.toastMessages[0],
          position: 'bottom',
          duration: 1000
        });
        this.currentToast.onDidDismiss(() => {
          this.toastMessages.shift();
          this.currentToast = null;
          if (this.toastMessages.length > 0) {
            this.presentOrQueueToast();
          }
        });
        this.currentToast.present();
      }
    }
  }
}
