import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BaseLayoutComponent } from "./Layout/base-layout/base-layout.component";
import { PagesLayoutComponent } from "./Layout/pages-layout/pages-layout.component";

// DEMO PAGES

// Dashboards

import { AnalyticsComponent } from "./DemoPages/Dashboards/analytics/analytics.component";
import { parkingDetailComponent } from "./DemoPages/Dashboards/parkingDetail/parkingDetail.component";
// Pages

import { LoginBoxedComponent } from "./DemoPages/admin/admin-login/Login.component";

// Elements

// Components
import { TabsComponent } from "./DemoPages/User/Owner/tabs.component";
import { UserComponent } from "./DemoPages/User/User/users.component";


// Widgets

import { ChartBoxes3Component } from "./DemoPages/Static/chart-boxes3/chartscript.component";
//Thong ke giao dich
import { TransactionsComponent } from "./DemoPages/Static/chart-boxes3/trantable/trantable.component";

//admin
import { ParkingsComponent } from "./DemoPages/admin/add-parking/addParking.component";
import { AddImageComponent } from "./DemoPages/admin/add-image/addImage.component";

const routes: Routes = [
    { path: "", component:LoginBoxedComponent },
    {
        path: "home",
        component: BaseLayoutComponent,
        children: [
            // Dashboads

            {
                path: "analytic",
                component: AnalyticsComponent,
                
            },
            {
                path: "parkingDetail/:id",
                component: parkingDetailComponent,
               
            },

            // Components

            {
                path: "owners",
                component: TabsComponent,
            },
            {
                path: "users",
                component: UserComponent,
            },

            // Thống kê

            {
                path: "transcript",
                component: ChartBoxes3Component
            },
            { path: "add-parking", component: ParkingsComponent },
            { path: "viewtransactions", component: TransactionsComponent },
            { path: "add_image", component: AddImageComponent }
        ]
    },
    { path: "login", component:LoginBoxedComponent },

    { path: "**", redirectTo: "" }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: "enabled",
            anchorScrolling: "enabled"
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
