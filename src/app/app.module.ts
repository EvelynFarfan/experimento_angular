import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component'
import { WrapperComponent } from './common/wrapper/wrapper.component'
import { NavbarComponent } from './common/navbar/navbar.component' //
import { SidebarComponent } from './common/sidebar/sidebar.component' //
import { PageWrapperComponent } from './common/page-wrapper/page-wrapper.component' 
import { TitleContentComponent } from './common/title-content/title-content.component'
import { CollapseComponent } from './common/collapse/collapse.component' 
import { CardComponent } from './common/card/card.component'
import { FooterComponent } from './common/footer/pie.component'//

@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent,
    SidebarComponent,
    NavbarComponent,
    PageWrapperComponent,
    TitleContentComponent,
    CollapseComponent,
    CardComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }