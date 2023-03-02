import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CondetionalService } from 'src/app/Services/condetional.service';

@Component({
  selector: 'app-sub-config-info',
  templateUrl: './sub-config-info.component.html',
  styleUrls: ['./sub-config-info.component.scss']
})
export class SubConfigInfoComponent implements OnInit {

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
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private conditional: CondetionalService, public dialog: MatDialog,
    public dialogref: DialogRef) { }

  ngOnInit(): void {
    this.getAllSubDirect();
    // console.log(this.data);
  }


  applyFilter(event: Event) {
    if (this.dataSource) {
      const filterValue = (event.target as HTMLInputElement).value;

      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }
  getAllSubDirect() {
    this.conditional.getSubDirectDetails(this.data.subConfigId).subscribe((x: any) => {
      this.AllSubDirect = x;
      //   console.log(this.AllSubDirect);
      this.dataSource = new MatTableDataSource<any>(this.AllSubDirect);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })

  }
}
