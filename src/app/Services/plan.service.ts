import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { filter, finalize, Observable, tap } from "rxjs";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { environment } from "src/environments/environment";
import { IdataReturn } from "../Interfaces/IdataReturn";
import { IPlan } from "../Interfaces/IPlan";
@Injectable({
	providedIn: "root",
})
export class PlanService {
	PlanSubject = new BehaviorSubject<IPlan[]>([]);
	ourl = environment.calcurl;
	url = environment.PlanUrl;
	constructor(private http: HttpClient, private sb: MatSnackBar, public dialog: MatDialog) {
		this.getPlans();
	}
	AddPlan(body: IPlan) {
		return this.http.post<IPlan[]>(this.url + "/AddPlan", body).pipe(
			tap((x: any) => {
				if (x.result) {
					var newData = [...this.PlanSubject.value, x.result];
					this.PlanSubject.next(newData);
					setTimeout(() => {
						this.sb.open(" Plan Has Been Added Successfully");
					}, 2000);
				} else {
					this.sb.open(" Error : " + x.errorMessage);
				}
			})
		);
	}
	getPlans() {
		return this.http
			.get<IPlan[]>(this.url + "/GetPlans")
			.pipe(
				tap((x) => {
					//   console.log(x)
					this.PlanSubject.next(x);
				})
			)
			.subscribe();
	}
	get Plan(): Observable<any> {
		return this.PlanSubject.asObservable().pipe(filter((x) => x !== null));
	}
	updatePlan(body: IPlan) {
		return this.http.put(this.url + "/UpdatePlan", body).pipe(
			tap((x: any) => {
				//console.log(x);
				var plans = this.PlanSubject.value;
				if (x.result) {
					plans.forEach((element) => {
						if (element.id == x.result.id) {
							this.PlanSubject.value.splice(plans.indexOf(element), 1, x.result);
							this.PlanSubject.next(plans);
							this.sb.open(" Plan updated successfully");
						}
					});
				} else {
					this.sb.open(" Error : " + x.errorMessage);
				}
			}),
			finalize(() => {
				this.dialog.closeAll();
			})
		);
	}
	getPlanbyid(id: any) {
		return this.http.get(this.url + "/getPlanByid", {
			params: { id },
		});
	}
	getPlanbymonth(entity: string) {
		return this.http.get(this.url + "/getPlanByMonth", {
			params: { entity },
		});
	}

	deletePlanbyid(id: any) {
		return this.http
			.delete(this.url + "/DeletePlan", {
				params: { id },
			})
			.pipe(
				tap((x: any) => {
					var plans = this.PlanSubject.value;
					if (x.result) {
						plans.forEach((element) => {
							if (element.id == x.result.id) {
								var ids = this.PlanSubject.value.splice(plans.indexOf(element), 1);
								console.log(ids);
								this.PlanSubject.next(plans);
							}
						});
					} else {
						this.sb.open(" Error : " + x.errorMessage);
					}
				})
			);
	}

}
