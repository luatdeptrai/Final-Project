import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashBoardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './dash-board.component';
import { MatIconModule } from '@angular/material/icon';
import { RegionComponent } from './region/region.component';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LineareaChartsComponent } from './linearea-charts/linearea-charts.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MapComponent } from './map/map.component';
@NgModule({
  declarations: [DashBoardComponent, RegionComponent, LineareaChartsComponent,MapComponent],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    MatIconModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    HighchartsChartModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
})
export class DashBoardModule {}
