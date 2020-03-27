import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TenantAdminComponent} from './tenant-admin.component';
import {IsTenantAdminGuard} from '../guards/is-tenant-admin.guard';
import {LoginComponent} from './login/login.component';
import {IsNotTenantAdminGuard} from '../guards/is-not-tenant-admin.guard';
import {ClientsComponent} from './clients/clients.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsNotTenantAdminGuard]
  },
  {
    path: '',
    component: TenantAdminComponent,
    canActivate: [IsTenantAdminGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'clients',
        component: ClientsComponent
      },
      {
        path: '',
        redirectTo: 'clients',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantAdminRoutingModule { }
