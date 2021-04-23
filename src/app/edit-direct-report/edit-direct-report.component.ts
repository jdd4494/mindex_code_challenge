import {Component, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

import {Subject} from "rxjs/Subject";
import {Employee} from '../employee';

@Component({
  selector: 'app-edit-direct-report',
  templateUrl: './edit-direct-report.component.html',
  styleUrls: ['./edit-direct-report.component.css']
})
export class EditDirectReportComponent {

  private saveClickStream$ = new Subject<Event>();
  private closeClickStream$ = new Subject<Event>();

  @Output() saveClick$ = this.saveClickStream$.asObservable();
  @Output() closeClick$ = this.closeClickStream$.asObservable();

  constructor(
    private dialogRef: MatDialogRef<EditDirectReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {}

  saveClick(event:Event){
    this.saveClickStream$.next(event);

    // [TODO] Is there a cleaner way of passing in form data
    this.dialogRef.close(event.target.elements[3].value);
  }

  closeClick(event:Event){
    this.closeClickStream$.next(event);
    this.dialogRef.close();
  }
}
