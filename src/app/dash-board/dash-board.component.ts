import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent implements OnInit {
  constructor(private service: DashboardService) {}
  CountryResult: any;
  avc: boolean = false;
  FaltiRate: Number = 0;
  WorldCase: any;
  FaltiRateCountry: number = 0;
  recovereddCountry!:number;
  confirmedCountry!:number;
  deathsCountry!:number;
  IsoCountry!: string;

  ngOnInit(): void {
    this.service.getAllCase().subscribe((vale) => {
      this.WorldCase = vale;
      this.FaltiRate = this.CalRate(vale.deaths, vale.confirmed);
    });
  }

  CalRate(CaseDeath: number, CaseConfirmed: number): number {
    return (CaseDeath / CaseConfirmed) * 100;
  }
  GetSelectedVal(SearchVal: string) {
    this.service.SearchValByIso2(SearchVal).subscribe((e) => {
      this.CountryResult = e;
      this.confirmedCountry = this.CountryResult[0].confirmed
      this.recovereddCountry = this.CountryResult[0].recovered
      this.deathsCountry = this.CountryResult[0].deaths
      this.FaltiRateCountry = this.CalRate(
        this.CountryResult[0].deaths,
        this.CountryResult[0].confirmed
      );
    });
  }
}
