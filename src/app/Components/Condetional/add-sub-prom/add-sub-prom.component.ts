import { DialogRef } from '@angular/cdk/dialog';
import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CondetionalService } from 'src/app/Services/condetional.service';
import { ConfirmationService } from 'src/app/Services/confirmation.service';
interface bool {
  value: any;
  viewValue: string;
}
@Component({
  selector: 'app-add-sub-prom',
  templateUrl: './add-sub-prom.component.html',
  styleUrls: ['./add-sub-prom.component.scss']
})
export class AddSubPromComponent implements OnInit {
  newContraList: bool[] = [
    { value: null, viewValue: 'All' },
    { value: 0, viewValue: 'No' },
    { value: 1, viewValue: 'Yes' },
  ];
  firstDay: any
  lastDay: any
  subDirectsalesform: FormGroup = new FormGroup({});
  displayedColumns: string[] = ["rangeFrom", "rangeTo", "points", "Options"];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  region!: Observable<string[]>;
  city!: Observable<string[]>;
  zone!: Observable<string[]>;
  Area!: Observable<string[]>;
  SubArea!: Observable<string[]>;
  subDealer!: Observable<string[]>;
  dataa: Array<any> = [];
  TitlePlan: string = "";
  date!: Date
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private Conditional: CondetionalService,
    public dialog: MatDialog,
    public dialogref: DialogRef,
    public router: Router,
    private sb: MatSnackBar,
    private conf: ConfirmationService,
    private datePipe: DatePipe,
  ) { }
  get f() {
    return this.subDirectsalesform.controls;
  }

  get Ranges(): FormArray {
    return this.subDirectsalesform.get("subConfigs") as FormArray;
  }
  getRegion() {
    this.region = this.Conditional.GetRegion();
  }

  getCity() {
    this.city = this.Conditional.GetCity(this.f["REGION"].value);
  }
  getZone() {
    this.zone = this.Conditional.GetZone(this.f["CITY"].value);
  }
  getArea() {
    this.Area = this.Conditional.GetArea(this.f["ZONE"].value);
  }
  getSubArea() {
    this.SubArea = this.Conditional.GetSubArea(this.f["AREA"].value);
  }
  getSubdealr() {
    this.subDealer = this.Conditional.GetSdCode(this.f["SUBAREA"].value);
  }
  onsubmit() {
    console.log(this.subDirectsalesform.getRawValue());

    this.conf
      .confirmation({
        Title: "Adding new SubConfiguration",
        Message: "Are You Sure You Want to Add SubConfiguration",
        Confirm: "Add SubConfiguration",
        Cancel: "Close",
      })
      .subscribe((datax) => {
        if (datax) {
          if (this.subDirectsalesform.valid) {
            this.Conditional.AddConditionaltProm(this.subDirectsalesform.getRawValue()).subscribe();
          } else {
            this.sb.open(" Plese Complete the Form  one or more options are required");
          }
        }
      });
  }
  reset() {
    this.subDirectsalesform.controls["REGION"].reset();
    this.subDirectsalesform.controls["CITY"].reset();
    this.subDirectsalesform.controls["ZONE"].reset();
    this.subDirectsalesform.controls["AREA"].reset();
    this.subDirectsalesform.controls["SUBAREA"].reset();
    this.subDirectsalesform.controls["DateFrom"].reset();
    this.subDirectsalesform.controls["DateTo"].reset();
  }
  ngOnInit(): void {

    this.getRegion();
    this.subDirectsalesform = this.fb.group({
      Month: new FormControl({ value: "", disabled: true }),
      PlanId: new FormControl({ value: "", disabled: true }),
      RangeId: new FormControl(),
      DateFrom: new FormControl("", [Validators.required]),
      // DateFrom: new FormControl(moment().add(1, 'd').format("DD /MM /YYYY"),[Validators.required]),

      DateTo: new FormControl("", [Validators.required]),
      REGION: new FormControl(),
      CITY: new FormControl(),
      ZONE: new FormControl(),
      AREA: new FormControl(),
      SUBAREA: new FormControl(),
      NEWCONTRA: new FormControl(),
      SUBDEALER: new FormControl(),
      SubConfigId: new FormControl({ value: "", disabled: true }),
      subConfigs: new FormArray([
        // this.fb.group({
        //   RangeFrom: new FormControl(0),
        //   RangeTo: new FormControl(),
        //   Points: new FormControl(),
        //   ExtraPoints: new FormControl(''),
        // }),
      ]),
    });
    // console.log(this.data.planId);
    this.Conditional.GetAllDirectconfigbyidProm(this.data.planidProm).subscribe((x: any) => {
      this.dataa = x;
      var xt = this.dataa[0].month;
      const day = new Date(xt);
      this.firstDay = new Date(day.getFullYear(), day.getMonth(), 1);
      this.lastDay = new Date(day.getFullYear(), day.getMonth() + 1, 0);
      var month = this.datePipe.transform(this.firstDay, 'MM-yyyy')
      this.f["Month"].setValue(month);
      this.f["PlanId"].setValue(this.dataa[0].planId);
      this.f["SubConfigId"].setValue(Math.floor(Math.random() * 2147483640 + 1));
      this.f["DateFrom"].setValue(this.dataa[0].month);
      this.f["DateTo"].setValue(this.dataa[0].month);
      this.TitlePlan = this.dataa[0].month;
      this.dataa.forEach((element: any) => {
        (this.subDirectsalesform.get("subConfigs") as FormArray).push(
          new FormGroup({
            RangeId: new FormControl({ value: element.id, disabled: true }),
            RangeFrom: new FormControl({ value: element.rangeFrom, disabled: true }),
            RangeTo: new FormControl({ value: element.rangeTo, disabled: true }),
            Points: new FormControl({ value: element.points, disabled: true }),
            ExtraPoints: new FormControl("", [Validators.required]),
          })
        );
      });
    });
  }

}
