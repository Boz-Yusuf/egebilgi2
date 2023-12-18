import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SentenceAreaComponent } from './sentence/sentence-area/sentence-area.component';
import { NavbarComponent } from './sentence/navbar/navbar.component';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { OptionAreaComponent } from './sentence/option-area/option-area.component';
import { SelectedWordsAreaComponent } from './sentence/selected-words-area/selected-words-area.component';
import { LabelPipe } from './sentence/label.pipe';
import { DataComponent } from './data/data.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    SentenceAreaComponent,
    NavbarComponent,
    OptionAreaComponent,
    SelectedWordsAreaComponent,
    LabelPipe,
    DataComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AuthModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
