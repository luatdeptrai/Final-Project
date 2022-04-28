import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import Highcharts from 'highcharts/highmaps';

import worldMap from '@highcharts/map-collection/custom/world.geo.json';
// var worldMap = require("@highcharts/map-collection/custom/world.geo.json");
import { Options } from 'highcharts';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  // worldMap = require('@highcharts/map-collection/custom/world.geo.json');
  data: any;
  dataFilter: any;
  // chartOptions !: Options;

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.service.GetAllDataCountries().subscribe((e) => {
      this.data = e;
      console.log(this.data);
      this.dataFilter = this.data.map((el: any) => [
        el.countrycode?.iso2.toLowerCase(),
        // [el.deaths, el.confirmed]
      el.deaths
      ]);
      console.log(this.dataFilter);

      this.chartOptions = {
        
        chart: {
          // spacingBottom: 20,
          // events: {
          //   load: function () {
          //     this.mapZoom(2);
          //   },
          // },
          map: worldMap as any,
        },
        title: {
          text: '',
        },
        exporting: {
          enabled: true,
        },
        credits: {
          enabled: false,
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            alignTo: 'spacingBox',
            verticalAlign: 'bottom'
          },
        },
        legend: {
          enabled: true,
        },
        colorAxis: {
          dataClasses: [
            {
              to: 50000,
              color: '#9D81EA',
            },
            {
              from: 50001,
              to: 100000,
              color: '#a791df',
            },
            {
              from: 100001,
              // to: 500000,
              color: '#5630C3',
            },

          ],
          type: 'linear',
        },
        tooltip: {
          headerFormat: '<b>{point.point.name}</b><br>',
          pointFormat: 'Deaths: {point.value}'
        },
        series: [
          {
            point: {
              events: {
                click: (e: any) => {
                  this.getDataByCountryKey(e.point['hc-key']);
                },

                // click: this.getDataByCountryKey.bind(this)
              },
            },
            type: 'map',
            // name: "<b style='font-size:15px'>`{point.name}`</b>",
            states: {
              hover: {
                // color: "#BADA55"
              },
            },
            dataLabels: {
              enabled: false,
              format: '{point.name}',

            },
            allAreas: false,

            // data : this.dataFilter;

           data: this.dataFilter,

          },
        ],
      };
    });
  }

  getDataByCountryKey(ckey: any) {
    console.log('CountryKey:' + ckey);
  }
  onChartInstance(event: any) {
    console.log(event);
  }

  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'mapChart';

  chartOptions: Options = {
    chart: {
      map: worldMap as any,
    },
    title: {
      text: '',
    },
    // subtitle: {
    //     text: 'Sub title: <a href="http://code.highcharts.com/mapdata/custom/world.js"> xyzzzz</a>'
    // },
    exporting: {
      enabled: true,
    },
    credits: {
      enabled: false,
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        alignTo: 'spacingBox',
      },
    },
    legend: {
      enabled: true,
    },
    colorAxis: {

      type: 'linear',
    },
    tooltip: {
      headerFormat: '<b>{point.point.name}</b><br>',
      // footerFormat: '<span style="font-size: 10px">(Click for details)</span>',
    },
    series: [
      {
        point: {
          events: {
            click: (e: any) => {
              this.getDataByCountryKey(e.point['hc-key']);
            },

            // click: this.getDataByCountryKey.bind(this)
          },
        },
        type: 'map',
        // name: "<b style='font-size:15px'>`{point.name}`</b>",
        states: {
          hover: {
            // color: "#BADA55"
          },
        },
        dataLabels: {
          enabled: false,
          format: '{point.name}',
        },
        allAreas: false,

        // data : this.dataFilter;

        data: [],
      },
    ],
  };

  // options = {
  //   layers: [
  //     tileLayer('https://{s}.tile.openstreetmap.org/{x}/{y}.png', {
  //       attribution: '&copy; OpenStreetMap contributors',
  //     }),
  //   ],
  //   zoom: 7,
  //   center: latLng([46.879966, -121.726909]),
  // };
}
