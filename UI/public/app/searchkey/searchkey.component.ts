import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSidenav, MatDialog, MatDialogConfig } from "@angular/material";
   
 
import { app_service, confirmDialog } from '../app.service';
import { SearchkeyService } from './searchkey.service';

import { SearchkeyModel } from './searchkey.model';

declare var ace: any; 

@Component({
  selector: 'searchkey',
  templateUrl: './searchkey.html',
  styleUrls: ['./searchkey.css'],
  providers: [  SearchkeyService]
})
export class SearchkeyComponent implements OnInit {

searchSearchkeys;
showComments;
hideComments;
codetext;
   searchkeys = [];
  newSearchkey = new SearchkeyModel();

  title;  

  @ViewChild('searchkeysidenav') searchkeysidenav: MatSidenav;
 
  isDarkTheme = false;
  textm;
  options;
  onChange;
  //remove
  me; 


  constructor(public gsvc: app_service, public dialog: MatDialog, public vcr: ViewContainerRef, private searchkeySvc: SearchkeyService) {
    this.textm = 'test';
    this.options = { printMargin: false, mode: 'javascript' };
    this.onChange = (data) => {
      // this.content
      console.log(data);

    }
  } 
  

  ngOnInit() {
    this.searchkeySvc.query('').then(searchkeylist => { 
      this.searchkeys = searchkeylist;
    }); 
  }
 

  togglenav() {
    // this.sidenav.toggle();
    this.searchkeysidenav.toggle();
  };

  reset() {
    this.newSearchkey = new SearchkeyModel();
     
  };

  // List of this collection 
  listView() { }

  // Save new or edited item
  save() {
    var i = -1;
    var j = 0; 
    this.searchkeys.forEach(searchkey => {
      if (searchkey.id === this.newSearchkey.id) {
        i = j; 
      }
        j++;
    });
 
    this.searchkeySvc.save(this.newSearchkey).then(success  => {
      console.log('success searchkey',success);
      
      if (i >= 0) {
        this.searchkeys[i] = success;
      } else {
        this.searchkeys.push(success);
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
  edit(searchkey) {
    this.newSearchkey = searchkey;
    this.togglenav();

  };

  //Delete one or more items in the collection 
  delete($event, searchkey) {
    console.log(' this.searchkeys-------------', this.searchkeys);
    let msgdata = { title: "Delete", message: "Are you sure you want to delete this searchkey?", option1: "Yes", option2: "No" };
    let dialogRef = this.dialog.open(confirmDialog, { data: msgdata });
    dialogRef.afterClosed().subscribe(result => {
      console.log('result-----------: ', result);
      if (result === "Yes") {

        this.searchkeySvc.delete(searchkey).then( (success)=> {
          var i = this.searchkeys.indexOf(searchkey);
          this.searchkeys.splice(i, 1);
          this.gsvc.showToast('deleted.');
          if (searchkey.id === this.newSearchkey.id) {
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
