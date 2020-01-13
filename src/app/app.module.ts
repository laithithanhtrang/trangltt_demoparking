import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgReduxModule } from "@angular-redux/store";
import { NgRedux, DevToolsExtension } from "@angular-redux/store";
import { rootReducer, ArchitectUIState } from "./ThemeOptions/store";
import { ConfigActions } from "./ThemeOptions/store/config.actions";
import { AppRoutingModule } from "./app-routing.module";
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { MatSliderModule } from "@angular/material/slider";
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
} from "@angular/material";
import {NgxPaginationModule} from 'ngx-pagination';

import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor } from "./_guards/token.interceptor";
import  {ErrorInterceptor} from './_guards/error.interceptor';
import { AppComponent } from "./app.component";
import { JwPaginationComponent } from 'jw-angular-pagination';
import { PagerService } from './_services/page.service';

// BOOTSTRAP COMPONENTS
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { ChartsModule } from "ng2-charts";

// LAYOUT
import { BaseLayoutComponent } from "./Layout/base-layout/base-layout.component";
import { PagesLayoutComponent } from "./Layout/pages-layout/pages-layout.component";
import { PageTitleComponent } from "./Layout/Components/page-title/page-title.component";

// HEADER
import { HeaderComponent } from "./Layout/Components/header/header.component";
import { SearchBoxComponent } from "./Layout/Components/header/elements/search-box/search-box.component";
import { UserBoxComponent } from "./Layout/Components/header/elements/user-box/user-box.component";

// SIDEBAR
import { SidebarComponent } from "./Layout/Components/sidebar/sidebar.component";
import { LogoComponent } from "./Layout/Components/sidebar/elements/logo/logo.component";

// FOOTER
import { FooterComponent } from "./Layout/Components/footer/footer.component";

// DEMO PAGES

// Dashboards
import { AnalyticsComponent } from "./DemoPages/Dashboards/analytics/analytics.component";

// User
import { TabsComponent } from "./DemoPages/User/Owner/tabs.component";
import { UserComponent } from "./DemoPages/User/User/users.component";

// Widgets
import { ChartBoxes3Component } from "./DemoPages/Static/chart-boxes3/chartscript.component";

//Admin
import { ParkingsComponent } from "./DemoPages/admin/add-parking/Addparking.component";
import { AddImageComponent } from "./DemoPages/admin/add-image/Addimage.component";

// Pages
import { LoginBoxedComponent } from "./DemoPages/admin/admin-login/Login.component";
import { parkingDetailComponent } from "./DemoPages/Dashboards/parkingDetail/parkingDetail.component";
//Thong ke
import { TransactionsComponent } from "./DemoPages/Static/chart-boxes3/trantable/trantable.component";
import { RatingModule } from "ng-starrating";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [
        // LAYOUT
        AppComponent,
        BaseLayoutComponent,
        PagesLayoutComponent,
        PageTitleComponent,
        JwPaginationComponent,
        

        // HEADER
        HeaderComponent,
        SearchBoxComponent,
        UserBoxComponent,

        // SIDEBAR
        SidebarComponent,
        LogoComponent,

        // FOOTER
        FooterComponent,

        // Dashboards
        AnalyticsComponent,
        parkingDetailComponent,
        // User Pages
        LoginBoxedComponent,

        // Quan li nguoi dung
        TabsComponent,
        UserComponent,

        // Dashboard Boxes
        ChartBoxes3Component,
        TransactionsComponent,

        //Admin
        ParkingsComponent,
        AddImageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgReduxModule,
        CommonModule,
        LoadingBarRouterModule,
        Ng2SearchPipeModule,
        MatSliderModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        RatingModule,

        // Angular Bootstrap Components
        PerfectScrollbarModule,
        NgbModule,
        AngularFontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxPaginationModule,
        // Charts
        ChartsModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        ConfigActions,
        PagerService,

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        private ngRedux: NgRedux<ArchitectUIState>,
        private devTool: DevToolsExtension
    ) {
        this.ngRedux.configureStore(
            rootReducer,
            {} as ArchitectUIState,
            [],
            [devTool.isEnabled() ? devTool.enhancer() : f => f]
        );
    }
}
