import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSidenav, MatDialog, MatDialogConfig } from "@angular/material";
   
 
import { app_service, confirmDialog } from '../app.service';
import { GatekeeperService } from './gatekeeper.service';

import { ContactsModel } from './gatekeeper.model';

declare var ace: any; 

@Component({
  selector: 'contacts',
  templateUrl: './gatekeeper.html',
  styleUrls: ['./gatekeeper.css'],
  providers: [  GatekeeperService]
})
export class GatekeeperComponent implements OnInit {

searchContactss;
showComments;
hideComments;
codetext;
   contacts = [];
   tags =[];
  newContacts = new ContactsModel();

  title;  

  @ViewChild('contactssidenav') contactssidenav: MatSidenav;
 
  isDarkTheme = false;
  textm;
  options;
  onChange;
  //remove
  me; 


  constructor(public gsvc: app_service, public dialog: MatDialog, public vcr: ViewContainerRef, private contactsSvc: GatekeeperService) {
    this.textm = 'test';
    this.options = { printMargin: false, mode: 'javascript' };
    this.onChange = (data) => {
      // this.content
      console.log(data);

    }
  } 
  

  ngOnInit() {
    // this.contactsSvc.resget().then(contactslist => { 
      this.contactsSvc.query('').then(contactslist => { 
      this.contacts = contactslist;
      console.log('events',this.contacts);
    }); 

    this.contactsSvc.resget().then(contactslist1 => {  
        this.tags = contactslist1;
        console.log('tags----',this.tags);
      }); 
  }
 

  togglenav() {
    // this.sidenav.toggle();
    this.contactssidenav.toggle();
  };

  reset() {
    this.newContacts = new ContactsModel();
     
  };

  // List of this collection 
  listView() { }

  // Save new or edited item
  save() {
    var i = -1;
    var j = 0; 
    this.contacts.forEach(contacts => {
      if (contacts.id === this.newContacts.id) {
        i = j; 
      }
        j++;
    });
 
    this.contactsSvc.save(this.newContacts).then(success  => {
      console.log('success contacts',success);
      
      if (i >= 0) {
        this.contacts[i] = success;
      } else {
        this.contacts.push(success);
      };

      this.gsvc.showToast('Saved!');

      this.reset();
    },   (err)=> {
      if (err.status === 401) {
        this.gsvc.showToast('Unauthorized'); 
      } else { 
        this.gsvc.showToast('An error occured!');
      }
    });
     
  };

  // Edit selected item from ListView
  edit(contacts) {
    this.newContacts = contacts;
    this.togglenav();

  };

  //Delete one or more items in the collection 
  delete($event, contacts) {
    console.log(' this.contacts-------------', this.contacts);
    let msgdata = { title: "Delete", message: "Are you sure you want to delete this contacts?", option1: "Yes", option2: "No" };
    let dialogRef = this.dialog.open(confirmDialog, { data: msgdata });
    dialogRef.afterClosed().subscribe(result => {
      console.log('result-----------: ', result);
      if (result === "Yes") {

        this.contactsSvc.delete(contacts).then( (success)=> {
          var i = this.contacts.indexOf(contacts);
          this.contacts.splice(i, 1);
          this.gsvc.showToast('deleted.');
          if (contacts.id === this.newContacts.id) {
            // delete this.comments;
            // this.hideComments();
          }
          this.reset();
        }, (err)  => {
          console.log(err);
          if (err.status === 401) {
            this.gsvc.showToast('Unauthorized.'); 
          } else {
            console.log(err);
            this.gsvc.showToast('An error occured!');

          }
        });
      }
      //  Endif

    });

  };
 
  openDialog() { 

  } 
}

