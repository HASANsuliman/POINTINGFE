import { OverlayContainer } from "@angular/cdk/overlay";
import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDrawer } from "@angular/material/sidenav";
import { Router } from "@angular/router";
import { UserService } from "src/app/Services/user.service";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
	Class = [
		{ value: 'darkMode', viewValue: 'Dark' },
		{ value: ' ', viewValue: 'Light' },
	];
	@Input() value!: MatDrawer;
	@Input() name!: string;
	toggleControl = new FormControl('');
	@HostBinding('class') className = '';
	UserName: any = "";
	isAuth: boolean = false;
	constructor(private user: UserService, private router: Router, private overlay: OverlayContainer) { }

	public add_showroom() {
		alert('adding showroom');
	}
	ngOnInit(): void {
		this.UserName = this.user.getName();
		this.toggleControl.valueChanges.subscribe((darkMode) => {
			//	console.log(darkMode);

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

