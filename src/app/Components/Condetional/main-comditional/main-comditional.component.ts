import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
// import { ISubDirect } from "src/app/Interfaces/IsubDirect";
import { ISubDirect } from "src/app/Interfaces/ISubDirect";
import { CondetionalService } from "src/app/Services/condetional.service";
import { ConfirmationService } from "src/app/Services/confirmation.service";
import { DirectService } from "src/app/Services/direct.service";
import { AddSubComditionalComponent } from "../add-sub-comditional/add-sub-comditional.component";
import { SubConfigInfoComponent } from "../sub-config-info/sub-config-info.component";
import * as XLSX from 'xlsx';
import { CalculationService } from "src/app/Services/calculation.service";

@Component({
	selector: "app-main-comditional",
	templateUrl: "./main-comditional.component.html",
	styleUrls: ["./main-comditional.component.scss"],
})
export class MainComditionalComponent implements OnInit {
	@Output() newItemEvent = new EventEmitter<any>();
	displayedColumns: string[] = ["Month", "PlanId", "Options"];
	displayedColumnssub: string[] = ["month", "dateFrom", "dateTo", "subConfigId", "dateEntry", "userName", "Options"];
	displayedColumnsExcel: string[] = ['SD_CODE', 'DTO', 'DFROM', 'EXTRAPOINTS'];

	// , "region", "city", "zone", "area", "subarea", "subdealer"
	dataSource!: MatTableDataSource<any>;
	dataSourcesub!: MatTableDataSource<ISubDirect>;
	dataSourceExcel!: MatTableDataSource<any>;
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	SubdealersRange: FormGroup = new FormGroup({});
	monthsexcel: any
	ExcelForm: FormGroup = new FormGroup({});

	subConfig: any;
	region: any;
	city: any;
	regm: any;
	zone: any;
	Area: any;
	excelData: any;
	dataa: any;

	SubArea: any;
	months: any;
	data: any;
	planid: any;
	rangeId: any;
	DirectconfigsbyId: any;
	constructor(private sb: MatSnackBar, private fb: FormBuilder, private conditional: CondetionalService, private conf: ConfirmationService, public dialog: MatDialog, public route: Router, private CalcService: CalculationService) { }
	subDirectsalesform: FormGroup = new FormGroup({});
	subInDirectsalesform: FormGroup = new FormGroup({});

	get Ranges(): FormArray {
		return this.SubdealersRange.get("subConfigs") as FormArray;
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
	get f() {
		return this.subDirectsalesform.controls;
	}
	get config(): FormArray {
		return this.subDirectsalesform.get("config") as FormArray;
	}
	deleterangid(rangeId: any) {
		this.conf
			.confirmation({
				Title: "Deleting Sub Configuration",
				Message: "Are You Sure You Want to Delete this Configuration",
				Confirm: "Delete",
				Cancel: "Close",
			})
			.subscribe((datax) => {
				if (datax) {
					this.conditional.deleteRangid(rangeId).subscribe();
				}
			});
	}

	openDialog(enterAnimationDuration: string, exitAnimationDuration: string, planId: any): void {
		this.dialog.open(AddSubComditionalComponent, {
			width: "1300px",
			height: "800px",
			disableClose: true,
			enterAnimationDuration,
			exitAnimationDuration,
			data: { planId: planId },
		});
	}
	openSubDialog(enterAnimationDuration: string, exitAnimationDuration: string, subConfigId: any): void {
		this.dialog.open(SubConfigInfoComponent, {
			width: "1300px",
			height: "600px",
			disableClose: true,
			enterAnimationDuration,
			exitAnimationDuration,
			data: { subConfigId: subConfigId },
		});
	}
	applyFilter(event: Event) {
		if (this.dataSource) {
			const filterValue = (event.target as HTMLInputElement).value;

			this.dataSource.filter = filterValue.trim().toLowerCase();

			if (this.dataSource.paginator) {
				this.dataSource.paginator.firstPage();
			}
		}
	}

	getallMonths() {
		this.months = this.conditional.GetallMonths();
	}
	getallMonthsexcel() {
		this.CalcService.GetallMonthsExcel().subscribe(x => {
			this.monthsexcel = x
		});

	}
	getDirectCofigsbyId() {
		this.conditional.GetAllDirectconfig(this.f["Month"].value).subscribe((x: any) => {
			this.DirectconfigsbyId = x;
			this.planid = this.DirectconfigsbyId[0].planId;
		});
	}
	Getallsubdirect() {
		this.conditional.subDirect.subscribe((data) => {
			this.subConfig = data;
			//console.log(data);
			this.dataSource = new MatTableDataSource<any>(this.subConfig);
			this.dataSource.sort = this.sort;
			this.dataSource.paginator = this.paginator;
		});
	}
	onsubmit() { }
	get t() {
		return this.SubdealersRange.controls;
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
	getDirectCofigsbyIdexel() {
		this.CalcService.GetAllDirectconfig(this.t["Month"].value).subscribe((xx: any) => {
			this.dataa = xx;
			//console.log(this.dataa)
			this.dataa.forEach((element: any) => {
				// console.log(element);

				(this.SubdealersRange.get("subConfigs") as FormArray).push(
					new FormGroup({
						rangeFrom: new FormControl(element.rangeFrom),
						rangeTo: new FormControl(element.rangeTo),
						extraPoints: new FormControl("", [Validators.required]),
					})
				);
			});
		}
		)
	}
	ngOnInit(): void {
		this.ExcelForm = this.fb.group({
			excelFile: new FormControl('', [Validators.required]),
			dateExcel: new FormControl('', [Validators.required]),
		});
		this.SubdealersRange = this.fb.group({
			Month: new FormControl('', [Validators.required]),
			subConfigs: new FormArray([

			]),
		});
		this.Getallsubdirect();
		this.getallMonths();
		this.getallMonthsexcel()
		this.subDirectsalesform = this.fb.group({
			Month: new FormControl(),
			PlanId: new FormControl({ value: "", disabled: true }),
		});
	}
}

