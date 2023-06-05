import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HomeComponent } from './components/home/home.component';
import { MailComponent } from './components/mail/mail.component';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import { ChartComponent } from './components/chart/chart.component';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import { DataService } from './service/data-service.service';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { TableComponent } from './components/table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    MailComponent,
    ChartComponent,
    TableComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
