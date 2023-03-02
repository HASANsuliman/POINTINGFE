import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged, map, Observable, startWith, tap } from 'rxjs';
import { ConfirmationService } from 'src/app/Services/confirmation.service';

@Component({
  selector: 'app-manegment',
  templateUrl: './manegment.component.html',
  styleUrls: ['./manegment.component.scss']
})
export class ManegmentComponent implements OnInit {
  ManagmentForm: FormGroup = new FormGroup({});
  valueSearch: any
  val: any
  options: string[] = ['One', 'Two', 'Three'];
  //Roles: string[] = ['Admin', 'HOU', 'SalesSupport', 'User'];
  Roles = [
    { value: 'Admin', viewValue: 'Admin' },
    { value: 'HOU', viewValue: 'HOU' },
    { value: 'SalesSupport', viewValue: 'Sales Support' },
    { value: 'User', viewValue: 'User' },

  ];
  filteredOptions!: Observable<string[]>;
  constructor(private fb: FormBuilder, private sb: MatSnackBar, public dialog: MatDialog, private conf: ConfirmationService) { }
  get f() {
    return this.ManagmentForm.controls
  }
  onsubmit() {
    // this.conf
    //   .confirmation({
    //     Title: "Adding new  Role",
    //     Message: "Are You Sure",
    //     Confirm: "Add  User",
    //     Cancel: "Close",
    //   })
    //   .subscribe((datax) => {
    //     console.log(datax);
    //     if (datax == true) {
    //       if (this.ManagmentForm.valid) {
    //         this.sb.open("true");
    //       } else {
    //         window.alert(' nooooooooo')
    //       }
    //     }
    //   });
    console.log(this.ManagmentForm.controls['Name']);

  }
  ngOnInit(): void {
    this.ManagmentForm = this.fb.group({
      Name: new FormControl("", [Validators.required]),
      Role: new FormControl("", [Validators.required]),
    })
    this.filteredOptions = this.ManagmentForm.controls['Name'].valueChanges.pipe(
      startWith(' '),
      distinctUntilChanged(),
      debounceTime(1500),

      map((x: any) => this._filter(x || '')),
      tap((xx: any) => {
        this.val = xx

      }),
    )

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.valueSearch = this.options.filter(option => option.toLowerCase().includes(filterValue));
    return this.valueSearch

  }

}
