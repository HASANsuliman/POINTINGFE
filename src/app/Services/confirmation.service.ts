import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationComponent } from '../Components/Tools/confirmation/confirmation.component';
import { Iconfirm } from '../Interfaces/Iconfirm';
@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(private dialog :MatDialog){ }
  confirmation(data:Iconfirm):Observable<boolean> {
 return this.dialog.open(ConfirmationComponent,{
    data,
    width:"500px",
    height:"100x",
    disableClose: true,
    enterAnimationDuration:'1000ms',
    exitAnimationDuration:'1000ms',
  }).afterClosed()
  }
}
