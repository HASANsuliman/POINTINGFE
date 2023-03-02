import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, filter, tap } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class UserService {
	url = environment.userUrl;
	isAutheds!: boolean;
	UserName: string = "";
	// nameSubject = new BehaviorSubject<string>("");

	constructor(private http: HttpClient, private router: Router) {
		this.getUser()
	}
	getUser() {
		return this.http.get(this.url + "/Getclims").pipe(
			tap((x: any) => {
				//  let url = this.router.url
				//console.log(x);
				localStorage.setItem("Name", x.username);
				localStorage.setItem("Role", x.value);
				// this.nameSubject.next(x.result.name);
				// this.authSubject.next(x.result.isAuthenticated);
			})
		).subscribe();
	}
	// get authForName() {
	// 	return this.nameSubject.asObservable();
	// }
	getName() {
		return localStorage.getItem("Name")
	}
	getIsAuthed() {
		return localStorage.getItem("Role")
	}
}

