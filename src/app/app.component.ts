import { OverlayContainer } from "@angular/cdk/overlay";
import { Component, OnInit, OnChanges, SimpleChanges, HostBinding, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDrawer } from "@angular/material/sidenav";
import { Router } from "@angular/router";
import { UserService } from "./Services/user.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
	title = "PointingFE";
	name: string = "";
	Class = [
		{ value: 'darkMode', viewValue: 'Dark' },
		{ value: '', viewValue: 'Light' },
	];
	@Input() value!: MatDrawer;
	toggleControl = new FormControl('');
	@HostBinding('class') className = '';
	UserName: any = "";
	UserName1: any = "";

	isAuth: boolean = false;
	constructor(private user: UserService, private router: Router, private overlay: OverlayContainer) { }

	public add_showroom() {
		alert('adding showroom');
	}
	ngOnInit(): void {


		this.UserName = this.user.getName();
		//console.log(this.UserName1);

		this.toggleControl.valueChanges.subscribe((darkMode) => {
			console.log(darkMode);

			const darkClassName = 'darkMode';
			this.className = darkMode ? darkClassName : '';
			if (darkMode == "Dark") {
				this.overlay.getContainerElement().classList.add(darkClassName);
			} else {
				this.overlay.getContainerElement().classList.remove(darkClassName);
			}
		});
		//   console.log(this.UserName);
	}


}

