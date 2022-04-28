import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { NewsService } from '../service/news.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  animations: [
    trigger('Imgdisplay', [
      state(
        'small',
        style({
          display: 'none',
          height: '0px',
        })
      ),
      state('large', style({ height: '600px' })),
      transition('small<=>large', animate('400ms')),
    ]),
    trigger('INout', [
      state('false', style({ transform: 'rotate(0)' })),
      state('true', style({ transform: 'rotate(45deg)' })),
      transition('true => false', animate('500ms ease-out')),
      transition('false => true', animate('400ms ease-in')),
    ]),
  ],
})
export class NewsComponent implements OnInit {
  isOpen = false;
  currentState: string = 'small';
  Data: any;
  fuckjson :any;
  constructor(private service: NewsService) {}
  ngOnInit(): void {
    this.service.GetAllValue().subscribe((e) => {
      this.Data = e;
    });
  }
  AnimateToggle(an: any) {
    console.log(an);
    this.currentState = this.currentState === 'small' ? 'large' : 'small';
  }
}
