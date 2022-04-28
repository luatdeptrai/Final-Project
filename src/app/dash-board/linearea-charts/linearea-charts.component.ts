import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { ChartService } from 'src/app/service/chart.service';
interface TimeValue {
  Date: string;
  Caseconfirmed: any;
}
@Component({
  selector: 'app-linearea-charts',
  templateUrl: './linearea-charts.component.html',
  styleUrls: ['./linearea-charts.component.css'],
})
export class LineareaChartsComponent implements OnInit {
  @Input() IsoCountry = '';
  Count: number = 0;
  Confirm!: number[];
  chartOptions: Highcharts.Options;
  highcharts = Highcharts;
  datavalue: any;
  Value: any;
  constructor(private service: ChartService, private router: ActivatedRoute) {
    this.chartOptions = {
      colors: ['#333', '#333', '#333'],
      title: {
        text: 'New Case Covid-19',
      },
      chart: {
        zoomType: 'x',
        type: 'area',
        width: 540,
        height: 450,
        events: {
          load() {
            const chart = this;
            chart.showLoading('Loading data...');
            setTimeout(function () {
              chart.hideLoading();
            }, 1000);
          },
        },
      },

      lang: {
        noData: 'No data to display',
      },
      responsive: {
        rules: [
          {
            condition: {
              minWidth: 400,
            },
            chartOptions: {
              legend: {
                enabled: true,
              },
            },
          },
        ],
      },
      legend: {
        layout: 'horizontal',
        floating: false,
        verticalAlign: 'top',
      },
      plotOptions: {
        series: {
          animation: {
            duration: 3000,
          },
        },
        area: {
          marker: {
            enabled: true,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true,
              },
            },
          },
        },
      },
      xAxis: {
        offset: 2,
        lineWidth: 2,
        crosshair: {
          width: 2,
        },
      },
      yAxis: {
        title: {
          text: 'Case Confirmed',
        },

        lineWidth: 2,
        offset: 15,
        tickWidth: 2,
        alignTicks: true,
      },
      loading: {
        hideDuration: 1000,
        showDuration: 1000,
      },
      tooltip: {
        formatter: function () {
          return `Case <b>${this.series.name} </b> in <b>${this.x}</b> <br>
          <h3>Number of case ${this.series.name}: <b>${this.y}</b></h3> 
          `;
        },
      },

      series: [
        {
          data: [],
          type: 'areaspline',
          name: 'Death',
          color: '#333',
          lineWidth: 5,
          // fillOpacity: 0.1,
        },
        {
          data: [],
          type: 'areaspline',
          name: 'Confirmed',
          color: '#6d37ab',
          lineWidth: 3,
          fillOpacity: 0.2,
        },
        {
          type: 'pie',
          name: 'Total Country Case',
          data: [
            {
              name: 'Recovered',
              y: 19,
              color: '#fafa',
            },

            {
              name: 'Confirmed',
              y: 23,
              color: '#f22',
            },
            {
              name: 'Death ',
              y: 13,
              color: '#333',
            },
          ],
          center: [70, 60],
          size: 90,
          showInLegend: true,
          dataLabels: {
            /*  enabled: false */
          },
        },
      ],
    };
  }
  GetValue: any;
  ngOnInit() {
    //Get Data From api
    //
    this.router.paramMap.subscribe((param) => {
      this.GetValue = param.get('Coutry');
      if (this.GetValue == 'Nodata') {
        this.GetValue = 'VN';
      }
      this.service.GetTimeseriesByIso2(this.GetValue).subscribe((data) => {
        this.datavalue = data;
        this.OnUpdateVal('week');
      });
    });
  }
  OnUpdateVal(Day: string) {
    let timvalue = [];
    let ConfirmedCase = [];
    let DeathCase = [];
    let NewCase = [];
    let Recovered = [];
    let getvalDay = 0;
    let length = Object.keys(this.datavalue[0].timeseries).length;
    switch (Day) {
      case 'All':
        getvalDay = length;
        this.Value = Object.keys(this.datavalue[0].timeseries);
        break;
      case 'month':
        getvalDay = 30;
        this.Value = Object.keys(this.datavalue[0].timeseries).splice(
          length - getvalDay - 1
        );
        break;
      case '2month':
        getvalDay = 60;
        this.Value = Object.keys(this.datavalue[0].timeseries).splice(
          length - getvalDay - 1
        );
        break;
      case 'week':
        getvalDay = 7;
        this.Value = Object.keys(this.datavalue[0].timeseries).splice(
          length - getvalDay - 1
        );
        break;
      default:
        getvalDay = 0;
    }
    let deathss = [];
    let recovereds = [];
    for (const key of this.Value) {
      timvalue.push(key);
      ConfirmedCase.push(this.datavalue[0].timeseries[key].confirmed);
      DeathCase.push(this.datavalue[0].timeseries[key].deaths);
      Recovered.push(this.datavalue[0].timeseries[key].recovered);
    }
    timvalue.shift();
    console.log(DeathCase);
    console.log(DeathCase);
    for (let i = 1; i < this.Value.length; i++) {
      var confimred = ConfirmedCase[i] - ConfirmedCase[i - 1];
      var deaths = DeathCase[i] - DeathCase[i - 1];
      var recovered = Recovered[i] - Recovered[i - 1];
      NewCase.push(confimred);
      deathss.push(deaths);
      recovereds.push(recovered);
    }
    let totalconfirmed = NewCase.reduce((pre, cur) => pre + cur);
    let TotalDeaths = deathss.reduce((pre, cur) => pre + cur);
    let TotalRecovered = recovereds.reduce((pre, cur) => pre + cur);
    console.log(TotalDeaths);
    this.chartOptions = {
      series: [
        {
          type: 'bar',
          data: deathss,
        },
        {
          type: 'spline',
          data: NewCase,
        },
        {
          type: 'pie',
          data: [
            {
              name: 'Recovered',
              y: TotalRecovered,
              color: '#fafa',
            },

            {
              name: 'Confirmed',
              y: totalconfirmed,
              color: '#f22',
            },
            {
              name: 'Death ',
              y: TotalDeaths,
              color: '#333',
            },
          ],
        },
      ],
      xAxis: {
        categories: timvalue,
      },
    };
  }
}
