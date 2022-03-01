import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { FinancialYearService } from 'src/app/services/financial-year.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { IFinancialYear } from '../../../../shared/ts'
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['fyId', 'financialYear', 'shortCode', 'fyFrom', 'fyTo', 'status', 'actions'];
  dataSource: MatTableDataSource<IFinancialYear>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public FYService: FinancialYearService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getFY();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getFY(){
    this.loading = true;
    this.FYService.find().subscribe((res: IFinancialYear[]) => {
      const FY = res['data'] as IFinancialYear[];
      this.dataSource = new MatTableDataSource(FY);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });

  }

  EditFY(detail: IFinancialYear) {
    console.log(detail)
    this.FYService.saveDetails(detail);
    this.route.navigate(['dashboard/financial-year/addEditFY'])
  }

}
