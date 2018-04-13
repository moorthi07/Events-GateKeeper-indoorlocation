import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSidenav, MatDialog, MatDialogConfig } from "@angular/material";
   
 
import { app_service, confirmDialog } from '../app.service';
import { Searchlist1Service } from './searchlist1.service';

import { Searchlist1Model } from './searchlist1.model';

declare var ace: any; 

@Component({
  selector: 'searchlist1',
  templateUrl: './searchlist1.html',
  styleUrls: ['./searchlist1.css'],
  providers: [  Searchlist1Service]
})
export class Searchlist1Component implements OnInit {

searchSearchlist1s;
showComments;
hideComments;
codetext;
   searchlist1S = [];
  newSearchlist1 = new Searchlist1Model();

  title;  

  @ViewChild('searchlist1sidenav') searchlist1sidenav: MatSidenav;
 
  isDarkTheme = false;
  textm;
  options;
  onChange;
  //remove
  me; 


  constructor(public gsvc: app_service, public dialog: MatDialog, public vcr: ViewContainerRef, private searchlist1Svc: Searchlist1Service) {
    this.textm = 'test';
    this.options = { printMargin: false, mode: 'javascript' };
    this.onChange = (data) => {
      // this.content
      console.log(data);

    }
  } 
  

  ngOnInit() {
    this.searchlist1Svc.query('').then(searchlist1list => { 
      this.searchlist1S = searchlist1list;
    }); 
  }
 

  togglenav() {
    // this.sidenav.toggle();
    this.searchlist1sidenav.toggle();
  };

  reset() {
    this.newSearchlist1 = new Searchlist1Model();
     
  };

  // List of this collection 
  listView() { }

  // Save new or edited item
  save() {
    var i = -1;
    var j = 0; 
    this.searchlist1S.forEach(searchlist1 => {
      if (searchlist1.id === this.newSearchlist1.id) {
        i = j; 
      }
        j++;
    });
 
    this.searchlist1Svc.save(this.newSearchlist1).then(success  => {
      console.log('success searchlist1',success);
      
      if (i >= 0) {
        this.searchlist1S[i] = success;
      } else {
        this.searchlist1S.push(success);
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
  edit(searchlist1) {
    this.newSearchlist1 = searchlist1;
    this.togglenav();

  };

  //Delete one or more items in the collection 
  delete($event, searchlist1) {
    console.log(' this.searchlist1S-------------', this.searchlist1S);
    let msgdata = { title: "Delete", message: "Are you sure you want to delete this searchlist1?", option1: "Yes", option2: "No" };
    let dialogRef = this.dialog.open(confirmDialog, { data: msgdata });
    dialogRef.afterClosed().subscribe(result => {
      console.log('result-----------: ', result);
      if (result === "Yes") {

        this.searchlist1Svc.delete(searchlist1).then( (success)=> {
          var i = this.searchlist1S.indexOf(searchlist1);
          this.searchlist1S.splice(i, 1);
          this.gsvc.showToast('deleted.');
          if (searchlist1.id === this.newSearchlist1.id) {
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
