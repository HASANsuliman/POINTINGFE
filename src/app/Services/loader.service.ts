import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading = new BehaviorSubject<boolean>(false);
  isLoadingBar = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  show() {
     this.isLoading.next(true);
  }
  showBar() {
    this.isLoadingBar.next(true);
 }

  hide() {
     this.isLoading.next(false);
  }
  hideBar() {
    this.isLoadingBar.next(false);
 }
}
