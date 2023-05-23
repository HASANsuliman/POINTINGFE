import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptInterceptor } from "./Intercept/auth-intercept.interceptor";
import { HeaderComponent } from "./Components/Layout/header/header.component";
import { SidenavComponent } from "./Components/Layout/sidenav/sidenav.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSelectModule } from "@angular/material/select";
import { MatDividerModule } from "@angular/material/divider";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MainPlanComponent } from "./Components/Plan/main-plan/main-plan.component";
import { UpdatePlanDialogComponent } from "./Components/Plan/update-plan-dialog/update-plan-dialog.component";
import { MainDirectComponent } from "./Components/DIrectConfig/main-direct/main-direct.component";
import { InfoDirectComponent } from "./Components/DIrectConfig/info-direct/info-direct.component";
import { DeleteDirectComponent } from "./Components/DIrectConfig/delete-direct/delete-direct.component";
import { MainComditionalComponent } from "./Components/Condetional/main-comditional/main-comditional.component";
import { AddSubComditionalComponent } from "./Components/Condetional/add-sub-comditional/add-sub-comditional.component";
import { SubConfigInfoComponent } from "./Components/Condetional/sub-config-info/sub-config-info.component";
import { UnAuthUserComponent } from "./Components/Layout/un-auth-user/un-auth-user.component";
import { WelcomeComponent } from "./Components/Layout/welcome/welcome.component";
import { MatStepperModule } from "@angular/material/stepper";
import { MainCalculationComponent } from "./Components/main-calculation/main-calculation.component";
import { LoaderComponent } from "./Components/Tools/loader/loader.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LoaderInterceptor } from "./Intercept/loader.interceptor";
import { ProgressBarComponent } from './Components/Tools/progress-bar/progress-bar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ConfirmationComponent } from './Components/Tools/confirmation/confirmation.component';
import { CalculationInfoComponent } from './Components/main-calculation/calculation-info/calculation-info.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ReportsComponent } from './Components/reports/reports.component';
import { ManegmentComponent } from './Components/manegment/manegment.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddSubPromComponent } from './Components/Condetional/add-sub-prom/add-sub-prom.component';
import { SubInfoPromComponent } from './Components/Condetional/sub-info-prom/sub-info-prom.component';
import { InfoDirectPromComponent } from './Components/DIrectConfig/info-direct-prom/info-direct-prom.component';
import { DeleteDirectPromComponent } from './Components/DIrectConfig/delete-direct-prom/delete-direct-prom.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DatePipe } from "@angular/common";
import { VasCalculationComponent } from './vas-calculation/vas-calculation.component';

export const MY_FORMATSd = {
	parse: {
		dateInput: "DD/MM/YYYY" + 1,
	},
	display: {
		dateInput: "DD/MM/YYYY",
		monthYearLabel: "DD/MM/YYYY",
		dateA11yLabel: "DD/MM/YYYY",
		monthYearA11yLabel: "DD/MM/YYYY",
	},
};
@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		SidenavComponent,
		MainPlanComponent,
		UpdatePlanDialogComponent,
		MainDirectComponent,
		InfoDirectComponent,
		DeleteDirectComponent,
		MainComditionalComponent,
		AddSubComditionalComponent,
		SubConfigInfoComponent,
		UnAuthUserComponent,
		WelcomeComponent,
		MainCalculationComponent,
		LoaderComponent,
		ProgressBarComponent,
		ConfirmationComponent,
		CalculationInfoComponent,
		ReportsComponent,
		ManegmentComponent,
		AddSubPromComponent,
		SubInfoPromComponent,
		InfoDirectPromComponent,
		DeleteDirectPromComponent,
  VasCalculationComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatSidenavModule,
		MatToolbarModule,
		ReactiveFormsModule,
		FormsModule,
		MatIconModule,
		MatListModule,
		MatCardModule,
		MatFormFieldModule,
		MatDatepickerModule,
		MatInputModule,
		MatButtonModule,
		MatTabsModule,
		MatSelectModule,
		MatDividerModule,
		HttpClientModule,
		MatDialogModule,
		MatSortModule,
		MatPaginatorModule,
		MatTableModule,
		MatDividerModule,
		MatGridListModule,
		MatSnackBarModule,
		MatStepperModule,
		MatProgressSpinnerModule,
		MatProgressBarModule,
		MatTableExporterModule,
		MatAutocompleteModule,
		MatSlideToggleModule,
		MatCheckboxModule
	],
	providers: [
		DatePipe,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptInterceptor,
			multi: true,
		},
		{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },

		{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000, panelClass: ["snackBar"] } },

		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE],
		},
		{
			provide: MAT_DATE_FORMATS,
			useValue: MY_FORMATSd,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule { }

