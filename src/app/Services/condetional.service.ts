import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, filter, finalize, map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { IDirect } from "../Interfaces/IDirect";
// import { ISubDirect } from "/Interfaces/IsubDirect";
import { ISubDirect } from "../Interfaces/ISubDirect";
@Injectable({
	providedIn: "root",
})
export class CondetionalService {
	SubUrl = environment.SubDirectUrl;
	urlp = environment.PlanUrl;
	subConfigSubject = new BehaviorSubject<ISubDirect[]>([]);
	constructor(private http: HttpClient, private sb: MatSnackBar, public dialog: MatDialog) {
		this.GetallsubDirecct();
	}
	GetRegion(): Observable<string[]> {
		return this.http.get<string[]>(this.SubUrl + "/Getregion").pipe();
	}
	GetCity(REGION: string): Observable<string[]> {
		return this.http.get<string[]>(this.SubUrl + "/Getcity", { params: { REGION } });
	}

	GetZone(CITY: string): Observable<string[]> {
		return this.http.get<string[]>(this.SubUrl + "/Getzone", { params: { CITY } });
	}

	GetArea(ZONE: string): Observable<string[]> {
		return this.http.get<string[]>(this.SubUrl + "/Getarea", { params: { ZONE } });
	}

	GetSubArea(AREA: string): Observable<string[]> {
		return this.http.get<string[]>(this.SubUrl + "/Getsubarea", { params: { AREA } });
	}
	GetSdCode(SUBAREA: string): Observable<string[]> {
		return this.http.get<string[]>(this.SubUrl + "/Getsdcode", { params: { SUBAREA } });
	}
	GetallMonths() {
		return this.http.get<string[]>(this.SubUrl + "/Getallmonths");
	}
	GetAllDirectconfig(month: any) {
		return this.http.get(this.SubUrl + "/Getalldirect", { params: { month } })

	}
	GetAllDirectconfigbyid(Id: any) {
		return this.http.get(this.SubUrl + "/Getalldirectbyid", { params: { Id } });
	}

	GetallsubDirecct() {
		return this.http
			.get<ISubDirect[]>(this.SubUrl + "/GetallSubDirect")
			.pipe(
				tap((xy) => {
					this.subConfigSubject.next(xy);
				})
			)
			.subscribe();
	}
	get subDirect() {
		return this.subConfigSubject.asObservable().pipe(filter((x) => x !== null));
	}
	AddConditionalt(body: ISubDirect[]) {
		return this.http.post(this.SubUrl + "/AddSubDirect", body).pipe(
			tap((x: any) => {
				if (x.result) {
					//console.log(x);
					var newData = [...this.subConfigSubject.value, x.result];
					this.subConfigSubject.next(newData);
					this.dialog.closeAll();
					setTimeout(() => {
						this.sb.open(" SubConfig Has Been Added Successfully");
					}, 2000);
				} else {
					this.sb.open(" Error : " + x.errorMessage);
				}
			})
		);
	}
	// updateConfigPlan(body: any) {
	// 	return this.http.put(this.urlp + "/UpdatePlanconfig", body);
	// }
	deleteRangid(subConfigId: any) {
		return this.http.delete(this.SubUrl + "/deleteRangeId", { params: { subConfigId } }).pipe(
			tap((x: any) => {
				//console.log(x);
				var plans = this.subConfigSubject.value;
				if (x.result) {
					plans.forEach((element: any) => {
						//console.log(element);

						if (element.subConfigId == x.result[0].subConfigId) {
							var ids = this.subConfigSubject.value.splice(plans.indexOf(element), 1);
							// /console.log(ids);
							this.subConfigSubject.next(plans);
							this.dialog.closeAll();
						}
					});
				} else {
					this.sb.open(" Error : " + x.errorMessage);
				}
			}),
			finalize(() => {
				setTimeout(() => {
					this.sb.open(" Configuration Has Been Deleted Successfully");
				}, 1000)
			})
		);
	}
	getSubDirectDetails(subConfigId: any) {
		return this.http.get(this.SubUrl + "/GetallSubdirectSubid", { params: { subConfigId } });
	}
}

