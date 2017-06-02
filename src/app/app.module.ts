import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component'
import { WrapperComponent } from './common/wrapper/wrapper.component'
import { SidebarComponent } from './common/sidebar/sidebar.component'
import { HeaderComponent } from './common/header.component'
import { FooterComponent } from './common/footer.component'
import { LeftComponent } from './common/left.component'
import { RightComponent } from './common/right.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LeftComponent,
    RightComponent,
    WrapperComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }