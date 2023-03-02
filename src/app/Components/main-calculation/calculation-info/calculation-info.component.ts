import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CalculationService } from 'src/app/Services/calculation.service';
import { DirectService } from 'src/app/Services/direct.service';

@Component({
  selector: 'app-calculation-info',
  templateUrl: './calculation-info.component.html',
  styleUrls: ['./calculation-info.component.scss']
})
export class CalculationInfoComponent implements OnInit {
  displayedColumns: string[] = ['id','plan','userName','dateEntry'];
  dataSource!: MatTableDataSource<any>;
  Id:any
  userName:any
  calcInfo:any
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
  constructor( private calcService: CalculationService,private router: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    
    this.Id=this.data.id
    this.userName=this.data.userName
    this.calcService.GetCalcbyId(this.Id,this.userName).subscribe((x:any)=>{
      //console.log(x);
      
     this.calcInfo=x.result;
     this.dataSource = new MatTableDataSource<any>(this.calcInfo);
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;

}) 
  }

}
