import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { DesignationService } from 'src/app/services/designation.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {IDesignation} from '../../../../shared/ts'
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['designationId', 'designationType', 'designationName', 'shortCode',  'status','actions'];
  dataSource: MatTableDataSource<IDesignation>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public designationService: DesignationService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getDesignations();
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

  getDesignations(){
    this.loading = true;
    this.designationService.find().subscribe((res: IDesignation[]) => {
      const Designation = res['data'] as IDesignation[];
      this.dataSource = new MatTableDataSource(Designation);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });

  }

  EditDesignation(detail: IDesignation) {
    console.log(detail)
    this.designationService.saveDetails(detail);
    this.route.navigate(['dashboard/designation/addEditDesignation'])
  }

}
