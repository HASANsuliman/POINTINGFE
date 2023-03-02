import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDatepicker } from "@angular/material/datepicker";
import { IPlan } from "../../../Interfaces/IPlan";
import * as moment from "moment";
import * as xlsx from "xlsx";
import { PlanService } from "src/app/Services/plan.service";
import { MatDialog } from "@angular/material/dialog";
import { UpdatePlanDialogComponent } from "../update-plan-dialog/update-plan-dialog.component";
import { ConfirmationService } from "src/app/Services/confirmation.service";
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
	selector: "app-main-plan",
	templateUrl: "./main-plan.component.html",
	styleUrls: ["./main-plan.component.scss"],
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
export class MainPlanComponent implements OnInit {
	///@ViewChild("epltable", { static: false }) epltable!: ElementRef;

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	dataSource!: MatTableDataSource<IPlan>;
	Plans: any;
	displayedColumns: string[] = ["month", "pointPrice", "minValue", "dateFrom", "dateTo", "userName", "dateEntry", "userUpdate", "dateUpdated", "Options"];
	constructor(private planserv: PlanService, private fb: FormBuilder, private sb: MatSnackBar, public dialog: MatDialog, private conf: ConfirmationService) { }
	Planform: FormGroup = new FormGroup({});
	calcform: FormGroup = new FormGroup({});
	calccondform: FormGroup = new FormGroup({});
	// exportToExcel() {
	// 	const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(this.epltable.nativeElement);
	// 	const wb: xlsx.WorkBook = xlsx.utils.book_new();
	// 	xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
	// 	xlsx.writeFile(wb, "data.csv");
	// }
	get f() {
		return this.Planform.controls;
	}
	get c() {
		return this.calcform.controls;
	}
	get cc() {
		return this.calccondform.controls;
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
	onsubmit() {
		this.conf
			.confirmation({
				Title: "Adding new Plan",
				Message: "Are You Sure You Want to Add Plan",
				Confirm: "Add Plan",
				Cancel: "Close",
			})
			.subscribe((datax) => {
				//console.log(datax);
				if (datax == true) {
					if (this.Planform.valid) {
						this.planserv.AddPlan(this.Planform.value).subscribe();
					} else {
						this.sb.open(" Plese Complete the Form one or more options are required");
					}
				}
			});

		// if (window.confirm("Are You Sure You want to Add this Plan")) {
		// 	if (this.Planform.valid) {
		// 		this.planserv.AddPlan(this.Planform.value).subscribe();
		// 	} else {
		// 		this.sb.open(" Plese Complete the Form one or more options are required");
		// 	}
		// }
	}
	getAllPlans() {
		this.planserv.Plan.subscribe((x) => {
			this.Plans = x;
			// console.log(x);
			this.dataSource = new MatTableDataSource<any>(this.Plans);
			this.dataSource.sort = this.sort;
			this.dataSource.paginator = this.paginator;
		});
	}
	deletePlan(id: any) {
		this.conf
			.confirmation({
				Title: "Delete Plan",
				Message: "Are You Sure You Want to Delete Plan",
				Confirm: "Delete",
				Cancel: "Close",
			})
			.subscribe((datax) => {
				if (datax) {
					this.planserv.deletePlanbyid(id).subscribe();
				}
			});
	}

	OpenDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: any): void {
		this.dialog.open(UpdatePlanDialogComponent, {
			width: "900px",
			height: "300px",
			disableClose: true,
			enterAnimationDuration,
			exitAnimationDuration,
			data: { id: id },
		});
	}

	ngOnInit(): void {
		this.getAllPlans();
		this.calcform = this.fb.group({
			Month: new FormControl(moment(), [Validators.required]),
		});
		this.calccondform = this.fb.group({
			Month: new FormControl(moment(), [Validators.required]),
		});
		this.Planform = this.fb.group({
			Month: new FormControl(moment(), [Validators.required]),
			PointPrice: new FormControl("", [Validators.required]),
			MinValue: new FormControl("", [Validators.required]),
		});
	}
}

