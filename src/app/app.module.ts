import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {HeaderColor} from "@ionic-native/header-color";
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {IonicStorageModule} from "@ionic/storage";
import {FormsModule} from "@angular/forms";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {OnyxResultPage} from "../pages/onyx-result/onyx-result";
import {LoadingService} from "../services/loading.service";
import {UserService} from "../services/user.service";
import {OnyxService} from "../services/onyx.service";
import {Base64ToGallery} from "@ionic-native/base64-to-gallery";
import {Clipboard} from "@ionic-native/clipboard";
import {AndroidPermissions} from "@ionic-native/android-permissions";
import {Device} from "@ionic-native/device";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OnyxResultPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp, {
      //// http://ionicframework.com/docs/v2/api/config/Config/
      swipeBackEnabled: false
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    OnyxResultPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Device,
    HeaderColor,
    Clipboard,
    Base64ToGallery,
    AndroidPermissions,
    LoadingService,
    UserService,
    OnyxService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

export class AppModule {
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
