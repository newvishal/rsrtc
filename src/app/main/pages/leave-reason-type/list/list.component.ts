import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { LeaveReasonTypeService } from 'src/app/services/leave-reason-type.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {ILeaveReasonType} from '../../../../shared/ts'
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['leaveReasonTypeId', 'reasonType', 'shortCode', 'status', 'actions'];
  dataSource: MatTableDataSource<ILeaveReasonType>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public leaveReasonTypeService: LeaveReasonTypeService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getLeaveReasonType();
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

  getLeaveReasonType(){
    this.loading = true;
    this.leaveReasonTypeService.find().subscribe((res: ILeaveReasonType[]) => {
      const LeaveReasonType = res['data'] as ILeaveReasonType[];
      this.dataSource = new MatTableDataSource(LeaveReasonType);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });

  }

  EditLeaveReasonType(detail: ILeaveReasonType) {
    console.log(detail)
    this.leaveReasonTypeService.saveDetails(detail);
    this.route.navigate(['dashboard/LeaveReason/addEditLeaveReasonType'])
  }

}
