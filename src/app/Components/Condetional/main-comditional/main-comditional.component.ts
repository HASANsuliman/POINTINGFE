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
import { AddSubPromComponent } from "../add-sub-prom/add-sub-prom.component";

@Component({
	selector: "app-main-comditional",
	templateUrl: "./main-comditional.component.html",
	styleUrls: ["./main-comditional.component.scss"],
})
export class MainComditionalComponent implements OnInit {
	@Output() newItemEvent = new EventEmitter<any>();
	displayedColumns: string[] = ["Month", "PlanId", "Options"];
	displayedColumnssub: string[] = ["month", "dateFrom", "dateTo", "subConfigId", "dateEntry", "userName", "Options"];
	displayedColumnsExcel: string[] = ['SD_CODE', 'DTO', 'DFROM'];
	displayedColumnsExcelProm: string[] = ['SD_CODE', 'DTO', 'DFROM'];

	// , "region", "city", "zone", "area", "subarea", "subdealer"
	dataSource!: MatTableDataSource<any>;
	dataSourceProm!: MatTableDataSource<any>;

	dataSourcesub!: MatTableDataSource<ISubDirect>;
	dataSourceExcel!: MatTableDataSource<any>;
	dataSourceExcelProm!: MatTableDataSource<any>;

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	SubdealersRange: FormGroup = new FormGroup({});
	SubdealersRangeProm: FormGroup = new FormGroup({});

	monthsexcel: any
	monthsexcelProm: any
	PlanIdPex: any
	ExcelForm: FormGroup = new FormGroup({});

	subConfig: any;
	subConfigProm: any
	region: any;
	city: any;
	regm: any;
	zone: any;
	Area: any;
	excelData: any;
	excelDataProm: any;
	dataa: any;
	SubArea: any;
	months: any;
	data: any;
	planid: any;
	planidProm: any;
	monthsx: any
	rangeId: any;
	DirectconfigsbyId: any;
	DirectconfigsbyIdProm: any;
	planidex: any
	constructor(private sb: MatSnackBar, private fb: FormBuilder, private conditional: CondetionalService, private conf: ConfirmationService, public dialog: MatDialog, public route: Router, private CalcService: CalculationService) { }
	subDirectsalesform: FormGroup = new FormGroup({});
	subDirectsalesformProm: FormGroup = new FormGroup({});

	subInDirectsalesform: FormGroup = new FormGroup({});

