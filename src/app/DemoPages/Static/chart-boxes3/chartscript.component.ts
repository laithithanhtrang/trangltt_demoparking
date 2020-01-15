import { Component, OnInit } from "@angular/core";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { HttpClient } from '@angular/common/http';
import { Label } from "ng2-charts";
import {Data} from "../../models/data.model"

@Component({
    selector: "app-bar-chart",
    templateUrl: "./chartscript.component.html"
})
export class ChartBoxes3Component implements OnInit {
    data: Data[];
    url ="http://localhost:3009/results";
    success =[];
    fail =[];
    public barChartOptions: ChartOptions = {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: { xAxes: [{}], yAxes: [{}] },
        plugins: {
            datalabels: {
                anchor: "end",
                align: "end"
            }
        }
    };
    public barChartLabels: Label[] = ["T1", "T2", "T3", "T4", "T5", "T6"];
    public barChartType: ChartType = "bar";
    public barChartLegend = true;
    public barChartPlugins = [pluginDataLabels];

    public barChartData: ChartDataSets[] = [
        {
            data: this.success,
            label: "Giao dịch thành công",
            backgroundColor: "rgb(0, 128, 255)",
            hoverBackgroundColor: "rgb(0, 64, 128)"
        },
        {
            data: this.fail,
            label: "Giao dịch thất bại",
            backgroundColor: "rgb(255, 51, 51)",
            hoverBackgroundColor: "rgb(204, 0, 0)"
        }
    ];

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.http.get(this.url).subscribe((res: Data[]) => {
          res.forEach(y => {
            this.success.push(y.success);
            this.fail.push(y.fail);
          })
        })
    }

    // events
    public chartClicked({
        event,
        active
    }: {
        event: MouseEvent;
        active: {}[];
    }): void {
        console.log(event, active);
    }

    public chartHovered({
        event,
        active
    }: {
        event: MouseEvent;
        active: {}[];
    }): void {
        console.log(event, active);
    }
}
