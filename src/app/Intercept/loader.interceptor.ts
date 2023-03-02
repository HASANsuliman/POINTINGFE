import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { delay, finalize, map, Observable, tap } from "rxjs";
import { LoaderService } from "../Services/loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
	constructor(private loaderService: LoaderService) { }
	getUrls: Array<string> = [
		"api/Plan/GetPlans",
		"api/Directcfg/GetDirectCfg",
		"api/Directcfg/GetDirectDetails",
		"api/SubDirect/GetallSubDirect",
		"api/Calculation/GetCalc",
		"api/Calculation/GetSalesform",
	];
	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		//console.log(request.url.substring(22));
		this.getUrls.includes(request.url.substring(22)) ? setTimeout(() => { this.loaderService.showBar(); }, 100) :
			setTimeout(() => {
				this.loaderService.show();
			}, 100);

		return next.handle(request).pipe(
			finalize(() => {
				this.getUrls.includes(request.url.substring(22))
					? setTimeout(() => {
						this.loaderService.hideBar();
					}, 100)
					: setTimeout(() => {
						this.loaderService.hide();
					}, 100);

				// if (request.method == "GET" && request.urlWithParams) {
				// 	setTimeout(() => {
				// 		this.loaderService.hideBar();
				// 	}, 200);
				// } else if (request.method == "POST") {
				// 	setTimeout(() => {
				// 		this.loaderService.hide();
				// 	}, 200);
				// }
			})
		);
	}
}