	get Ranges(): FormArray {
		return this.SubdealersRange.get("subConfigs") as FormArray;
	}
	get RangesProm(): FormArray {
		return this.SubdealersRangeProm.get("subConfigs") as FormArray;
	}
	sendExcel() {
		console.log({ da: this.excelData, ra: this.Ranges.value, mo: this.SubdealersRange.controls['Month'].value, Pid: this.planidex });

		this.conf
			.confirmation({
				Title: 'Adding  Calculation Based on SubDealers',
				Message: 'Are You Sure You Want to Add  Calculation ',
				Confirm: 'Add ',
				Cancel: 'Close',
			}).subscribe(datax => {
				if (datax == true) {
					if (this.excelData) {
						this.conditional.addExcel({
							da: this.excelData, ra: this.Ranges.value, mo: this.SubdealersRange.controls['Month'].value,
							Pid: this.planidex
						}).subscribe();
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
	deleterangidProm(rangeId: any) {
		this.conf
			.confirmation({
				Title: "Deleting Sub Configuration For Promoter",
				Message: "Are You Sure You Want to Delete this Configuration",
				Confirm: "Delete",
				Cancel: "Close",
			})
			.subscribe((datax) => {
				if (datax) {
					this.conditional.deleteRangidProm(rangeId).subscribe();
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
	Getplan() {
		this.monthsx = this.conditional.Getplan();
	}
	getallMonthsexcel() {
		this.CalcService.GetallMonthsExcel().subscribe(x => {
			this.monthsexcel = x
		});

	}


	getDirectCofigsbyId() {
		this.conditional.GetAllDirectconfig(this.f["Month"].value).subscribe((x: any) => {
			this.DirectconfigsbyId = x;
			if (this.DirectconfigsbyId.length == 0) {
				this.sb.open("Please Add Direct Configs First")
			} else {
				this.planid = this.DirectconfigsbyId[0].planId;
			}
		});
	}
	getDirectCofigsbyIdProm() {
		this.conditional.GetAllDirectconfigProm(this.fp["Month"].value).subscribe((x: any) => {
			this.DirectconfigsbyIdProm = x;
			if (this.DirectconfigsbyIdProm.length == 0) {
				this.sb.open("Please Add Direct Configs First")
			} else {
				this.planidProm = this.DirectconfigsbyIdProm[0].planId;
			}

		});
	}




	getDirectCofigsexecbyId() {
		this.conditional.GetAllDirectconfig(this.t["Month"].value).subscribe((x: any) => {
			console.log(x);
			this.DirectconfigsbyId = x;
			this.planidex = this.DirectconfigsbyId[0].planId;
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

			this.dataSourceExcel = new MatTableDataSource<any>(this.excelData);
			this.dataSourceExcel.sort = this.sort;
			this.dataSourceExcel.paginator = this.paginator;
		};
	}
	getDirectCofigsbyIdexel() {
		this.CalcService.GetAllDirectconfig(this.t["Month"].value).subscribe((xx: any) => {
			this.dataa = xx;
			console.log(this.dataa)
			this.dataa.forEach((element: any) => {
				// console.log(element);

				(this.SubdealersRange.get("subConfigs") as FormArray).push(
					new FormGroup({
						SubConfigId: new FormControl(Math.floor(Math.random() * 2147483640 + 1)),
						rangeId: new FormControl(element.id),
						rangeFrom: new FormControl(element.rangeFrom),
						rangeTo: new FormControl(element.rangeTo),
						extraPoints: new FormControl("", [Validators.required]),
					})
				);
			});
		}
		)
	}
	//prom
	get tp() {
		return this.SubdealersRangeProm.controls;
	}
	get fp() {
		return this.subDirectsalesformProm.controls;
	}

	getDirectCofigsexecbyIdProm() {
		this.conditional.GetAllDirectconfigProm(this.tp["Month"].value).subscribe((x: any) => {
			console.log(x);

			this.DirectconfigsbyId = x;
			this.PlanIdPex = this.DirectconfigsbyId[0].planId;
		});
	}
	sendExcelProm() {
		//	console.log({ da: this.excelDataProm, ra: this.RangesProm.value, mo: this.SubdealersRangeProm.controls['Month'].value });
		this.conf
			.confirmation({
				Title: 'Adding  Calculation Based on SubDealers',
				Message: 'Are You Sure You Want to Add  Calculation ',
				Confirm: 'Add ',
				Cancel: 'Close',
			}).subscribe(datax => {
				if (datax == true) {
					if (this.excelDataProm) {
						this.conditional.addExcelProm({
							da: this.excelDataProm, ra: this.RangesProm.value, mo: this.SubdealersRangeProm.controls['Month'].value,
							Pid: this.PlanIdPex
						}).subscribe();
					} else {
						this.sb.open(
							' Plese Choose File  '
						);
					}
				}
			})
	}

	openDialogProm(enterAnimationDuration: string, exitAnimationDuration: string, planidProm: any): void {
		this.dialog.open(AddSubPromComponent, {
			width: "1300px",
			height: "800px",
			disableClose: true,
			enterAnimationDuration,
			exitAnimationDuration,
			data: { planidProm: planidProm },
		});
	}

	onFileChangeProm(events: any) {
		let fileP = events.target.files[0];
		let fileReaer = new FileReader();
		fileReaer.readAsBinaryString(fileP);
		fileReaer.onload = () => {
			var workBookP = XLSX.read(fileReaer.result, { type: 'binary' });
			var sheetNameP = workBookP.SheetNames;
			this.excelDataProm = XLSX.utils.sheet_to_json(workBookP.Sheets[sheetNameP[0]]);
			this.dataSourceExcelProm = new MatTableDataSource<any>(this.excelDataProm);
			this.dataSourceExcelProm.sort = this.sort;
			this.dataSourceExcelProm.paginator = this.paginator;
		};
	}

	getDirectCofigsbyIdexelProm() {
		this.CalcService.GetAllDirectconfigProm(this.tp["Month"].value).subscribe((xx: any) => {
			this.dataa = xx;
			//console.log(this.dataa)
			this.dataa.forEach((element: any) => {
				// console.log(element);

				(this.SubdealersRangeProm.get("subConfigs") as FormArray).push(
					new FormGroup({
						SubConfigId: new FormControl(Math.floor(Math.random() * 2147483640 + 1)),
						rangeId: new FormControl(element.id),
						rangeFrom: new FormControl(element.rangeFrom),
						rangeTo: new FormControl(element.rangeTo),
						extraPoints: new FormControl("", [Validators.required]),
					})
				);
			});
		}
		)
	}
	applyFilterProm(event: Event) {
		if (this.dataSourceProm) {
			const filterValue = (event.target as HTMLInputElement).value;

			this.dataSourceProm.filter = filterValue.trim().toLowerCase();

			if (this.dataSourceProm.paginator) {
				this.dataSourceProm.paginator.firstPage();
			}
		}
	}
	GetallsubdirectProm() {
		this.conditional.subDirectProm.subscribe((data) => {
			this.subConfigProm = data;
			//console.log(data);
			this.dataSourceProm = new MatTableDataSource<any>(this.subConfigProm);
			this.dataSourceProm.sort = this.sort;
			this.dataSourceProm.paginator = this.paginator;
		});
	}
	ngOnInit(): void {
		this.Getplan()
		this.ExcelForm = this.fb.group({
			excelFile: new FormControl('', [Validators.required]),
			dateExcel: new FormControl('', [Validators.required]),
		});
		this.SubdealersRange = this.fb.group({
			Month: new FormControl('', [Validators.required]),
			PlanId: new FormControl({ value: "", disabled: true }),
			subConfigs: new FormArray([

			]),
		});
		this.Getallsubdirect();
		this.GetallsubdirectProm();
		this.getallMonths();
		this.getallMonthsexcel()
		this.subDirectsalesform = this.fb.group({
			Month: new FormControl(),
			PlanId: new FormControl({ value: "", disabled: true }),
		});
		this.subDirectsalesformProm = this.fb.group({
			Month: new FormControl(),
			PlanIdProm: new FormControl({ value: "", disabled: true }),
		});
		this.SubdealersRangeProm = this.fb.group({
			Month: new FormControl('', [Validators.required]),
			PlanIdp: new FormControl({ value: "", disabled: true }),
			subConfigs: new FormArray([

			]),
		});
	}
}

