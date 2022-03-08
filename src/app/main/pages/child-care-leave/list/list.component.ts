import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { ChildCareLeaveService } from 'src/app/services/child-care-leave.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { IChildCareLeave } from '../../../../shared/ts'
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['mPleaveId', 'leaveType', 'gender', 'maxLeaveAllowed', 'tillChildAge', 'status','actions'];
  dataSource: MatTableDataSource<IChildCareLeave>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public childCareLeaveService: ChildCareLeaveService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getDesignations();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDesignations(){
    this.loading = true;
    this.childCareLeaveService.getAllChildCareLeave().subscribe((res: IChildCareLeave[]) => {
      const ChildCareLeave = res['data'] as IChildCareLeave[];
      this.dataSource = new MatTableDataSource(ChildCareLeave);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });

  }

  EditChildCareLeave(detail: IChildCareLeave) {
    console.log(detail)
    this.childCareLeaveService.saveDetails(detail);
    this.route.navigate(['dashboard/ccl/addEditCCL'])
  }

}
