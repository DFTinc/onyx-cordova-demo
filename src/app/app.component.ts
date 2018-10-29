import {Component} from '@angular/core';
import {Alert, AlertController, App, NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HeaderColor} from "@ionic-native/header-color";
import {TranslateService} from "@ngx-translate/core";
import {HomePage} from '../pages/home/home';
declare let navigator;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  private exitAlert:Alert;

  constructor(public platform: Platform,
              public translate: TranslateService,
              private app: App,
              private alertCtrl: AlertController,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              headerColor: HeaderColor) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      statusBar.backgroundColorByHexString("#267cb0");
      splashScreen.hide();
      headerColor.tint("#3698D3");
      this.platform.registerBackButtonAction(this.onBackButtonPressed.bind(this));
    });
    this.initializeTranslateServiceConfig();
  }

  private initializeTranslateServiceConfig() {
    let userLang = navigator.language.split('-')[0];
    userLang = /(en|es)/gi.test(userLang) ? userLang : 'en';

    this.translate.setDefaultLang('en');
    this.translate.use(userLang);
  }

  private onBackButtonPressed(event:any):void {
    //console.log("onBackButtonPressed()");
    let activeNav:NavController = this.app.getActiveNav();
    if (!activeNav.canGoBack()) {
      //console.log("On Root Page, can't go back, prompt exit app.");
      if (!this.exitAlert) {
        this.exitAlert = this.alertCtrl.create({
          title: this.translate.instant("general.alerts.exit.title"),
          message: this.translate.instant("general.alerts.exit.message"),
          buttons: [{
            text: this.translate.instant("general.no"),
            role: 'cancel',
            handler: () => {
            }
          }, {
            text: this.translate.instant("general.yes"),
            handler: () => {
              navigator.app.exitApp();
            }
          }]
        });
        this.exitAlert.present();
      } else {
        this.exitAlert.dismiss();
        this.exitAlert = null;
      }
    } else {
      activeNav.pop();
    }
  }
}

