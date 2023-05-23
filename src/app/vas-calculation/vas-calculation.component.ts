import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPlan } from '../Interfaces/IPlan';
import { ConfirmationService } from '../Services/confirmation.service';
import { PlanService } from '../Services/plan.service';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
export const MY_FORMATS = {
  parse: {
    dateInput: "MM-YYYY",
  },
  display: {
    dateInput: "MM-YYYY",
    monthYearLabel: "MMM-YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM-YYYY",
  },
};
@Component({
  selector: 'app-vas-calculation',
  templateUrl: './vas-calculation.component.html',
  styleUrls: ['./vas-calculation.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS,
    },
  ],
})
export class VasCalculationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<IPlan>;
  Plans: any;
  displayedColumns: string[] = ["month", "pointPrice", "minValue", "dateFrom", "dateTo", "userName", "dateEntry", "userUpdate", "dateUpdated", "Options"];
  constructor(private planserv: PlanService, private fb: FormBuilder, private sb: MatSnackBar, public dialog: MatDialog, private conf: ConfirmationService) { }
  VasForm: FormGroup = new FormGroup({});

  onsubmit() { }
  ngOnInit(): void {
    this.VasForm = this.fb.group({
      Month: new FormControl(moment(), [Validators.required]),
      Service: new FormControl("", [Validators.required]),
      Points: new FormControl("", [Validators.required]),
    });


  }
  get f() {
    return this.VasForm.controls
  }
  setMonthAndYear(normalizedMonthAndYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue = this.f["Month"].value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.f["Month"].setValue(ctrlValue);
    datepicker.close();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
