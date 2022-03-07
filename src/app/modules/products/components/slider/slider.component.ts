import { Component, OnInit } from '@angular/core';

import { Options } from '@angular-slider/ngx-slider';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  value = 0;

  minValue: number = 50;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 250,
  };
}
