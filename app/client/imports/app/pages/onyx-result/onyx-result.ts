import {Component, NgZone, OnInit} from '@angular/core';
import {Alert, AlertController, NavController, NavParams} from "ionic-angular/es2015";
import {MeteorComponent} from 'angular2-meteor';
import {Meteor} from "meteor/meteor";
import {TranslateService} from "@ngx-translate/core";
import {DomSanitizer} from "@angular/platform-browser";
import {IOnyxConfiguration, IOnyxResult, OnyxService} from "../../utils/OnyxService";
import {Constants} from "../../../../../both/Constants";
import {ToastMessenger} from "../../utils/ToastMessenger";

declare var Onyx;

@Component({
    selector: "page-onyx-result",
    templateUrl: "onyx-result.html"
})
export class OnyxResultPage extends MeteorComponent implements OnInit {
    public user: Meteor.User;
    public onyxResult: IOnyxResult;

    constructor(public nav: NavController,
                public params: NavParams,
                public alertCtrl: AlertController,
                public zone: NgZone,
                public translate: TranslateService,
                public domSanitizer: DomSanitizer,
                public onyxService: OnyxService) {
        super();
    }

    ngOnInit() {
        this.onyxResult = this.params.data;
        this.autorun(() => {
            this.user = Meteor.user();
        });
    }

    public doMatch(): void {
        if (Meteor.isCordova) {
            if (this.onyxResult.base64EncodedFingerprintTemplate) {
                this.onyxService.setCallback(this.onyxSuccessCallback.bind(this));
                let onyxConfig:IOnyxConfiguration = {
                    action: Onyx.ACTION.MATCH,
                    reference: Session.get(Constants.SESSION.ENROLLED_FINGERPRINT_TEMPLATE) || this.onyxResult.base64EncodedFingerprintTemplate,
                    probe: this.onyxResult.base64EncodedFingerprintTemplate
                };
                this.onyxService.execOnyx(onyxConfig);
            }
        }
    }

    public saveFingerprintTemplate(): void {
        Session.set(Constants.SESSION.ENROLLED_FINGERPRINT_TEMPLATE, this.onyxResult.base64EncodedFingerprintTemplate);
        new ToastMessenger().toast({
            type: "success",
            message: this.translate.instant("page-onyx-result.toast.enrolledFingerprint")
        });
    }

    public onyxSuccessCallback(result: IOnyxResult): void {
        console.log("match result: " + JSON.stringify(result));
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