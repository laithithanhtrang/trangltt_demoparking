import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';

// DEMO PAGES

// Dashboards

import {AnalyticsComponent} from './DemoPages/Dashboards/analytics/analytics.component';
import { parkingDetailComponent } from './DemoPages/Dashboards/parkingDetail/parkingDetail.component'
// Pages


import {LoginBoxedComponent} from './DemoPages/admin/admin-login/Login.component';

// Elements

// Components
import {TabsComponent} from './DemoPages/Transcript/tabs/tabs.component';


// Widgets

import {ChartBoxes3Component} from './DemoPages/Other/chart-boxes3/chart-boxes3.component';
//admin
import {ParkingsComponent} from './DemoPages/admin/add-parking/Addparking.component';



const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
    
      // Dashboads

      {path: '', component: AnalyticsComponent, data: {extraParameter: 'dashboardsMenu'}},
      {path:'parkingDetail/:id', component: parkingDetailComponent, data:{extraParameter:''}},

      // Components

      {path: 'components/tabs', component: TabsComponent, data: {extraParameter: 'componentsMenu'}},


      // Widgets

      {path: 'widgets/chart-boxes-3', component: ChartBoxes3Component, data: {extraParameter: 'pagesMenu3'}},
      {path:'admin/add-parking',component: ParkingsComponent},

    
    ]

  },
  
  {
    path: '',
    component: PagesLayoutComponent,
    children: [
      
      // User Pages

      {path: 'admin/login', component: LoginBoxedComponent, data: {extraParameter: ''}},
      
 
    ]
  },
  {path: '**', redirectTo:''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
