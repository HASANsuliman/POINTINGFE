import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, startWith, switchMap, catchError, map, Observable, concatMap, tap } from 'rxjs';
import { CalculationService } from 'src/app/Services/calculation.service';
import { CondetionalService } from 'src/app/Services/condetional.service';
import { ConfirmationService } from 'src/app/Services/confirmation.service';
import { DirectService } from 'src/app/Services/direct.service';
import { PlanService } from 'src/app/Services/plan.service';
import { CalculationInfoComponent } from '../main-calculation/calculation-info/calculation-info.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  displayedColumns: string[] = ['planId', 'userName', 'plan', 'OPTIONS'];
  displayedColumnsSales: string[] = ['month', 'region', 'city', 'zone', 'area', 'subarea', 'sD_CODE', 'sD_NAME', 'toalPoint', 'toalSYP'];
  // 
  dataSource!: MatTableDataSource<any>;
  src!: MatTableDataSource<any>;
  dataCalc: any;
  dataSales: any
  load = true
  limte = true;
  price: any

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  calcForm: FormGroup = new FormGroup({});


  region!: Observable<string[]>;
  city!: Observable<string[]>;
  zone!: Observable<string[]>;
  Area!: Observable<string[]>;
  SubArea!: Observable<string[]>;
  subDealer!: Observable<string[]>;
  PlanList: any = [];

  @ViewChild('saleSort') saleSort = new MatSort();
  @ViewChild('salesPaging') salesPaging!: MatPaginator;
  constructor(
    private CalcService: CalculationService,
    // private sb: MatSnackBar,
    // private conf: ConfirmationService,
    // private dialog: MatDialog,
    // private Conditional: CondetionalService,
    // private directServ: DirectService,
    // private calcService: CalculationService,
    private planSerevice: PlanService,

    private fb: FormBuilder
  ) { }
  onsubmit() {
    // this.planSerevice.getPlanbymonth(this.calcForm.value.Month).subscribe((x: any) => {
    //   this.price = x.result
    //  console.log(x);

    // })
    // this.dataSales.data = []
    // this.CalcService.DataSalesf(this.calcForm.value).subscribe(x => {
    //   this.dataSales = x
    //   this.src = new MatTableDataSource<any>(this.dataSales)
    //   this.src.paginator = this.salesPaging;
    //   this.src.sort = this.saleSort
    // });
    //  console.log(this.calcForm.value.Month);
    this.planSerevice.getPlanbymonth(this.calcForm.value.Month).pipe(tap((xx: any) => {
      this.price = xx.result
      // console.log(xx);
    }), concatMap(x => this.CalcService.DataSalesf(this.calcForm.value)

    )).subscribe(cc => {
      //   console.log(cc);

      this.dataSales = cc
      this.src = new MatTableDataSource<any>(this.dataSales)
      this.src.paginator = this.salesPaging;
      this.src.sort = this.saleSort
    });

  }
  getplanlist() {
    this.CalcService.Getplan().subscribe((x: any) => {
      this.PlanList = x;
      // console.log(x);
    });
  }
  get f() {
    return this.calcForm.controls;
  }
  // getRegion() {
  //   this.region = this.Conditional.GetRegion();
  // }

  // getCity() {
  //   this.city = this.Conditional.GetCity(this.f["REGION"].value);
  // }
  // getZone() {
  //   this.zone = this.Conditional.GetZone(this.f["CITY"].value);
  // }
  // getArea() {
  //   this.Area = this.Conditional.GetArea(this.f["ZONE"].value);
  // }
  // getSubArea() {
  //   this.SubArea = this.Conditional.GetSubArea(this.f["AREA"].value);
  // }
  // getSubdealr() {
  //   this.subDealer = this.Conditional.GetSdCode(this.f["SUBAREA"].value);
  // }

  applyFiltersales(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.src.filter = filterValue.trim().toLowerCase();

    if (this.src.paginator) {
      this.src.paginator.firstPage();
    }
  }



  getSalesData() {
    this.CalcService.getDataSales().subscribe((x: any) => {
      //   console.log(x);
      this.dataSales = x
      this.src = new MatTableDataSource<any>(this.dataSales)
      this.src.paginator = this.salesPaging;
      this.src.sort = this.saleSort
    })

  }
  ngOnInit(): void {
    this.getplanlist()
    //this.getSalesData()
    // this.getRegion();
    this.calcForm = this.fb.group({
      Month: new FormControl(),
      // DateFrom: new FormControl(moment().add(1, 'd').format("DD /MM /YYYY"),[Validators.required]),
      // REGION: new FormControl(),
      // CITY: new FormControl(),
      // ZONE: new FormControl(),
      // AREA: new FormControl(),
      // SUBAREA: new FormControl(),
      // SUBDEALER: new FormControl(),

    });
  }

}
