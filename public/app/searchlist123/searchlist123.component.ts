import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSidenav, MatDialog, MatDialogConfig } from "@angular/material";
   
 
import { app_service, confirmDialog } from '../app.service';
import { Searchlist123Service } from './searchlist123.service';

import { Searchlist123Model } from './searchlist123.model';

declare var ace: any; 

@Component({
  selector: 'searchlist123',
  templateUrl: './searchlist123.html',
  styleUrls: ['./searchlist123.css'],
  providers: [  Searchlist123Service]
})
export class Searchlist123Component implements OnInit {

searchSearchlist123s;
showComments;
hideComments;
codetext;
   searchlist123S = [];
  newSearchlist123 = new Searchlist123Model();

  title;  

  @ViewChild('searchlist123sidenav') searchlist123sidenav: MatSidenav;
 
  isDarkTheme = false;
  textm;
  options;
  onChange;
  //remove
  me; 


  constructor(public gsvc: app_service, public dialog: MatDialog, public vcr: ViewContainerRef, private searchlist123Svc: Searchlist123Service) {
    this.textm = 'test';
    this.options = { printMargin: false, mode: 'javascript' };
    this.onChange = (data) => {
      // this.content
      console.log(data);

    }
  } 
  

  ngOnInit() {
    this.searchlist123Svc.query('').then(searchlist123list => { 
      this.searchlist123S = searchlist123list;
    }); 
  }
 

  togglenav() {
    // this.sidenav.toggle();
    this.searchlist123sidenav.toggle();
  };

  reset() {
    this.newSearchlist123 = new Searchlist123Model();
     
  };

  // List of this collection 
  listView() { }

  // Save new or edited item
  save() {
    var i = -1;
    var j = 0; 
    this.searchlist123S.forEach(searchlist123 => {
      if (searchlist123.id === this.newSearchlist123.id) {
        i = j; 
      }
        j++;
    });
 
    this.searchlist123Svc.save(this.newSearchlist123).then(success  => {
      console.log('success searchlist123',success);
      
      if (i >= 0) {
        this.searchlist123S[i] = success;
      } else {
        this.searchlist123S.push(success);
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
  edit(searchlist123) {
    this.newSearchlist123 = searchlist123;
    this.togglenav();

  };

  //Delete one or more items in the collection 
  delete($event, searchlist123) {
    console.log(' this.searchlist123S-------------', this.searchlist123S);
    let msgdata = { title: "Delete", message: "Are you sure you want to delete this searchlist123?", option1: "Yes", option2: "No" };
    let dialogRef = this.dialog.open(confirmDialog, { data: msgdata });
    dialogRef.afterClosed().subscribe(result => {
      console.log('result-----------: ', result);
      if (result === "Yes") {

        this.searchlist123Svc.delete(searchlist123).then( (success)=> {
          var i = this.searchlist123S.indexOf(searchlist123);
          this.searchlist123S.splice(i, 1);
          this.gsvc.showToast('deleted.');
          if (searchlist123.id === this.newSearchlist123.id) {
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
