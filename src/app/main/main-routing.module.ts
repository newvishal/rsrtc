import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConatinerComponent } from './conatiner/conatiner.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  {
    path: "",
    component: ConatinerComponent,
    children:[
      {
        path: "",
        component: DashboardComponent
      },
      {
        path: "district",
        loadChildren: () =>
          import("./pages/district/district.module").then((m) => m.DistrictModule)
      },
      {
        path: "location-type",
        loadChildren: () =>
          import("./pages/location-type/location-type.module").then((m) => m.LocationTypeModule)
      },
      {
        path: "designation",
        loadChildren: () =>
          import("./pages/designation/designation.module").then((m) => m.DesignationModule)
      },
      {
        path: "bank",
        loadChildren: () =>
          import("./pages/bank/bank.module").then((m) => m.BankModule)
      },
      {
        path: "role",
        loadChildren: () =>
          import("./pages/role/role.module").then((m) => m.RoleModule)
      },
      {
        path: "zone",
        loadChildren: () =>
          import("./pages/zone/zone.module").then((m) => m.ZoneModule)
      },
      {
        path: "hra",
        loadChildren: () =>
          import("./pages/hra/hra.module").then((m) => m.HraModule)
      },
      {
        path: "section",
        loadChildren: () =>
          import("./pages/section/section.module").then((m) => m.SectionModule)
      },
      {
        path: "financial-year",
        loadChildren: () =>
          import("./pages/financial-year/financial-year.module").then((m) => m.FinancialYearModule)
      },
      {
        path: "month",
        loadChildren: () =>
          import("./pages/month/month.module").then((m) => m.MonthModule)
      },
      {
        path: "LeaveReasonType",
        loadChildren: () =>
          import("./pages/leave-reason-type/leave-reason-type.module").then((m) => m.LeaveReasonTypeModule)
      },
      {
        path: "employee",
        loadChildren: () =>
          import("./pages/employee/employee.module").then((m) => m.EmployeeModule)
      },
      {
        path: "leave-limit",
        loadChildren: () =>
          import("./pages/leave-limit/leave-limit.module").then((m) => m.LeaveLimitModule)
      },
      {
        path: "leave-type",
        loadChildren: () =>
          import("./pages/leave-type/leave-type.module").then((m) => m.LeaveTypeModule)
      },
      {
        path: "location",
        loadChildren: () =>
          import("./pages/location/location.module").then((m) => m.LocationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
