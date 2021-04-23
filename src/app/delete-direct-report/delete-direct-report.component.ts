import {Component, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

import {Subject} from "rxjs/Subject";
import {Employee} from '../employee';

@Component({
  selector: 'app-delete-direct-report',
  templateUrl: './delete-direct-report.component.html',
  styleUrls: ['./delete-direct-report.component.css']
})
export class DeleteDirectReportComponent {

  private saveClickStream$ = new Subject<Event>();
  private closeClickStream$ = new Subject<Event>();

  @Output() saveClick$ = this.saveClickStream$.asObservable();
  @Output() closeClick$ = this.closeClickStream$.asObservable();

  constructor(
    private dialogRef: MatDialogRef<DeleteDirectReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {}

  deleteClick(event:Event){
    this.saveClickStream$.next(event);
    this.dialogRef.close("delete");
  }

  closeClick(event:Event){
    this.closeClickStream$.next(event);
    this.dialogRef.close();
  }
}
