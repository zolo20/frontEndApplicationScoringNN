import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { MainPageComponent } from './main-page/main-page.component';

import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {KeyFilterModule} from 'primeng/keyfilter';
import {CheckboxModule} from 'primeng/checkbox';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {InputSwitchModule} from 'primeng/inputswitch';
import {SliderModule} from 'primeng/slider';
import {TooltipModule} from 'primeng/tooltip';
import {TableModule} from 'primeng/table';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from './common/http.service';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';


const routes: Routes = [
  {path: '', redirectTo: '/education-neural-network', pathMatch: 'full' },
  {path: 'education-neural-network', component: MainPageComponent },
  {path: 'admin-page', component: AdminPageComponent },
  {path: '**', redirectTo: '/education-neural-network', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
    FormsModule,
    KeyFilterModule,
    CheckboxModule,
    MessagesModule,
    MessageModule,
    InputSwitchModule,
    SliderModule,
    TooltipModule,
    TableModule,
    ToastModule,
    DialogModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [{provide: HttpService, useClass: HttpService}, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
