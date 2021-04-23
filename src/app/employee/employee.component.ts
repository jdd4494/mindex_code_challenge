import {Component, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {Subject} from "rxjs/Subject";
import {Employee} from '../employee';
import {EditDirectReportComponent} from '../edit-direct-report/edit-direct-report.component';
import {DeleteDirectReportComponent} from '../delete-direct-report/delete-direct-report.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  private editClickStream$ = new Subject<Event>();
  private deleteClickStream$ = new Subject<Event>();

  @Input() employee: Employee;
  @Input() employees: Array<Employee>; // [TODO] This should ideally only possess direct report employees
  @Output() onEditClick$ = this.editClickStream$.asObservable();
  @Output() onDeleteClick$ = this.deleteClickStream$.asObservable();

  constructor(public dialog: MatDialog) {}

  editButtonClick(event:Event, index:Number) {
      console.log("EDIT: " + index);
      this.editClickStream$.next(event);

      // Open edit compensation dialogue -> Pass in employee data
      const dialogRef = this.dialog.open(EditDirectReportComponent, {
        data: {
          firstName: this.employees[index].firstName,
          lastName: this.employees[index].lastName,
          title: this.employees[index].position,
          compensation: this.employees[index].compensation
        }
      });

      // Save form data when save button on form is clicked
      dialogRef.afterClosed().subscribe(result => {
        if (typeof result !== "undefined")
        {
          this.employees[index].compensation = result;
        }
      });
  }

  deleteButtonClick(event:Event, index:Number){
     console.log("DELETE");
     this.deleteClickStream$.next(event);

     // Open edit compensation dialogue -> Pass in employee data
     const dialogRef = this.dialog.open(DeleteDirectReportComponent, {
       data: {
         firstName: this.employees[index].firstName,
         lastName: this.employees[index].lastName
       }
     });

     // Save form data when save button on form is clicked
     dialogRef.afterClosed().subscribe(result => {
       if (typeof result !== "undefined")
       {
          for(let i=0;i<this.employee.directReports.length ;i++){  //How to properly iterate here!!
            if(this.employee.directReports[i]-1 == index){
              this.employee.directReports.splice(i, 1);
            }
          }
       }
     });
  }
}
