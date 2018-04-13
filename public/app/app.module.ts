import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; 
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,MatFormFieldModule ,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';


@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,MatFormFieldModule ,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule
  ]
})
export class MaterialModules { }

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 
import { confirmDialog } from './app.service';
import { app_service  } from './app.service';
//Import custom components
import { AppComponent, SettingsDialog } from './app.component'; 
 
import { ContactsComponent } from './contacts/contacts.component'; 

 import { GatekeeperComponent } from './gatekeeper/gatekeeper.component'; 
import { SearchkeyComponent } from './searchkey/searchkey.component'; 
import { SearchlistComponent } from './searchlist/searchlist.component'; 
import { Searchlist1Component } from './searchlist1/searchlist1.component'; 
import { Searchlist123Component } from './searchlist123/searchlist123.component'; 
 

@NgModule({
  declarations: [
    AppComponent,    ContactsComponent,    GatekeeperComponent,       SearchkeyComponent,       SearchlistComponent,       Searchlist1Component,       Searchlist123Component,     SettingsDialog, confirmDialog
  ],
  entryComponents: [
    AppComponent,
    SettingsDialog, confirmDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, //angular 4
    FormsModule,
    HttpModule,    
    MaterialModules,
    RouterModule.forRoot([
      { path: '', redirectTo: '/gatekeeper', pathMatch: 'full' },
              { path: 'gatekeeper', component: GatekeeperComponent },       
                { path: 'searchkey', component: SearchkeyComponent },       
                { path: 'searchlist', component: SearchlistComponent },       
                { path: 'searchlist1', component: Searchlist1Component },       
                { path: 'searchlist123', component: Searchlist123Component },       
          
        { path: '**', redirectTo: '' }   
    ]),
    
  ],
  providers: [ app_service],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
