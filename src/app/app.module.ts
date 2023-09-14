import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // @angular
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,

    //feature


    // app
    FlexLayoutModule,
    AppRoutingModule,
    CoreModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
