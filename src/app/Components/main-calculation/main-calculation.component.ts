import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
} from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatStepLabel, MatStepper } from '@angular/material/stepper';
import * as moment from 'moment';
import { CalculationService } from 'src/app/Services/calculation.service';
import { CondetionalService } from 'src/app/Services/condetional.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationService } from 'src/app/Services/confirmation.service';
import { MatDialog } from '@angular/material/dialog';
import { CalculationInfoComponent } from './calculation-info/calculation-info.component';
import * as XLSX from 'xlsx';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM-YYYY',
  },
  display: {
    dateInput: 'MM-YYYY',
    monthYearLabel: 'MMM-YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM-YYYY',
  },
};
@Component({
  selector: 'app-main-calculation',
  templateUrl: './main-calculation.component.html',
  styleUrls: ['./main-calculation.component.scss'],
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
export class MainCalculationComponent implements OnInit {
  displayedColumns: string[] = ['planId', 'userName', 'plan', 'OPTIONS'];
  displayedColumnsExcel: string[] = ['SD_CODE', 'DTO', 'DFROM', 'EXTRAPOINTS'];
  displayedColumnse: string[] = ["rangeFrom", "rangeTo", "EXTRAPOINTS"];
  dataSource!: MatTableDataSource<any>;
  dataSourceExcel!: MatTableDataSource<any>;
  @ViewChild('calcSort') calcSort = new MatSort();
  @ViewChild('calcPaging') calcPaging!: MatPaginator;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatStepper) stepper!: MatStepper;
  Main: any;
  SubMain: any;
  CondiionalDirect: FormGroup = new FormGroup({});
  mainDirect: FormGroup = new FormGroup({});
  ExcelForm: FormGroup = new FormGroup({});
  SubdealersRange: FormGroup = new FormGroup({});
  excelData: any;
  color = this.CalcService.colorizedSubject;
  color2 = this.CalcService.colorized2Subject;
  isEditable = false;
  months: any;
  monthsexcel: any
  dataCalc: any;
  DirectconfigsbyId: any;
  dataa: any;
  dataRanges: any
  month: any
  get f() {
    return this.mainDirect.controls;
  }
  get c() {
    return this.CondiionalDirect.controls;
  }
  get t() {
    return this.SubdealersRange.controls;
  }
  getallMonths() {
    this.CalcService.GetallMonthsExcel().subscribe(x => {
      this.monthsexcel = x
    });

  }
  getallMonth() {
    this.CalcService.Getplan().subscribe(x => {
      this.months = x
      console.log(x);

    });
  }
  // getDirectCofigsbyId() {
  //   this.CalcService.GetAllDirectconfig(this.t["Month"].value).subscribe((xx: any) => {
  //     this.dataa = xx;
  //     //console.log(this.dataa)
  //     this.dataa.forEach((element: any) => {
  //       // console.log(element);

  //       (this.SubdealersRange.get("subConfigs") as FormArray).push(
  //         new FormGroup({
  //           rangeFrom: new FormControl(element.rangeFrom),
  //           rangeTo: new FormControl(element.rangeTo),
  //           extraPoints: new FormControl("", [Validators.required]),
  //         })
  //       );
  //     });
  //   }
  //   )
  // }
  setMonthAndYearx(
    normalizedMonthAndYear: moment.Moment,
    datepicker: MatDatepicker<moment.Moment>
  ) {
    const ctrlValuex = this.f['Month'].value!;
    ctrlValuex.month(normalizedMonthAndYear.month());
    ctrlValuex.year(normalizedMonthAndYear.year());
    this.f['Month'].setValue(ctrlValuex);
    datepicker.close();
  }
  setMonthAndYear(
    normalizedMonthAndYear: moment.Moment,
    datepicker: MatDatepicker<moment.Moment>
  ) {
    const ctrlValue = this.c['Month'].value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.c['Month'].setValue(ctrlValue);
    datepicker.close();
  }
  sendExcel() {
    console.log({ da: this.excelData, ra: this.Ranges.value, mo: this.SubdealersRange.controls['Month'].value });

    this.conf
      .confirmation({
        Title: 'Adding  Calculation Based on SubDealers',
        Message: 'Are You Sure You Want to Add  Calculation ',
        Confirm: 'Add ',
        Cancel: 'Close',
      }).subscribe(datax => {
        if (datax == true) {
          if (this.excelData) {
            this.CalcService.addCalcExcel({ da: this.excelData, ra: this.Ranges.value, mo: this.SubdealersRange.controls['Month'].value }).subscribe();
          } else {
            this.sb.open(
              ' Plese Choose File  '
            );
          }
        }
      })
  }
  onsubmitsMain() {
    this.conf
      .confirmation({
        Title: 'Adding new Direct Calculation',
        Message: 'Are You Sure You Want to Add Direct Calculation ',
        Confirm: 'Add ',
        Cancel: 'Close',
      })
      .subscribe((datax) => {
        //    console.log(datax);
        if (datax == true) {
          if (this.mainDirect.valid) {
            this.CalcService.addCalc(
              this.mainDirect.value,
              this.stepper
            ).subscribe();
            this.c["Month"].setValue(this.mainDirect.value)
            this.month = this.mainDirect.value.Month
            // console.log(this.mainDirect.value.Month);

          } else {
            this.sb.open(
              ' Plese Complete the Form one or more options are required'
            );
          }
        }
      });
  }
  onsubmitCondetion() {
    this.conf
      .confirmation({
        Title: 'Adding new subDirect Calculation',
        Message: 'Are You Sure You Want to Add subDirect Calculation ',
        Confirm: 'Add ',
        Cancel: 'Close',
      })
      .subscribe((datax) => {
        // console.log(datax);
        if (datax == true) {
          //  if (this.CondiionalDirect.valid) {
          this.CalcService.addCalculation(
            this.CondiionalDirect.getRawValue().Month,
            this.stepper
          ).subscribe();
          console.log(this.CondiionalDirect.getRawValue());
          //  }
          //  else {
          //   this.sb.open(
          //     ' Plese Complete the Form one or more options are required'
          //   );
          // }
        }
      });
  }
  onFileChange(event: any) {
    let file = event.target.files[0];
    let fileReaer = new FileReader();
    fileReaer.readAsBinaryString(file);
    fileReaer.onload = () => {
      var workBook = XLSX.read(fileReaer.result, { type: 'binary' });
      var sheetName = workBook.SheetNames;

      this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName[0]]);
      //   console.log(this.excelData);

      this.dataSourceExcel = new MatTableDataSource<any>(this.excelData);
      this.dataSourceExcel.sort = this.sort;
      this.dataSourceExcel.paginator = this.paginator;
    };
  }


  get Ranges(): FormArray {
    return this.SubdealersRange.get("subConfigs") as FormArray;
  }
  constructor(
    private fb: FormBuilder,
    private CalcService: CalculationService,
    private sb: MatSnackBar,
    private conditional: CondetionalService,
    private conf: ConfirmationService,
    private dialog: MatDialog
  ) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialogINFO(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    id: any,
    userName: string
  ): void {
    this.dialog.open(CalculationInfoComponent, {
      width: '1000px',
      height: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { id: id, userName: userName },
    });
  }
  getDataCalc() {
    this.CalcService.datacalc.subscribe((xx: any) => {
      //  console.log(xx);
      this.dataCalc = xx
      this.dataSource = new MatTableDataSource<any>(this.dataCalc);
      this.dataSource.sort = this.calcSort;
      this.dataSource.paginator = this.calcPaging;
    });
  }
  ngOnInit(): void {
    this.getDataCalc();

    this.getallMonths();
    this.getallMonth();
    this.CondiionalDirect = this.fb.group({
      Month: new FormControl({ value: this.mainDirect.value, disabled: true }),
    });
    this.ExcelForm = this.fb.group({
      excelFile: new FormControl('', [Validators.required]),
      dateExcel: new FormControl('', [Validators.required]),
    });
    this.mainDirect = this.fb.group({
      Month: new FormControl('', [Validators.required]),
    });
    this.SubdealersRange = this.fb.group({
      Month: new FormControl('', [Validators.required]),
      subConfigs: new FormArray([

      ]),
    });

    // this.CalcService.GetAllDirectconfigbyid(this.planid).subscribe((x: any) => {
    //   this.dataRanges = x;

  }
}





