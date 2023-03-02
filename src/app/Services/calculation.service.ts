import { HttpClient } from "@angular/common/http";
import { Injectable, ViewChild } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, filter, finalize, map, Observable, switchMap, take, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { MatStepper } from "@angular/material/stepper";
import { ICalc } from "../Interfaces/ICalc";
import { Router } from "@angular/router";

@Injectable({
	providedIn: "root",
})
export class CalculationService {
	url = environment.calcurl;
	SubUrl = environment.SubDirectUrl;
	colorizedSubject = new BehaviorSubject<any>("accent")
	colorized2Subject = new BehaviorSubject<any>("accent")
	calcsubject = new BehaviorSubject<ICalc[]>([]);

	constructor(private http: HttpClient, private sb: MatSnackBar, private route: Router) { this.getDataCalc() }
	addCalc(body: any, stepper: MatStepper) {
		return this.http.post(this.url + "/AddCalc", body).pipe(
			tap({
				next: (x: any) => {
					console.log(x);

				},
				error: (er: Error) => this.sb.open(" error: " + er.name + " " + er.message)
				,
				complete: () => {
					this.sb.open(" Calculation  Has Been Added Successfully");
					stepper.next();
					this.colorizedSubject.next("primary")
				}
			}),

		);
	}
	addCalcExcel(excelFileData: any) {
		return this.http.post(this.url + "/AddCalcExcel", { excels: excelFileData.da, ranges: excelFileData.ra, month: excelFileData.mo }).pipe(tap({
			next: (x: any) => {
				//	console.log(x);

				var newData = [...this.calcsubject.value, x.result]
				this.calcsubject.next(newData)
			},
			error: (er: Error) => this.sb.open(" File Not Accepted " + er.message)
			,
			complete: () => {
				this.sb.open(" Calculation  Has Been Added Successfully");
				//this.route.navigateByUrl('/Calculation')

				this.route.navigateByUrl("Conditional", { skipLocationChange: true }).then(() => {
					this.route.navigate(["Calculation"]);
				});

			}

		}))
	}
	addCalculation(body: any, stepper: MatStepper) {
		return this.http.post(this.url + "/AddCalcCond", body).pipe(
			tap((x: any) => {
				//	console.log(x);

				var newData = [...this.calcsubject.value, x.result]
				this.calcsubject.next(newData)
				setTimeout(() => {
					this.sb.open(" Calculation  Has Been Added Successfully");
				}, 2000);
			}),
			finalize(() => {
				stepper.next();
				this.colorized2Subject.next("primary")

			})
		);
	}
	GetAllDirectconfigbyid(Id: any) {
		return this.http.get(this.SubUrl + "/Getalldirectbyid", { params: { Id } });
	}
	GetallMonths() {
		return this.http.get(this.SubUrl + "/Getallmonths").pipe()
	}
	Getplan() {
		return this.http.get(this.url + "/Getplan")
	}
	GetAllDirectconfig(month: any) {
		return this.http.get(this.SubUrl + "/Getalldirect", { params: { month } }).pipe(map((x: any) => x[0].planId
		), switchMap((x: any) => this.GetAllDirectconfigbyid(x)))
	}
	GetallMonthsExcel() {
		return this.http.get(this.SubUrl + "/Getallmonths")
	}
	getDataCalc() {
		return this.http.get<ICalc[]>(this.url + '/GetCalc').pipe(
			tap((x) => this.calcsubject.next(x))

		).subscribe();
	}
	get datacalc(): Observable<ICalc[]> {
		return this.calcsubject.asObservable().pipe(filter((x) => x !== null))
	}
	GetCalcbyId(id: any, userName: string) {
		return this.http.get(this.url + "/GetCalcById", {
			params: { id, userName },
		});
	}
	getDataSales() {
		return this.http.get(this.url + "/GetSales")
	}
	DataSalesf(body: any) {
		return this.http.post(this.url + "/GetSalesform", body)
	}
}