import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, filter, finalize, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { IDirect } from "../Interfaces/IDirect";

@Injectable({
	providedIn: "root",
})
export class DirectService {
	url = environment.DirectUrl;
	urlProm = environment.DirectPromUrl;

	urlP = environment.PlanUrl;

	haveConfig = false;
	configSubject = new BehaviorSubject<IDirect[]>([]);
	configPromSubject = new BehaviorSubject<IDirect[]>([]);


	constructor(private http: HttpClient, private sb: MatSnackBar, public dialog: MatDialog) {
		this.getDirectConfigFromApi();
		this.getDirectConfigFromApiProm();
	}

	getPlanlist() {
		return this.http.get(this.url + "/GetMonthlist");
	}
	getPlanlistr(): Observable<string[]> {
		return this.http.get<string[]>(this.url + "/GetMonthlist").pipe();
	}
	getPlanId(month: any) {
		return this.http.get(this.url + "/GetPlanlistid", {
			params: { month },
		});
	}
	getDirectConfigFromApi() {
		return this.http
			.get<IDirect[]>(this.url + "/GetDirectCfg")
			.pipe(
				tap((xy) => {
					this.configSubject.next(xy);
					this.haveConfig = true;
				})
			)
			.subscribe();
	}

	get DirectCfg(): Observable<IDirect[]> {
		return this.configSubject.asObservable().pipe(filter((x) => x !== null));
	}

	AddDirect(body: IDirect[]) {
		return this.http.post<IDirect[]>(this.url + "/AddDirect", body).pipe(
			tap((x: any) => {
				if (x.result) {
					//	console.log(x);

					var newData = [...this.configSubject.value, x.result];
					this.configSubject.next(newData);
					setTimeout(() => {
						this.sb.open(" Config Has Been Added Successfully");
					}, 2000);
				} else {
					this.sb.open(" Error : " + x.errorMessage);
				}
			})
		);
	}
	GetDirectDetails(id: any) {
		return this.http.get(this.url + "/GetDirectDetails", {
			withCredentials: true,
			params: { id },
		});
	}
	Deleteconfig(id: any) {
		return this.http
			.delete(this.url + "/DeleteDirect", {
				withCredentials: true,
				params: { id },
			})
			.pipe(
				tap((x: any) => {
					//console.log(x);
					var plans = this.configSubject.value;
					if (x.result) {
						plans.forEach((element: any) => {
							//	console.log(element);

							if (element.planId == x.result[0].planId) {
								var ids = this.configSubject.value.splice(plans.indexOf(element), 1);
								// /console.log(ids);
								this.configSubject.next(plans);
								this.dialog.closeAll();
								setTimeout(() => {
									this.sb.open(" Configuration Has Been Deleted Successfully");
								}, 1500);
							}
						});
					} else {
						this.sb.open(" Error : " + x.errorMessage);
					}
				})
				// finalize(() => {
				//   this.configSubject.next(plans);
				// })
			);
	}
	////Prom
	getPlanlistProm() {
		return this.http.get(this.urlProm + "/GetMonthlistProm");
	}
	getPlanlistrProm(): Observable<string[]> {
		return this.http.get<string[]>(this.urlProm + "/GetMonthlistProm").pipe();
	}
	getPlanIdProm(month: any) {
		return this.http.get(this.urlProm + "/GetPlanlistidProm", {
			params: { month },
		});
	}
	getDirectConfigFromApiProm() {
		return this.http
			.get<IDirect[]>(this.urlProm + "/GetDirectCfgProm")
			.pipe(
				tap((xy) => {
					this.configPromSubject.next(xy);
					this.haveConfig = true;
				})
			)
			.subscribe();
	}

	get DirectCfgProm(): Observable<IDirect[]> {
		return this.configPromSubject.asObservable().pipe(filter((x) => x !== null));
	}

	AddDirectProm(body: IDirect[]) {
		return this.http.post<IDirect[]>(this.urlProm + "/AddDirectProm", body).pipe(
			tap((x: any) => {
				if (x.result) {
					//	console.log(x);

					var newData = [...this.configPromSubject.value, x.result];
					this.configPromSubject.next(newData);
					setTimeout(() => {
						this.sb.open(" Config Has Been Added Successfully");
					}, 2000);
				} else {
					this.sb.open(" Error : " + x.errorMessage);
				}
			})
		);
	}
	GetDirectDetailsProm(id: any) {
		return this.http.get(this.urlProm + "/GetDirectDetailsProm", {
			withCredentials: true,
			params: { id },
		});
	}
	DeleteconfigProm(id: any) {
		return this.http
			.delete(this.urlProm + "/DeleteDirectProm", {
				withCredentials: true,
				params: { id },
			})
			.pipe(
				tap((x: any) => {
					//console.log(x);
					var plans = this.configPromSubject.value;
					if (x.result) {
						plans.forEach((element: any) => {
							//	console.log(element);

							if (element.planId == x.result[0].planId) {
								var ids = this.configPromSubject.value.splice(plans.indexOf(element), 1);
								// /console.log(ids);
								this.configPromSubject.next(plans);
								this.dialog.closeAll();
								setTimeout(() => {
									this.sb.open(" Configuration Has Been Deleted Successfully");
								}, 1500);
							}
						});
					} else {
						this.sb.open(" Error : " + x.errorMessage);
					}
				})
				// finalize(() => {
				//   this.configSubject.next(plans);
				// })
			);
	}


}

