import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { MatDatepicker } from "@angular/material/datepicker";
import * as moment from "moment";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { DirectService } from "src/app/Services/direct.service";
import { InfoDirectComponent } from "../info-direct/info-direct.component";
import { DeleteDirectComponent } from "../delete-direct/delete-direct.component";
import { ConfirmationService } from "src/app/Services/confirmation.service";
import { InfoDirectPromComponent } from "../info-direct-prom/info-direct-prom.component";

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
	selector: "app-main-direct",
	templateUrl: "./main-direct.component.html",
	styleUrls: ["./main-direct.component.scss"],
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
export class MainDirectComponent implements OnInit {
	displayedColumns: string[] = [
		"month",
		// 'planid',
		"dateEntry",
		"userName",
		// 'points',
		"optipns",
	];
	dataSource!: MatTableDataSource<any>;
	dataSourceprom!: MatTableDataSource<any>;

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	data: any;
	d!: any;
	constructor(private directServ: DirectService, private fb: FormBuilder, private sb: MatSnackBar, public dialog: MatDialog, private conf: ConfirmationService) { }
	Directsalesform: FormGroup = new FormGroup({});
	InDirectsalesform: FormGroup = new FormGroup({});
	PlanList: any = [];
	id: any;
	idP: any
	del: any;
	datadirect: any;
	allDirect: any;


	//main sd
	get f() {
		return this.Directsalesform.controls;
	}
	get Configs(): FormArray {
		return this.Directsalesform.get("Configs") as FormArray;
	}
	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	onsubmit() {

		this.conf
			.confirmation({
				Title: "Adding new Direct Configurations",
				Message: "Are You Sure You Want to Add Configuration",
				Confirm: "Add Config",
				Cancel: "Close",
			}).subscribe(datax => {
				if (datax) {
					if (this.Directsalesform.valid) {
						this.directServ.AddDirect(this.Directsalesform.value).subscribe();
					} else {
						this.sb.open(" Plese Complete the Form  one or more options are required");
					}
				}
			})
		// if (window.confirm("Are You Sure You want to Add this Plan")) {
		// 	if (this.Directsalesform.valid) {
		// 		this.directServ.AddDirect(this.Directsalesform.value).subscribe();
		// 	} else {
		// 		this.sb.open(" Plese Complete the Form  one or more options are required");
		// 	}
		// }
	}

	add() {
		let i = (this.Configs.controls[this.Configs.length - 1] as FormGroup).get("RangeTo")?.value;
		let newcfg = this.fb.group({
			RangeFrom: [i + 1, Validators.required],
			RangeTo: ["", Validators.required],
			Points: ["", Validators.required],
		});
		this.Configs.push(newcfg);

		//console.log(i);
	}
	deletecfg(cfgidx: number) {
		if (cfgidx == 0) {
			window.confirm("Cant Be Deleted");
		} else {
			this.Configs.removeAt(cfgidx);
		}
	}

	setMonthAndYear(normalizedMonthAndYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
		const ctrlValue = this.f["Month"].value!;
		ctrlValue.month(normalizedMonthAndYear.month());
		ctrlValue.year(normalizedMonthAndYear.year());
		this.f["Month"].setValue(ctrlValue);
		datepicker.close();
	}


	getplanlist() {
		this.directServ.getPlanlist().subscribe((x: any) => {
			this.PlanList = x.result;
			//	console.log(x);
		});
	}
	deleterangid(rangeId: any) {
		this.conf
			.confirmation({
				Title: "Deleting  Configuration",
				Message: "Are You Sure You Want to Delete this Configuration",
				Confirm: "Delete",
				Cancel: "Close",
			})
			.subscribe((datax) => {
				if (datax) {
					this.directServ.Deleteconfig(rangeId).subscribe();
				}
			});
	}


