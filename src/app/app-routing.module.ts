import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComditionalComponent } from "./Components/Condetional/main-comditional/main-comditional.component";
import { DeleteDirectComponent } from "./Components/DIrectConfig/delete-direct/delete-direct.component";
import { MainDirectComponent } from "./Components/DIrectConfig/main-direct/main-direct.component";
import { UnAuthUserComponent } from "./Components/Layout/un-auth-user/un-auth-user.component";
import { WelcomeComponent } from "./Components/Layout/welcome/welcome.component";
import { MainCalculationComponent } from "./Components/main-calculation/main-calculation.component";
import { ManegmentComponent } from "./Components/manegment/manegment.component";
import { MainPlanComponent } from "./Components/Plan/main-plan/main-plan.component";
import { ReportsComponent } from "./Components/reports/reports.component";
import { AuthGuard } from "./Guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: WelcomeComponent,
  },
  {
    path: 'Calculation',
    component: MainCalculationComponent,
    // canActivate: [AuthGuard],
    // data: { roles: ['Admin'] }
  },
  {
    path: "Plan",
    component: MainPlanComponent,
    //  canActivate: [AuthGuard],
    // data: { roles: ['Admin'] }
  },
  {
    path: 'DirectSales',
    component: MainDirectComponent,
    // canActivate: [AuthGuard],
    // data: { roles: ['Admin'] }

  },
  {
    path: 'deletecfg',
    component: DeleteDirectComponent,
    // canActivate: [AuthGuard],

  },
  {
    path: 'Conditional',
    component: MainComditionalComponent,
    // canActivate: [AuthGuard],
    // data: { roles: ['Admin'] }

  },

  {
    path: 'Reports',
    component: ReportsComponent,
    // canActivate: [AuthGuard],
    // data: { roles: ['Admin'] }

  },
  {
    path: "RoleManegment",
    component: ManegmentComponent
  },
  {
    path: 'UnAuth',
    component: UnAuthUserComponent,
  },
  //  { path: '', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
