import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../Services/user.service";

@Injectable({
	providedIn: "root",
})
export class AuthGuard implements CanActivate {
	constructor(private auth: UserService, private router: Router) {}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		//return  this.auth.authSubject.value ||  this.router.parseUrl('UnAuth');
    var role= this.auth.getIsAuthed();
     var data=(route.data['roles'] as Array<any>)
    if(data.includes(role)) {
      return true;
    }
    else{
      alert("Blocked")
      this.router.navigate(['UnAuth'])
    return false
    }
	}
}

