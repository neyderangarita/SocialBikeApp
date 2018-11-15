import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';
import {ToolsService} from "../providers/tools";
import {MyApp} from "./app.component";
import { AuthProvider } from '../providers/auth/auth';
import { Api2Provider } from '../providers/api2/api2';
import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(
      MyApp,
      {
        preloadModules: true,
        scrollPadding: false,
        scrollAssist: true,
        autoFocusAssist: false
      }
    ),
    IonicStorageModule.forRoot({
      name: '__ionBookingDB',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  
  providers: [  
    StatusBar,
    SplashScreen,
    Keyboard,
    ToolsService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    Api2Provider,
    SocialSharing,
  ]
  
})

export class AppModule {}
