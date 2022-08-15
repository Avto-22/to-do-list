import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    SharedModule,
    StoreDevtoolsModule.instrument({
      maxAge:25, // ბოლოს 25 state
      logOnly:environment.production,
      autoPause:true // დაპაუზდეს სტეიტის ჩაწერა როცა extension-ის ფანჯარა არაა ღია
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }