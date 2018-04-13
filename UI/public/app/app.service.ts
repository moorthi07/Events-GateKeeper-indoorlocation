import { Component, Injectable, Inject, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { MatSnackBar } from "@angular/material";

import { environment } from '../environments/environment';  



//app_service used as global helper service
@Injectable()
export class app_service {

  public title = "GateKeeper";
  public BaseURL = ""; //environment.baseUrl;
  public me; 

  constructor(private http: Http, public mdToast: MatSnackBar, public dialog: MatDialog) { }
   

  showToast(message) {
    // this.snackBar.open(message);
    this.mdToast.open(message, "alert", {
      duration: 2000,
    })

  };

  showDialog(msgdata): any {
    let result1;
    let dialogRef = this.dialog.open(confirmDialog, { data: msgdata });
    dialogRef.afterClosed().subscribe(result => {

      result1 = result;
      console.log('result33: ', result1);
      return result1;
    });

  };


}
// End Class 

//** NOTE :  If selector :'dialog' - like the name of the class , its not showing the template. When you change to different name it shows up.
//Err: Error: No provider for Token MatDialogData!
@Component({
  selector: 'global-dialog',
  // template : './dialog-result-example-dialog.html',
  template: `<h1 md-dialog-title>{{data.title}}</h1>
<div md-dialog-content>{{data.message}}</div>
<div md-dialog-actions>
  <button mat-button (click)="sendresult()">{{data.option1}}</button>
  <button mat-button (click)="dialogRef.close(data.option2)">{{data.option2}}</button>
</div>`
})
export class confirmDialog {
  constructor(public dialogRef: MatDialogRef<confirmDialog>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  sendresult() {
    this.dialogRef.close(this.data.option1);
  }
}






