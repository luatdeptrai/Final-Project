import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css'],
})
export class RegionComponent {
  displayedColumns: string[] = [
    'countryregion',
    'confirmed',
    'deaths',
    'Fatality rate',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() eventClick = new EventEmitter<any>();

  constructor(private service: DashboardService, private router: Router) {}
  searchValue!: string;
  avc: boolean = false;
  FaltiRate: Number = 0;
  country: any;
  cloneCountry: any;
  FaltiRateCountry: number = 0;
  isCompleted: boolean = true;
  ngOnInit(): void {
    this.service.GetAllDataCountries().subscribe((vale) => {
      this.country = vale;

      this.cloneCountry = [...this.country];
      this.dataSource = new MatTableDataSource(this.country);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.FaltiRate = this.CalRate(vale.deaths, vale.confirmed);
      this.FaltiRateCountry = this.CalRate(vale.deaths, vale.confirmed);
    });
    // console.log(this.country);
  }
  Cleck(Iso2Country: string) {
    if (Iso2Country == null) {
      this.router.navigate([`dashboard/Nodata`]);
      return;
    }
    this.router.navigate([`dashboard/${Iso2Country}`]);
    this.eventClick.emit(Iso2Country);
  }
  CalRate(CaseDeath: number, CaseConfirmed: number): number {
    return (CaseDeath / CaseConfirmed) * 100;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
