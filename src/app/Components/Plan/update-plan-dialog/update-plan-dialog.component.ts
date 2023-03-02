import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from "@angular/material-moment-adapter";
import {DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from "@angular/material/core";
import {MatDatepicker} from "@angular/material/datepicker";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import * as moment from "moment";
import { ConfirmationService } from "src/app/Services/confirmation.service";
import {PlanService} from "src/app/Services/plan.service";
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
	selector: "app-update-plan-dialog",
	templateUrl: "./update-plan-dialog.component.html",
	styleUrls: ["./update-plan-dialog.component.scss"],
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
export class UpdatePlanDialogComponent implements OnInit {
	Editform: FormGroup = new FormGroup({});
	TitlePlan!: Date;
	Id!:string
	onsubmit() {
		this.conf
		.confirmation({
			Title: "Update  Plan",
			Message: "Are You Sure You Want to Update this Plan",
			Confirm: "Update",
			Cancel: "Close",
		})
		.subscribe((datax) => {
			console.log(datax);
			if (datax == true) {
				if (this.Editform.valid) {
					this.planserv.updatePlan(this.Editform.value).subscribe();
				} else {
					this.sb.open(" Plese Complete the Form one or more options are required");
				}
			}
		
		});

	}
	get f() {
		return this.Editform.controls;
	}
	setMonthAndYear(normalizedMonthAndYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
		const ctrlValue = this.f["Month"].value!;
		ctrlValue.month(normalizedMonthAndYear.month());
		ctrlValue.year(normalizedMonthAndYear.year());
		this.f["Month"].setValue(ctrlValue);
		datepicker.close();
	}
	constructor(private planserv: PlanService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any ,private sb: MatSnackBar,private conf :ConfirmationService    
	) {}
	getPlanbyId() {
		this.planserv.getPlanbyid(this.data.id).subscribe((x: any) => {
			console.log(x);
			this.f["Id"].setValue(this.data.id);
			this.f["Month"].setValue(x.result.month);
			this.f["PointPrice"].setValue(x.result.pointPrice);
			this.f["MinValue"].setValue(x.result.minValue);
			this.TitlePlan = x.result.month;
		});
	}
	ngOnInit(): void {
		this.Id=this.data.id
		this.getPlanbyId();
		this.Editform = this.fb.group({
			Id: new FormControl(),
			Month: new FormControl({value:moment(),disabled:true}),
			PointPrice: new FormControl('',[Validators.required]),
			MinValue: new FormControl('',[Validators.required]),
		});
	}
}
