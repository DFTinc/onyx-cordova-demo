import {Component, NgZone, OnInit} from '@angular/core';
import {App, NavController, Platform} from "ionic-angular/es2015";
import {MeteorComponent} from 'angular2-meteor';
import {Meteor} from "meteor/meteor";
import {Session} from "meteor/session";
import {TranslateService} from "@ngx-translate/core";
import {Constants} from "../../../../../both/Constants";
import {IOnyxConfiguration, OnyxService} from "../../utils/OnyxService";
import {OnyxResultPage} from "../onyx-result/onyx-result";

declare var Onyx;

@Component({
    selector: "page-home",
    templateUrl: "home.html"
})
export class HomePage extends MeteorComponent implements OnInit {
    public user: Meteor.User;
    public onyxConfig: IOnyxConfiguration = {
        returnRawImage: false,
        returnProcessedImage: false,
        returnEnhancedImage: false,
        returnFingerprintTemplate: false,
        returnWSQ: false,
        shouldSegment: false,
        shouldConvertToISOTemplate: false,
        imageRotation: 0,
        wholeFingerCrop: false,
        useManualCapture: false,
        useOnyxLive: false,
        useFlash: true,
        showLoadingSpinner: true,
        showBackButton: true,
        reticleOrientation: Constants.RETICLE_ORIENTATION.LEFT,
        reticleAngle: 0,
        reticleScale: 1.0,
        flip: Constants.FLIP.HORIZONTAL,
        backgroundColorHexString: "#3698D3",
        cropFactor: 0.8,
        cropSize: {width: 512, height: 300},
        layoutPreference: Constants.LAYOUT_PREFERENCE.UPPER_THIRD
    };
    public ONYX_LAYOUT_PREFERENCE: any = Object.keys(Constants.LAYOUT_PREFERENCE);
    public ONYX_FLIP: any = Object.keys(Constants.FLIP);
    public ONYX_RETICLE_ORIENTATION: any = Object.keys(Constants.RETICLE_ORIENTATION);
    public ONYX_IMAGE_ROTATION: any = Object.keys(Constants.IMAGE_ROTATION);

    constructor(public app: App,
                public nav: NavController,
                public platform: Platform,
                public zone: NgZone,
                public translate: TranslateService,
                public onyxService: OnyxService) {
        super();
    }

    ngOnInit() {
        // Use MeteorComponent autorun to respond to reactive session variables.
        this.autorun(() => this.zone.run(() => {
            this.user = Meteor.user();

            // Wait for translations to be ready
            // in case component loads before the language is set
            // or the language is changed after the component has been rendered.
            // Since this is the home page, this component and any child components
            // will need to wait for translations to be ready.
            if (Session.get(Constants.SESSION.TRANSLATIONS_READY)) {
                this.translate.get('page-home.title').subscribe((translation: string) => {

                    // Set title of web page in browser
                    this.app.setTitle(translation);
                });
            }
        }));

        if (this.platform.is("ios")) {
            this.onyxConfig.cropFactor = 0.9;
            this.onyxConfig.cropSize = {width: 600, height: 960};
        }
    }

    public capture(): void {
        if (Meteor.isCordova) {
            this.onyxService.setCallback(this.onyxSuccessCallback.bind(this));
            this.onyxConfig.action = Onyx.ACTION.CAPTURE;
            this.onyxService.execOnyx(this.onyxConfig);
        }
    }

    public onyxSuccessCallback(result): void {
        switch (result.action) {
            case Onyx.ACTION.MATCH:

                break;
            case Onyx.ACTION.CAPTURE:
                this.nav.push(OnyxResultPage, result);
                break;
        }
    }
}
