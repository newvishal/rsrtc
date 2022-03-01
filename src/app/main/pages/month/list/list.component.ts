import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { MonthService } from 'src/app/services/month.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { IMonth } from '../../../../shared/ts'
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['monthId', 'fyId', 'monthName', 'attendanceStatus', 'salaryStatus', 'userId',  'status', 'actions'];
  dataSource: MatTableDataSource<IMonth>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public monthService: MonthService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getDistricts();
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

  getDistricts(){
    this.loading = true;
    this.monthService.find().subscribe((res: IMonth[]) => {
      const Month = res['data'] as IMonth[];
      this.dataSource = new MatTableDataSource(Month);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });

  }

  EditDistrict(detail: IMonth) {
    console.log(detail)
    this.monthService.saveDetails(detail);
    this.route.navigate(['dashboard/month/addEditMonth'])
  }

}
