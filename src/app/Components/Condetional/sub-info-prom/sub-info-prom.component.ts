import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CondetionalService } from 'src/app/Services/condetional.service';

@Component({
  selector: 'app-sub-info-prom',
  templateUrl: './sub-info-prom.component.html',
  styleUrls: ['./sub-info-prom.component.scss']
})
export class SubInfoPromComponent implements OnInit {
  displayedColumns: string[] = ['subConfigId', 'dateFrom', 'dateTo', 'region', 'city', 'zone', 'area', 'subarea', 'subdealer',
    'rangeFrom',
    'rangeTo',
    'points', 'extraPoints'
  ];
  AllSubDirect: any
  subConfigId: any
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getAllSubDirect() {
    this.conditional.getSubDirectDetails(this.data.subConfigId).subscribe((x: any) => {
      this.AllSubDirect = x;
      //   console.log(this.AllSubDirect);
      this.dataSource = new MatTableDataSource<any>(this.AllSubDirect);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })

  }
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private conditional: CondetionalService, public dialog: MatDialog,
    public dialogref: DialogRef) { }
  applyFilter(event: Event) {
    if (this.dataSource) {
      const filterValue = (event.target as HTMLInputElement).value;

      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }
  ngOnInit(): void {
    this.getAllSubDirect();

  }

}
