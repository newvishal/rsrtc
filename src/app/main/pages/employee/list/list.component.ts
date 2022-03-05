import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { IEmployee } from '../../../../shared/ts'
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['employeeId', 'employeeName', 'locationType', 'zoneId', 'districtId', 'locationId', 'empType', 'mobile', 'yearOfPosting',  'status','actions'];
  dataSource: MatTableDataSource<IEmployee>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public employeeService: EmployeeService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getEmployee();
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

  getEmployee(){
    this.loading = true;
    this.employeeService.find().subscribe((res: IEmployee[]) => {
      const Employee = res['data'] as IEmployee[];
      this.dataSource = new MatTableDataSource(Employee);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });

  }

  EditEmployee(detail: IEmployee) {
    console.log(detail)
    this.employeeService.saveDetails(detail);
    this.route.navigate(['dashboard/employee/addEditEmployee'])
  }


}
