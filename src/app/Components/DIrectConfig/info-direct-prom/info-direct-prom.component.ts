import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DirectService } from 'src/app/Services/direct.service';

@Component({
  selector: 'app-info-direct-prom',
  templateUrl: './info-direct-prom.component.html',
  styleUrls: ['./info-direct-prom.component.scss']
})
export class InfoDirectPromComponent implements OnInit {
  displayedColumns: string[] = ['month', 'rangeFrom', 'rangeTo', 'points'];
  dataSource!: MatTableDataSource<any>;
  Id: any
  direcdetails: any
  month: any
  constructor(private directserv: DirectService, private router: ActivatedRoute, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    this.Id = this.data.id

    this.directserv.GetDirectDetailsProm(this.Id).subscribe((datax: any) => {
      // console.log(datax);
      this.direcdetails = datax.result;
      this.month = this.direcdetails[0].month
      this.dataSource = new MatTableDataSource<any>(this.direcdetails);


    })
  }

}
