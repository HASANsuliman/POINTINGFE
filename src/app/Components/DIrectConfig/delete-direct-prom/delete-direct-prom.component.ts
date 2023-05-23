import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationService } from 'src/app/Services/confirmation.service';
import { DirectService } from 'src/app/Services/direct.service';

@Component({
  selector: 'app-delete-direct-prom',
  templateUrl: './delete-direct-prom.component.html',
  styleUrls: ['./delete-direct-prom.component.scss']
})
export class DeleteDirectPromComponent implements OnInit {
  PlanList: any;
  id: any;
  deletedcfg: any;
  deleteform: FormGroup = new FormGroup({});
  get f() {
    return this.deleteform.controls;
  }
  getplanlist() {
    this.directServ.getPlanlistProm().subscribe((x: any) => {
      this.PlanList = x.result;
      console.log(x);
    });
  }

  getplanlistId() {
    this.directServ.getPlanIdProm(this.f["Month"].value).subscribe((x: any) => {
      // console.log(x);

      this.id = x.result[0];
      this.f["PlanId"].setValue(this.id);
      // console.log(x);
    });
  }

  onsubmit() {
    this.conf
      .confirmation({
        Title: "Delete Configuration ",
        Message: "Are You Sure You Want Delete This Configuration",
        Confirm: "Delete",
        Cancel: "Close",
      })
      .subscribe((datax) => {
        if (datax) {
          this.directServ.DeleteconfigProm(this.id).subscribe();
        }
      });
  }
  constructor(private fb: FormBuilder, private directServ: DirectService, private sb: MatSnackBar, public dialog: MatDialog, public route: Router, private conf: ConfirmationService) { }

  ngOnInit(): void {
    this.getplanlist();
    this.deleteform = this.fb.group({
      PlanId: new FormControl(),
      Month: new FormControl([Validators.required]),
    });
  }

}
