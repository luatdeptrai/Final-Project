import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NewsComponent, NewsDetailsComponent, FooterComponent],
  imports: [CommonModule, NewsRoutingModule, MatIconModule],
})
export class NewsModule {}
