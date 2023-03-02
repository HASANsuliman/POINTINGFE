import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ConfirmationService } from "src/app/Services/confirmation.service";
import { DirectService } from "src/app/Services/direct.service";

@Component({
	selector: "app-delete-direct",
	templateUrl: "./delete-direct.component.html",
	styleUrls: ["./delete-direct.component.scss"],
})
export class DeleteDirectComponent implements OnInit {
	PlanList: any;
	id: any;
	deletedcfg: any;
	deleteform: FormGroup = new FormGroup({});
	get f() {
		return this.deleteform.controls;
	}
	getplanlist() {
		this.directServ.getPlanlist().subscribe((x: any) => {
			this.PlanList = x.result;
			console.log(x);
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

	constructor(private fb: FormBuilder, private directServ: DirectService, private sb: MatSnackBar, public dialog: MatDialog, public route: Router, private conf: ConfirmationService) {}
	onsubmit() {
		this.conf
			.confirmation({
				Title: "Delete Configuration ",
				Message: "Are You Sure You Want Delete This Configuration",
				Confirm: "Delete",
				Cancel: "Close",
			})
			.subscribe((datax) => {
				if (datax) {
					this.directServ.Deleteconfig(this.id).subscribe();
				}
			});
	}
	// onsubmit() {
	// 	// console.log(this.deleteform.value);

	// 	if (window.confirm("Are You Sure You want to Delete configration of this Month ")) {
	// 		this.directServ.Deleteconfig(this.id).subscribe(
	// 			(x) => {
	// 				this.deletedcfg = x;
	// 				//console.log(this.deletedcfg);

	// 				if (this.deletedcfg.errorMessage == null) {
	// 					this.dialog.closeAll();
	// 					this.route.navigateByUrl("deletecfg", {skipLocationChange: true}).then(() => {
	// 						this.route.navigate(["DirectSales"]);
	// 					});
	// 					setTimeout(() => {
	// 						this.sb.open("configration  For " + this.deletedcfg.result[0].month + " Has Been Deleted");
	// 					}, 1500);
	// 				} else {
	// 					this.sb.open(this.deletedcfg.errorMessage);
	// 					this.dialog.closeAll();
	// 					this.route.navigateByUrl("deletecfg", {skipLocationChange: true}).then(() => {
	// 						this.route.navigate(["DirectSales"]);
	// 					});
	// 				}
	// 			},
	// 			(err) => {
	// 				this.sb.open("Your Request Has been Canceled error " + err.status + " " + err.statusText);
	// 			}
	// 		);
	// 	}
	// }
	ngOnInit(): void {
		this.getplanlist();
		this.deleteform = this.fb.group({
			PlanId: new FormControl(),
			Month: new FormControl([Validators.required]),
		});
	}
}