	getplanlistId() {
		this.directServ.getPlanId(this.f["Month"].value).subscribe((x: any) => {
			// console.log(x);
			this.id = x.result[0];
			this.f["PlanId"].setValue(this.id);
			// console.log(x);
		});
	}
	getalldirect() {
		this.directServ.DirectCfg.subscribe((x) => {
			this.allDirect = x;
			// console.log(x);
			this.dataSource = new MatTableDataSource<any>(this.allDirect);
			this.dataSource.sort = this.sort;
			this.dataSource.paginator = this.paginator;
		});
	}
	openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
		this.dialog.open(DeleteDirectComponent, {
			width: "800px",
			height: "300px",
			disableClose: true,
			enterAnimationDuration,
			exitAnimationDuration,
		});
	}
	OpenDialogInfo(enterAnimationDuration: string, exitAnimationDuration: string, id: any) {
		this.dialog.open(InfoDirectComponent, {
			width: "1000px",
			height: "500px",
			data: { id: id },
			disableClose: true,
			enterAnimationDuration,
			exitAnimationDuration,
		});
	}



	//based on Promoter
	onsubmitProm() {

		this.conf
			.confirmation({
				Title: "Adding new Direct Configurations based on promoter",
				Message: "Are You Sure You Want to Add Configuration",
				Confirm: "Add Config",
				Cancel: "Close",
			}).subscribe(datax => {
				if (datax) {
					if (this.InDirectsalesform.valid) {
						this.directServ.AddDirectProm(this.InDirectsalesform.value).subscribe();
					} else {
						this.sb.open(" Plese Complete the Form  one or more options are required");
					}
				}
			})
	}
	get fp() {
		return this.InDirectsalesform.controls;
	}
	get ConfigsPromoter(): FormArray {
		return this.InDirectsalesform.get("Configs") as FormArray;
	}
	addProm() {
		let i = (this.ConfigsPromoter.controls[this.ConfigsPromoter.length - 1] as FormGroup).get("RangeTo")?.value;
		let newcfg = this.fb.group({
			RangeFrom: [i + 1, Validators.required],
			RangeTo: ["", Validators.required],
			Points: ["", Validators.required],
		});
		this.ConfigsPromoter.push(newcfg);

		//console.log(i);
	}
	deletecfgProm(cfgidx: number) {
		if (cfgidx == 0) {
			window.confirm("Can't Be Deleted");
		} else {
			this.ConfigsPromoter.removeAt(cfgidx);
		}
	}
	applyFilteProm(events: Event) {
		const filterValue = (events.target as HTMLInputElement).value;
		this.dataSourceprom.filter = filterValue.trim().toLowerCase();

		if (this.dataSourceprom.paginator) {
			this.dataSourceprom.paginator.firstPage();
		}
	}
	deleterangidProm(rangeId: any) {
		this.conf
			.confirmation({
				Title: "Deleting  Configuration",
				Message: "Are You Sure You Want to Delete this Configuration",
				Confirm: "Delete",
				Cancel: "Close",
			})
			.subscribe((datax) => {
				if (datax) {
					this.directServ.DeleteconfigProm(rangeId).subscribe();
				}
			});
	}
	OpenDialogInfoProm(enterAnimationDuration: string, exitAnimationDuration: string, id: any) {
		this.dialog.open(InfoDirectPromComponent, {
			width: "1000px",
			height: "500px",
			data: { id: id },
			disableClose: true,
			enterAnimationDuration,
			exitAnimationDuration,
		});
	}
	getplanlistIdProm() {
		this.directServ.getPlanIdProm(this.fp["Month"].value).subscribe((x: any) => {
			// console.log(x);
			this.idP = x.result[0];
			this.fp["PlanId"].setValue(this.idP);
			// console.log(x);
		});
	}
	getalldirectProm() {
		this.directServ.DirectCfgProm.subscribe((x) => {
			this.allDirect = x;
			// console.log(x);
			this.dataSourceprom = new MatTableDataSource<any>(this.allDirect);
			this.dataSourceprom.sort = this.sort;
			this.dataSourceprom.paginator = this.paginator;
		});
	}
	ngOnInit(): void {
		this.getalldirect();
		this.getalldirectProm();

		this.getplanlist();
		this.Directsalesform = this.fb.group({
			PlanId: new FormControl(),
			Month: new FormControl(moment(), [Validators.required]),
			Configs: new FormArray([
				this.fb.group({
					RangeFrom: new FormControl(0, [Validators.required]),
					RangeTo: new FormControl([Validators.required]),
					Points: new FormControl([Validators.required]),
				}),
			]),
		});
		this.InDirectsalesform = this.fb.group({
			PlanId: new FormControl(),
			Month: new FormControl(moment(), [Validators.required]),
			Configs: new FormArray([
				this.fb.group({
					RangeFrom: new FormControl(0, [Validators.required]),
					RangeTo: new FormControl([Validators.required]),
					Points: new FormControl([Validators.required]),
				}),
			]),
		});
	}
}
