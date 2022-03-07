import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { ILeaveLimit } from '../../../../shared/ts'
import { Router } from '@angular/router';
import { LeaveLimitService } from 'src/app/services/leave-limit.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['empLeaveApplicableId', 'leaveTypeId', 'empTypeId', 'perMonthLeaveAllowed', 'maxLeaveAllowed','carryForwardMaxLimit', 'status', 'actions'];
  dataSource: MatTableDataSource<ILeaveLimit>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public leaveLimitService: LeaveLimitService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getLeaveTypes();
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  getLeaveTypes(){
    this.loading = true;
    this.leaveLimitService.find().subscribe((res: ILeaveLimit[]) => {
      const LeaveLimit = res['data'] as ILeaveLimit[];
      this.dataSource = new MatTableDataSource(LeaveLimit);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });

  }

  EditLeaveType(detail: ILeaveLimit) {
    console.log(detail)
    this.leaveLimitService.saveDetails(detail);
    this.route.navigate(['dashboard/leave-limit/addEditLeaveLimit'])
  }

}
