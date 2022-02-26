import { Component, OnInit, ViewChild } from '@angular/core';
declare var $:any;
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { UserRoleService } from 'src/app/services/user-role.service';
import { IUserRole } from '../../../../shared/ts';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['roleId','roleName','status','actions'];
  dataSource: MatTableDataSource<IUserRole>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public userRoleService: UserRoleService, public route: Router) { }
  loadingBanks: boolean = false;
  ngOnInit(): void {
    this.getAllRole();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllRole(){
    this.loadingBanks = true;
    this.userRoleService.getAllUserRole().subscribe((res: IUserRole[]) => {
      const Bank = res['data'] as IUserRole[];
      this.dataSource = new MatTableDataSource(Bank);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loadingBanks = false;
    }, (err) => {
      console.log(err)
    });

  }

  EditUserRole(detail: IUserRole) {
    console.log(detail)
    this.userRoleService.saveUserRoleById(detail);
    this.route.navigate(['dashboard/role/addEditRole'])
  }

}
