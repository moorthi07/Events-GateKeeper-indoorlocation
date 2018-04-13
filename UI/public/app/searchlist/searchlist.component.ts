import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSidenav, MatDialog, MatDialogConfig } from "@angular/material";
   
 
import { app_service, confirmDialog } from '../app.service';
import { SearchlistService } from './searchlist.service';

import { SearchlistModel } from './searchlist.model';

declare var ace: any; 

@Component({
  selector: 'searchlist',
  templateUrl: './searchlist.html',
  styleUrls: ['./searchlist.css'],
  providers: [  SearchlistService]
})
export class SearchlistComponent implements OnInit {

searchSearchlists;
showComments;
hideComments;
codetext;
   searchlists = [];
  newSearchlist = new SearchlistModel();

  title;  

  @ViewChild('searchlistsidenav') searchlistsidenav: MatSidenav;
 
  isDarkTheme = false;
  textm;
  options;
  onChange;
  //remove
  me; 


  constructor(public gsvc: app_service, public dialog: MatDialog, public vcr: ViewContainerRef, private searchlistSvc: SearchlistService) {
    this.textm = 'test';
    this.options = { printMargin: false, mode: 'javascript' };
    this.onChange = (data) => {
      // this.content
      console.log(data);

    }
  } 
  

  ngOnInit() {
    this.searchlistSvc.query('').then(searchlistlist => { 
      this.searchlists = searchlistlist;
    }); 
  }
 

  togglenav() {
    // this.sidenav.toggle();
    this.searchlistsidenav.toggle();
  };

  reset() {
    this.newSearchlist = new SearchlistModel();
     
  };

  // List of this collection 
  listView() { }

  // Save new or edited item
  save() {
    var i = -1;
    var j = 0; 
    this.searchlists.forEach(searchlist => {
      if (searchlist.id === this.newSearchlist.id) {
        i = j; 
      }
        j++;
    });
 
    this.searchlistSvc.save(this.newSearchlist).then(success  => {
      console.log('success searchlist',success);
      
      if (i >= 0) {
        this.searchlists[i] = success;
      } else {
        this.searchlists.push(success);
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
  edit(searchlist) {
    this.newSearchlist = searchlist;
    this.togglenav();

  };

  //Delete one or more items in the collection 
  delete($event, searchlist) {
    console.log(' this.searchlists-------------', this.searchlists);
    let msgdata = { title: "Delete", message: "Are you sure you want to delete this searchlist?", option1: "Yes", option2: "No" };
    let dialogRef = this.dialog.open(confirmDialog, { data: msgdata });
    dialogRef.afterClosed().subscribe(result => {
      console.log('result-----------: ', result);
      if (result === "Yes") {

        this.searchlistSvc.delete(searchlist).then( (success)=> {
          var i = this.searchlists.indexOf(searchlist);
          this.searchlists.splice(i, 1);
          this.gsvc.showToast('deleted.');
          if (searchlist.id === this.newSearchlist.id) {
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
